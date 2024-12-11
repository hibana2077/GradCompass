import streamlit as st
import pandas as pd
import plotly.express as px
import requests

import os

API_HOST = os.getenv("API_HOST", "localhost")

# def get_data():
#     response = requests.get(f"http://{API_HOST}:10000/data")
#     return response.json()

# st.set_page_config(layout="wide")
# st.title("GradCompass Data Analysis Platform")

# df = pd.DataFrame(get_data())

# #plot
# fig = px.parallel_categories(df)

# st.plotly_chart(fig)

pg = st.navigation([
    # st.Page("page1.py", title="First page", icon="🔥"),
    st.Page("mypages/prediction.py", title="落點分析", icon="🔥"),
    st.Page("mypages/admin.py", title="管理者", icon="🔥"),
])
pg.run()