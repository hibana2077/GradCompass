import requests
import streamlit as st
import os

BACKEND_URL = os.getenv("BACKEND_URL", "localhost")

pg = st.navigation([
    st.Page("mypages/datavis.py", title="研究所推甄分析", icon="📊"),
    st.Page("mypages/prediction.py", title="落點分析", icon="🎯"),
    st.Page("mypages/admin.py", title="管理者", icon="🔒"),
    st.Page("mypages/form.py", title="問卷", icon="📝", url_path="form")
])
pg.run()