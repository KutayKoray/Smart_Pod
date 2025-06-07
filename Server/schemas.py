from pydantic import BaseModel, IPvAnyAddress
from datetime import datetime
from typing import Optional

class DeviceSchema(BaseModel):
    serial_number: str
    ip_address: IPvAnyAddress

class SensorDataSchema(BaseModel):
    serial_number: str
    ip_address: IPvAnyAddress
    temperature: Optional[float] = None
    humidity: Optional[float] = None
    soil_humidity: Optional[float] = None
    light: Optional[float] = None
    co2: Optional[float] = None
    timestamp: Optional[datetime] = None

class MQTTMessage(BaseModel):
    message: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    serial: str

class LoginRequest(BaseModel):
    email: str
    password: str
    
class EmailRequest(BaseModel):
    email: str
    
class SuggestionRequest(BaseModel):
    email: str


