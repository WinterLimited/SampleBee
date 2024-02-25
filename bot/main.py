from dotenv import load_dotenv
import sys

from langchain_community.vectorstores import Chroma
# from langchain_community.embeddings.openai import OpenAIEmbeddings
# from langchain_community.chat_models import ChatOpenAI
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
import pinecone as pc
from langchain_community.vectorstores import Pinecone as PineconeVectorStore
from langchain_openai import OpenAI
from langchain.chains.question_answering import load_qa_chain

#
import os

# .env 파일 로드
load_dotenv()

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')
PINECONE_API_ENV = os.getenv('PINECONE_API_ENV')

os.environ['PINECONE_API_KEY'] = PINECONE_API_KEY


# 매개변수로 질문 받기
query = sys.argv[1] if len(sys.argv) > 1 else "질문이 제공되지 않았습니다."

#
embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
pc.Pinecone(
    api_key=PINECONE_API_KEY,
    environment=PINECONE_API_ENV
)
index_name = "samplebeechat"

#
docsearch = PineconeVectorStore.from_existing_index(index_name=index_name, embedding=embeddings)

#
llm = ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0.5, openai_api_key=OPENAI_API_KEY)
chain = load_qa_chain(llm, chain_type="stuff")

#
docs = docsearch.similarity_search(query)   # 유사성 높은 벡터 자료 모으기

input_data = {
    "input_documents": docs,  # 유사성 높은 벡터 자료
    "question": query,  # 사용자 질문
}

# OPENAI & 유사성 높은 벡터 자료
ans = chain.invoke(input_data)

#
print(ans['output_text'])
