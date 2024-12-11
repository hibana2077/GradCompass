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