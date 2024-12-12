import requests
import streamlit as st
import os

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:10000")

st.set_page_config(layout="centered")

if "grad_tracker" in st.query_params or "grad_tracker" in st.session_state:
    if "grad_tracker" in st.query_params:
        st.session_state.grad_tracker = True
        st.session_state.student_id = st.query_params['student_id']
        st.session_state.student_name = st.query_params['student_name']
    tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8 = st.tabs(["學術背景", "ICPC經驗", "NCPC經驗", "研討會論文", "期刊論文", "競賽經驗", "申請資訊", "其他"])
    with tab1:
        st.write('輸入你的學術背景')
        gpa_score = st.number_input('GPA', min_value=0.0, max_value=100.0, value=0.0, step=0.1)
        good_grade_awards = st.number_input('書卷獎次數', min_value=0, max_value=8, value=0, step=1)
        CPE_score = st.number_input('CPE題數', min_value=0, max_value=7, value=0, step=1)
        TA_experience = st.number_input('助教經驗', min_value=0, value=0, step=1)
        github_total_stars = st.number_input('Github總星數', min_value=0, value=0, step=1)
        internship_experience = st.number_input('實習經驗', min_value=0, value=0, step=1)
    with tab2:
        st.write('輸入你的ICPC經驗資訊')
        ICPC_experience = st.number_input('ICPC經驗', min_value=0, value=0, step=1)
        ICPC_detail = []
        for i in range(ICPC_experience):
            rank = st.selectbox(f'名次 {i+1}', ['金牌', '銀牌', '銅牌', '參賽'], key=f'ICPC_rank_{i}')
            ICPC_detail.append({'rank': rank})
    with tab3:
        st.write('輸入你的NCPC經驗資訊')
        NCPC_experience = st.number_input('NCPC經驗', min_value=0, value=0, step=1)
        NCPC_detail = []
        for i in range(NCPC_experience):
            rank = st.selectbox(f'名次 {i+1}', ['金牌', '銀牌', '銅牌', '參賽'], key=f'NCPC_rank_{i}')
            NCPC_detail.append({'rank': rank})
    with tab4:
        st.write('輸入你的研討會論文資訊')
        conference_papers = st.number_input('研討會論文篇數', min_value=0, value=0, step=1)
        conference_papers_detail = []
        for i in range(conference_papers):
            author_rank = st.number_input(f'作者排名 {i+1}', min_value=1, value=1, step=1, key=f'conference_author_rank_{i}')
            host_organization = st.selectbox(f'主辦單位 {i+1}', ['IEEE', 'ACM', 'IET', 'Springer', 'Elsevier', 'AAAI', '其他'])
            paper_field = st.selectbox(f'論文領域 {i+1}', ['CV', 'NLP', 'ML', 'AI', 'DS', 'HCI', 'SE', 'Networking', 'Security', 'Blockchain', '其他'])
            presentation_type = st.selectbox(f'發表形式 {i+1}', ['Oral', 'Poster', 'Oral & Poster'])
            collaboration = st.selectbox(f'是否合作 {i+1}', ['是', '否'])
            conference_papers_detail.append({
                'author_rank': author_rank,
                'host_organization': host_organization,
                'paper_field': paper_field,
                'presentation_type': presentation_type,
                'collaboration': collaboration
            })
    with tab5:
        st.write('輸入你的發表期刊資訊')
        journal_papers = st.number_input('發表期刊篇數', min_value=0, value=0, step=1)
        journal_papers_detail = []
        for i in range(journal_papers):
            author_rank = st.number_input(f'作者排名 {i+1}', min_value=1, value=1, step=1, key=f'journal_author_rank_{i}')
            journal_index = st.selectbox(f'期刊索引 {i+1}', ['SCI', 'SSCI', 'EI', 'SCIE', '其他'])
            impact_factor = st.number_input(f'影響因子 {i+1}', min_value=0.0, value=0.0, step=0.1)
            collaboration = st.selectbox(f'是否合作 {i+1}', ['是', '否'])
            journal_papers_detail.append({
                'author_rank': author_rank,
                'journal_index': journal_index,
                'impact_factor': impact_factor,
                'collaboration': collaboration
            })
    with tab6:
        st.write('輸入你的競賽經驗資訊')
        competition_experience = st.number_input('競賽經驗', min_value=0, value=0, step=1)
        competition_detail = []
        for i in range(competition_experience):
            competition_name = st.text_input(f'競賽名稱 {i+1}')
            award = st.selectbox(f'獎項 {i+1}', ['冠軍', '亞軍', '季軍', '佳作', '未獲獎'])
            competition_level = st.selectbox(f'競賽等級 {i+1}', ['國際', '全國', '校內', '其他'])
            competition_detail.append({
                'competition_name': competition_name,
                'award': award,
                'competition_level': competition_level
            })
    with tab7:
        st.write('輸入你的申請資訊')
        total_applications = st.number_input('總申請間數', min_value=0, value=0, step=1)
        applications = []
        for i in range(total_applications):
            university = st.text_input(f'申請學校 {i+1}')
            department = st.text_input(f'申請系所 {i+1}')
            paper_censor = st.selectbox(f'書面審查 {i+1}', ['通過', '未通過', '逕行錄取'])
            interview = st.selectbox(f'面試 {i+1}', ['通過', '未通過'])
            final_admission = st.selectbox(f'最終錄取 {i+1}', ['正取', '備取', '不取'])
            applications.append({
                'university': university,
                'department': department,
                'paper_censor': paper_censor,
                'interview': interview,
                'final_admission': final_admission
            })
    with tab8:
        st.write('其他資訊')
        st.write(f"學生姓名: {st.session_state.student_name}")
        st.write(f"學生學號: {st.session_state.student_id}")
    submitted_form = st.button('Submit')
    student_name = st.session_state.student_name
    student_id = st.session_state.student_id
    if submitted_form:
        data = {
            'student_name': student_name,
            'student_id': student_id,
            'gpa_score': gpa_score,
            'good_grade_awards': good_grade_awards,
            'CPE_score': CPE_score,
            'ICPC_experience': ICPC_experience,
            'ICPC_detail': ICPC_detail,
            'NCPC_experience': NCPC_experience,
            'NCPC_detail': NCPC_detail,
            'TA_experience': TA_experience,
            'github_total_stars': github_total_stars,
            'conference_papers': conference_papers,
            'conference_papers_detail': conference_papers_detail,
            'journal_papers': journal_papers,
            'journal_papers_detail': journal_papers_detail,
            'internship_experience': internship_experience,
            'competition_experience': competition_experience,
            'competition_detail': competition_detail,
            'applications': applications
        }
        st.session_state['form_data'] = data
        response = requests.post(f"{BACKEND_URL}/grad_tracker", json=data)
        if response.status_code == 200 and response.json()['status'] == 'success':
            st.success('成功提交學術背景資料')
            st.session_state.pop('form_data')
            st.session_state.pop('grad_tracker')
            st.rerun()
        else:
            st.error('提交學術背景資料失敗，請聯繫管理員')
else:
    st.write('這頁面僅供管理員提供的網址訪問，請勿直接訪問')
