import streamlit as st
import pandas as pd
import os
import requests

HOST = os.getenv("HOST", "localhost")
st.set_page_config(layout="centered")

ADMIN = os.getenv("ADMIN", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin")

if 'login' not in st.session_state:
    st.session_state.login = False

if not st.session_state.login:
    with st.form(key='Login'):
        st.write('Login')
        username = st.text_input('Username')
        password = st.text_input('Password', type='password')

        submitted = st.form_submit_button('Submit')

        if submitted:
            if username == ADMIN and password == ADMIN_PASSWORD:
                st.session_state.login = True
                st.rerun()
            else:
                st.write('Invalid username or password')
else:
    st.title('Admin page')

    # generate a form link
    with st.form(key='link_form'):
        st.write('產生問卷連結')
        student_id = st.text_input('學生學號')
        student_name = st.text_input('學生姓名')

        submitted = st.form_submit_button('Submit')

        if submitted:
            st.write(f'問卷連結: https://{HOST}/form?student_id={student_id}&student_name={student_name}')

    # download the data
    with st.form(key='download_form'):
        st.write('下載學生資料')
        submitted = st.form_submit_button('Download')

        if submitted:
            response = requests.get(f"http://{HOST}:10000/data")
            df = pd.DataFrame(response.json())
            st.dataframe(df)