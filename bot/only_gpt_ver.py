from dotenv import load_dotenv
import os
import sys
import json
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

# AIMessage 객체의 내용을 JSON 직렬화 가능한 형태로 변환
def serialize_aimessage(message):
    if isinstance(message, AIMessage):
        return {"content": message.content}
    elif isinstance(message, list):
        return [serialize_aimessage(msg) for msg in message]
    else:
        return str(message)  # 기본적으로 문자열로 변환

# 결과를 JSON 형식으로 직렬화
json_result = json.dumps({
    "response": serialize_aimessage(ch_ans1),
}, ensure_ascii=False)

print(json_result)