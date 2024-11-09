import streamlit as st
import pandas as pd
import plotly.express as px
import requests

st.set_page_config(layout="wide")
st.title("GradCompass Data Analysis Platform")

df = pd.read_csv("./example.csv")

#plot
fig = px.parallel_categories(df)

st.plotly_chart(fig)