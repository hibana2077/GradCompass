import requests
import streamlit as st
import pandas as pd
import os

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:10000")

if st.query_params['grad_tracker'] == 'true':
    with st.form(key='AcademicForm'):
        st.write('輸入你的學術背景')
        # Get the user input
        gpa_score = st.number_input('GPA', min_value=0.0, max_value=100.0, value=0.0, step=0.1)
        good_grade_awards = st.number_input('書卷獎次數', min_value=0, max_value=8, value=0, step=1)

        # Programming experience
        CPE_score = st.number_input('CPE題數', min_value=0, max_value=7, value=0, step=1)
        ICPC_experience = st.number_input('ICPC經驗', min_value=0, value=0, step=1)
        NCPC_experience = st.number_input('NCPC經驗', min_value=0, value=0, step=1)

        ICPC_detail = []
        if len(ICPC_detail) < ICPC_experience:
            with st.form(key='ICPCForm'):
                st.write('輸入你的ICPC經驗資訊')
                rank = st.selectbox('名次', ['金牌', '銀牌', '銅牌', '參賽'])

                submitted_ICPC_form = st.form_submit_button('Submit')

                if submitted_ICPC_form:
                    ICPC_detail.append({
                        'rank': rank
                    })

        NCPC_detail = []
        if len(NCPC_detail) < NCPC_experience:
            with st.form(key='NCPCForm'):
                st.write('輸入你的NCPC經驗資訊')
                rank = st.selectbox('名次', ['金牌', '銀牌', '銅牌', '參賽'])

                submitted_NCPC_form = st.form_submit_button('Submit')

                if submitted_NCPC_form:
                    NCPC_detail.append({
                        'rank': rank
                    })

        # Teaching experience
        TA_experience = st.number_input('助教經驗', min_value=0, value=0, step=1)
        github_total_stars = st.number_input('Github總星數', min_value=0, value=0, step=1)

        # Conference papers
        conference_papers = st.number_input('發表論文篇數', min_value=0, value=0, step=1)
        conference_papers_detail = []
        if len(conference_papers_detail) < conference_papers:
            with st.form(key='ConferencePaperForm'):
                st.write('輸入你的發表論文資訊')
                author_rank = st.number_input('作者排名', min_value=1, value=1, step=1)
                host_organization = st.selectbox('主辦單位', ['IEEE', 'ACM', 'IET', 'Springer', 'Elsevier', 'AAAI', '其他'])
                paper_field = st.selectbox('論文領域', ['CV', 'NLP', 'ML', 'AI', 'DS', 'HCI', 'SE', 'Networking', 'Security', 'Blockchain', '其他'])
                presentation_type = st.selectbox('發表形式', ['Oral', 'Poster', 'Oral & Poster'])
                collaboration = st.selectbox('是否合作', ['是', '否'])

                submitted_paper_detail_form = st.form_submit_button('Submit')

                if submitted_paper_detail_form:
                    conference_papers_detail.append({
                        'author_rank': author_rank,
                        'host_organization': host_organization,
                        'paper_field': paper_field,
                        'presentation_type': presentation_type,
                        'collaboration': collaboration
                    })

        # Journal papers
        journal_papers = st.number_input('發表期刊篇數', min_value=0, value=0, step=1)
        journal_papers_detail = []
        if len(journal_papers_detail) < journal_papers:
            with st.form(key='JournalPaperForm'):
                st.write('輸入你的發表期刊資訊')
                author_rank = st.number_input('作者排名', min_value=1, value=1, step=1)
                journal_index = st.selectbox('期刊索引', ['SCI', 'SSCI', 'EI', 'SCIE', '其他'])
                impact_factor = st.number_input('影響因子', min_value=0.0, value=0.0, step=0.1)
                collaboration = st.selectbox('是否合作', ['是', '否'])

                submitted_journal_detail_form = st.form_submit_button('Submit')

                if submitted_journal_detail_form:
                    journal_papers_detail.append({
                        'author_rank': author_rank,
                        'journal_index': journal_index,
                        'impact_factor': impact_factor,
                        'collaboration': collaboration
                    })

        # Working experience
        internship_experience = st.number_input('實習經驗', min_value=0, value=0, step=1)

        # Competition experience
        competition_experience = st.number_input('競賽經驗', min_value=0, value=0, step=1)
        competition_detail = []
        if len(competition_detail) < competition_experience:
            with st.form(key='CompetitionForm'):
                st.write('輸入你的競賽經驗資訊')
                competition_name = st.text_input('競賽名稱')
                award = st.selectbox('獎項', ['冠軍', '亞軍', '季軍', '佳作', '未獲獎'])
                competition_level = st.selectbox('競賽等級', ['國際', '全國', '校內', '其他'])
                

        submitted_form = st.form_submit_button('Submit')
        student_name = st.query_params['student_name']
        student_id = st.query_params['student_id']

        if submitted_form:
            data = {
                'student_name': student_name,
                'student_id': student_id,
                'gpa_score': gpa_score,
                'good_grade_awards': good_grade_awards,
                'CPE_score': CPE_score,
                'TA_experience': TA_experience,
                'github_total_stars': github_total_stars,
                'conference_papers': conference_papers,
                'conference_papers_detail': conference_papers_detail,
                'journal_papers': journal_papers,
                'journal_papers_detail': journal_papers_detail
            }
            response = requests.post(f"{BACKEND_URL}/grad_tracker", json=data)
            if response.status_code == 200 and response.json()['status'] == 'success':
                st.success('成功提交學術背景資料')
            else:
                st.error('提交學術背景資料失敗，請聯繫管理員')

else:
    st.write('這頁面僅供管理員提供的網址訪問，請勿直接訪問')