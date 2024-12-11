import streamlit as st
import pandas as pd
import plotly.express as px
import requests
import os

BACKEND_URL = os.getenv("BACKEND_URL", "localhost")

def get_data():
    # response = requests.get(f"http://{BACKEND_URL}:10000/data")
    response = requests.get("{BACKEND_URL}:10000/test/data")
    return response.json()

st.set_page_config(layout="wide")
st.title("GradCompass Data Analysis Platform")

df = pd.DataFrame(get_data())

#plot
fig = px.parallel_categories(df)

st.plotly_chart(fig)