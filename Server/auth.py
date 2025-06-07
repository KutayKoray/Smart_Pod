# auth.py
from sqlalchemy.orm import Session
from fastapi import HTTPException
from passlib.hash import bcrypt
import models
import schemas

def register_user(request: schemas.RegisterRequest, db: Session):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = bcrypt.hash(request.password)
    new_user = models.User(
        name=request.name,
        email=request.email,
        password=hashed_pw,
        serial=request.serial
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

def login_user(request: schemas.LoginRequest, db: Session):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user or not bcrypt.verify(request.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Login successful"}


def get_user_profile(request: schemas.EmailRequest, db: Session):
    user = db.query(models.User).filter(models.User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı")

    # İlgili cihaz bilgilerini de getir (serial ile ilişkilidir)
    device_info = None
    if user.device:
        device_info = {
            "serial_number": user.device.serial_number,
            "ip_address": user.device.ip_address,
            "created_at": str(user.device.created_at)
        }

    return {
        "name": user.name,
        "email": user.email,
        "serial": user.serial,
        "device": device_info
    }
