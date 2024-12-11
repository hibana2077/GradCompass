# Standard Library
import os
import time

# FastAPI
import uvicorn
import requests
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Data Analysis
import pandas as pd

# Database
import pymongo

# Database initialization

## MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
mongo_client = pymongo.MongoClient("mongodb://mongo:27017/")

# FassAPI
app = FastAPI()

# CORS
origins = [
    "http://localhost",
    "http://localhost:5000",
    "http://localhost:10000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/health")
def read_health():
    return {"status": "ok"}

@app.get("/data")
def read_data():
    db = mongo_client["data_analysis_platform"]
    collection = db["grad_data"]
    data = list(collection.find())
    return data

@app.post("/data")
def create_data(data: dict):
    # Save data to MongoDB
    db = mongo_client["data_analysis_platform"]
    collection = db["grad_data"]
    # data format:
    # {"Student ID": x, "CPE": x, "Competition": x, "Journal": x, "Conference": x, "Internship": x, "GPA": x, "Application_Universities": x, "Application_Departments": x, "Paper_Censor": Passed/Failed, "Interview": Passed/Failed, "Final_Admission": 正取/備取/不取}
    collection.insert_one(data)
    return JSONResponse(content={"message": "Data saved successfully"})

@app.post("/register")
def register_user(data: dict):
    student_id = data["student_id"]
    username = data["username"]
    password = data["password"]

    # check if the user already exists
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE student_id = %s", (student_id,))
    if cursor.fetchone():
        return JSONResponse(content={"message": "User already exists"})
    
    # check if the username is already taken
    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    if cursor.fetchone():
        return JSONResponse(content={"message": "Username already taken"})

    # Save data to PostgreSQL
    cursor.execute("INSERT INTO users (student_id, username, password) VALUES (%s, %s, %s)", (student_id, username, password))
    conn.commit()
    return JSONResponse(content={"message": "User registered successfully"})

@app.post("/login")
def login_user(data: dict):
    username = data["username"]
    password = data["password"]

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    if cursor.fetchone():
        return JSONResponse(content={"message": "Login successful", "username": username, "login": True})
    return JSONResponse(content={"message": "Invalid credentials", "username": username, "login": False})