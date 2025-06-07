from sqlalchemy import Column, Integer, String, DECIMAL, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Device(Base):
    __tablename__ = "devices"

    device_id = Column(Integer, primary_key=True, index=True)
    serial_number = Column(String(50), unique=True, nullable=False)
    ip_address = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())

    sensor_data = relationship("SensorData", back_populates="device")
    users = relationship("User", back_populates="device", cascade="all, delete", passive_deletes=True)

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("devices.device_id", ondelete="CASCADE"))
    timestamp = Column(TIMESTAMP, default=func.now())
    temperature = Column(DECIMAL(5,2), nullable=True)
    humidity = Column(DECIMAL(5,2), nullable=True)
    soil_humidity = Column(DECIMAL(5,2), nullable=True)
    light = Column(DECIMAL(5,2), nullable=True)
    co2 = Column(DECIMAL(6,2), nullable=True)

    device = relationship("Device", back_populates="sensor_data")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    serial = Column(String, ForeignKey("devices.serial_number", ondelete="SET NULL"))

    device = relationship("Device", back_populates="users")

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)    
    serial_number = Column(
        String, 
        ForeignKey("devices.serial_number", ondelete="CASCADE"), 
        nullable=False, 
        index=True
    )
    role = Column(String, nullable=False)
    content = Column(String, nullable=False)
    timestamp = Column(TIMESTAMP, server_default=func.now())
    device = relationship("Device", backref="chat_history")