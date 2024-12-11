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

@app.post("/grad_tracker")
def create_data(data: dict):
    # Save data to MongoDB
    db = mongo_client["data_analysis_platform"]
    collection = db["grad_data"]
    # data format:
    # {
    #             'student_name': student_name,
    #             'student_id': student_id,
    #             'gpa_score': gpa_score,
    #             'good_grade_awards': good_grade_awards,
    #             'CPE_score': CPE_score,
    #             'ICPC_experience': ICPC_experience,
    #             'ICPC_detail': ICPC_detail,
    #             'NCPC_experience': NCPC_experience,
    #             'NCPC_detail': NCPC_detail,
    #             'TA_experience': TA_experience,
    #             'github_total_stars': github_total_stars,
    #             'conference_papers': conference_papers,
    #             'conference_papers_detail': conference_papers_detail,
    #             'journal_papers': journal_papers,
    #             'journal_papers_detail': journal_papers_detail,
    #             'internship_experience': internship_experience,
    #             'competition_experience': competition_experience,
    #             'competition_detail': competition_detail,
    #             'applications': applications
    #         }
    collection.insert_one(data)
    return JSONResponse(content={"message": "Data created successfully", 'status': 'success'})