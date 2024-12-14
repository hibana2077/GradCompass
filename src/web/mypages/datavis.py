import streamlit as st
import pandas as pd
import numpy as np
import plotly.graph_objects as go
import plotly.colors as pc
import requests
import os

# Mocking backend URL
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:10000")

# Streamlit Page Configuration
st.set_page_config(layout="wide", page_title="Dynamic Parallel Categories")

# Function to fetch data
def get_data():
    # Replace this with the actual API call
    response = requests.get(f"{BACKEND_URL}/data")
    # response = requests.get(f"{BACKEND_URL}/test/data")
    # st.json(response.json())
    return response.json()

def flatten_data(data):
    flat_data = []
    for entry in data:
        flat_entry = entry.copy()
        # 展開 list 欄位，確保每個欄位的資料不互相重疊
        list_fields = [key for key, value in entry.items() if isinstance(value, list) and value]
        if list_fields:
            # 遍歷所有需要展開的 list 欄位，逐步展開
            expanded_data = [{}]
            for field in list_fields:
                new_expanded = []
                for item in entry[field]:
                    for e in expanded_data:
                        new_entry = e.copy()
                        if isinstance(item, dict):
                            for subkey, subvalue in item.items():
                                new_entry[f"{field}_{subkey}"] = subvalue
                        else:
                            new_entry[field] = item
                        new_expanded.append(new_entry)
                expanded_data = new_expanded
            # 結合展開後的資料
            for expanded_entry in expanded_data:
                new_entry = flat_entry.copy()
                for key in list_fields:
                    del new_entry[key]  # 移除原始 list 欄位
                new_entry.update(expanded_entry)
                flat_data.append(new_entry)
        else:
            flat_data.append(flat_entry)
    return flat_data

# Fetching Data
st.title("Dynamic Parallel Categories Visualizer")
data = get_data()

# Flatten data for better visualization
flat_data = flatten_data(data)
df = pd.DataFrame(flat_data)
# drop columns with it name postfixed with _detail
df = df.drop(columns=[col for col in df.columns if col.endswith("_detail")])
# drop duplicated
df = df.drop_duplicates()

# Sidebar for Feature Selection
st.sidebar.header("Feature Selection")
available_features = df.columns.tolist()
selected_features = st.sidebar.multiselect(
    "Select features to include in the visualization:", 
    options=available_features, 
    default=['gpa_score', 'CPE_score', 'applications_final_admission']
)

if selected_features:
    st.subheader("Sankey Diagram")

    # 確保 'applications_final_admission' 存在於特徵中
    if 'applications_final_admission' not in selected_features:
        selected_features.append('applications_final_admission')

    # 建立 (欄位, 值) 的組合來當作節點
    all_nodes = []
    for col in selected_features:
        unique_vals = df[col].unique()
        for val in unique_vals:
            all_nodes.append((col, val))
    
    # 將 (欄位, 值) 組合轉成字串標籤
    nodes = [f"{col}: {val}" for col, val in all_nodes]
    node_map = {(col, val): i for i, (col, val) in enumerate(all_nodes)}

    # 建立連結 (links) 資料
    links = []
    for i, (source_col, target_col) in enumerate(zip(selected_features[:-1], selected_features[1:])):
        grouped = df.groupby([source_col, target_col]).size().reset_index(name='count')
        for _, row in grouped.iterrows():
            links.append({
                "source": node_map[(source_col, row[source_col])],
                "target": node_map[(target_col, row[target_col])],
                "value": row['count']
            })

    # 定義 applications_final_admission 欄位值的顏色
    color_map = {
        '正取': 'rgba(31,119,180,0.8)',   # 藍色
        '備取': 'rgba(255,127,14,0.8)',   # 橙色
        '未錄取': 'rgba(214,39,40,0.8)'   # 紅色
    }

    # 根據節點所屬欄位決定顏色
    node_colors = []
    for (col, val) in all_nodes:
        if col == 'applications_final_admission':
            node_colors.append(color_map.get(str(val), 'rgba(128,128,128,0.8)'))
        else:
            # 其他欄位節點統一中性淡灰
            node_colors.append('rgba(200,200,200,0.8)')

    # 自訂 Pastel1 類似顏色刻度 (ColorBrewer Pastel1: 8色)
    # Ref: https://colorbrewer2.org/#type=qualitative&scheme=Pastel1&n=8
    pastel1_colorscale = [
        [0.0, '#fbb4ae'],
        [1.0/7, '#b3cde3'],
        [2.0/7, '#ccebc5'],
        [3.0/7, '#decbe4'],
        [4.0/7, '#fed9a6'],
        [5.0/7, '#ffe9a8'],
        [6.0/7, '#fddaec'],
        [1.0, '#f2f2f2']
    ]

    def value_to_color(val, vmin, vmax, colorscale):
        ratio = (val - vmin) / (vmax - vmin) if vmax > vmin else 0.5
        color = pc.sample_colorscale(colorscale, ratio)[0]
        return color

    # 為連結根據 value 分配顏色(使用 pastel1_colorscale)
    link_values = [l['value'] for l in links]
    if len(link_values) > 0:
        link_min = min(link_values)
        link_max = max(link_values)
    else:
        link_min, link_max = 0, 1

    link_colors = [value_to_color(l['value'], link_min, link_max, pastel1_colorscale) for l in links]

    # 建立 Sankey 圖表
    fig = go.Figure(data=[go.Sankey(
        node=dict(
            pad=15,
            thickness=15,
            line=dict(color="black", width=0.5),
            label=nodes,
            color=node_colors
        ),
        link=dict(
            source=[link['source'] for link in links],
            target=[link['target'] for link in links],
            value=[link['value'] for link in links],
            color=link_colors
        )
    )])

    # 更新圖表佈局
    fig.update_layout(
        title_text="Admission Flow",
        font_size=10
    )

    st.plotly_chart(fig, use_container_width=True)
else:
    st.warning("Please select at least one feature to visualize.")

# st.dataframe(df)
# st.write(nodes)