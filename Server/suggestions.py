from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from models import Device, SensorData, ChatHistory
from database import SessionLocal
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=(os.getenv("OPEN_AI_KEY") or ""))

def avg(values):
    return round(sum(values) / len(values), 2) if values else 0

def extract_light_by_hour_range(data, start_hour, end_hour):
    return [s.light for s in data if s.timestamp and start_hour <= s.timestamp.hour <= end_hour]

def generate_suggestions(serial_number: str) -> dict:
    db: Session = SessionLocal()

    device = db.query(Device).filter(Device.serial_number == serial_number).first()
    if not device:
        db.close()
        raise Exception("Cihaz bulunamadı")

    device_id = device.device_id

    now = datetime.utcnow()
    one_day_ago = now - timedelta(days=1)
    one_week_ago = now - timedelta(days=7)

    week_data = db.query(SensorData).filter(
        SensorData.device_id == device_id,
        SensorData.timestamp >= one_week_ago
    ).all()

    day_data = db.query(SensorData).filter(
        SensorData.device_id == device_id,
        SensorData.timestamp >= one_day_ago
    ).all()

    week_stats = {
        "temp": avg([s.temperature for s in week_data if s.temperature is not None]),
        "hum": avg([s.humidity for s in week_data if s.humidity is not None]),
        "soil": avg([s.soil_humidity for s in week_data if s.soil_humidity is not None]),
        "co2": avg([s.co2 for s in week_data if s.co2 is not None]),
        "light": {
            "morning": avg(extract_light_by_hour_range(week_data, 6, 10)),
            "noon": avg(extract_light_by_hour_range(week_data, 11, 15)),
            "evening": avg(extract_light_by_hour_range(week_data, 16, 20)),
            "night": avg(extract_light_by_hour_range(week_data, 21, 23) +
                         extract_light_by_hour_range(week_data, 0, 5)),
        }
    }

    day_stats = {
        "temp": avg([s.temperature for s in day_data if s.temperature is not None]),
        "hum": avg([s.humidity for s in day_data if s.humidity is not None]),
        "soil": avg([s.soil_humidity for s in day_data if s.soil_humidity is not None]),
        "co2": avg([s.co2 for s in day_data if s.co2 is not None]),
    }

    plant_type = "Orkide"

    prompt = f"""
Bitki türü: {plant_type}

[Son 1 Hafta Ortalama Veriler]
Sıcaklık: {week_stats['temp']}°C
Nem: {week_stats['hum']}%
Toprak Nem: {week_stats['soil']}%
CO2: {week_stats['co2']} ppm
Işık:
- Sabah: {week_stats['light']['morning']} lux
- Öğlen: {week_stats['light']['noon']} lux
- Akşam: {week_stats['light']['evening']} lux
- Gece: {week_stats['light']['night']} lux

[Son 24 Saat Ortalama Veriler]
Sıcaklık: {day_stats['temp']}°C
Nem: {day_stats['hum']}%
Toprak Nem: {day_stats['soil']}%
CO2: {day_stats['co2']} ppm

Bu verileri bitkinin türünü dikkate alarak değerlendir. Kullanıcıya:
- Genel durumu
- Potansiyel sorunları
- 2-3 öneri veya çözüm fikri
şeklinde doğal ve rehber bir dille açıklama yap.
"""

    messages = [{"role": "system", "content": "Sen kullanıcıya bitki bakımı konusunda yardım eden uzman bir asistansın."}]
    messages += get_recent_chat(serial_number, db)
    messages.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages
    )

    chat_reply = response.choices[0].message.content

    db.add(ChatHistory(serial_number=serial_number, role="user", content=prompt))
    db.add(ChatHistory(serial_number=serial_number, role="assistant", content=chat_reply))
    db.commit()
    db.close()

    return {
        "plant_type": plant_type,
        "summary": chat_reply
    }