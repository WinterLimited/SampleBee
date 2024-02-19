from dotenv import load_dotenv
import os
import sys
from langchain_openai.chat_models import ChatOpenAI
from langchain.schema import (
    AIMessage,
    HumanMessage,
    SystemMessage
)

# .env 파일 로드
load_dotenv()

# 매개변수로 질문 받기
question = sys.argv[1] if len(sys.argv) > 1 else "질문이 제공되지 않았습니다."

openai_api_key = os.getenv('OPENAI_API_KEY')

chat_check = ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0.9, openai_api_key=openai_api_key)
ch_sys1 = SystemMessage(content="당신은 인테리어 자재와 제조업체에 대해서 설명해주는 샘플비 플랫폼의 대화 및 상담형 전문 AI입니다. 당신의 이름은 샘플비 Student입니다.")
ch_msg1 = HumanMessage(content=question)
ch_ans1 = chat_check.invoke([ch_sys1, ch_msg1])
print(ch_ans1)


# import os
# from pinecone import Pinecone, ServerlessSpec, Index
# from langchain_openai import OpenAIEmbeddings
#
# # Pinecone API 키 설정
# PINECONE_API_KEY = 'e215e575-875b-4f90-9f36-a8c9a57dafcd'
#
# # Pinecone 클라이언트 초기화
# pc = Pinecone(api_key=PINECONE_API_KEY)
#
# # 인덱스 이름 설정
# index_name = 'langchain-prototype'
#
# # 인덱스가 존재하지 않는 경우 생성
# if index_name not in pc.list_indexes().names():
#     pc.create_index(
#         name=index_name,
#         dimension=768,  # 여기서는 768차원 벡터를 사용한다고 가정
#         metric='cosine',  # 코사인 유사도를 메트릭으로 사용
#         spec=ServerlessSpec(
#             cloud='aws',
#             region='us-west-2'
#         )
#     )
#
# # 인덱스 선택
# index = pc.Index(name=index_name)
#
# # OpenAI 임베딩 사용
# embeddings = OpenAIEmbeddings(api_key="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")
#
# # 질문 정의
# query = "What is the meaning of life?"
#
# # 질문을 벡터로 변환
# query_vectors = embeddings.transform([query])
# query_vector = query_vectors[0]
#
# # 유사성 검색 실행
# response = index.query(queries=[query_vector], top_k=5)
#
# # 결과 처리
# for match in response['results'][0]['matches']:
#     print(f"Document ID: {match['id']}, Score: {match['score']}")