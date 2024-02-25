#@title (파인콘 불러오고 질문하기- 따로 계속 PDF저장 필요 X)
from dotenv import load_dotenv
import sys

from langchain.vectorstores import Chroma
from langchain.embeddings.openai import OpenAIEmbeddings
import pinecone as pc
from langchain.vectorstores import Pinecone as PineconeVectorStore
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
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

# OPENAI & 유사성 높은 벡터 자료
ans = chain.run(input_documents=docs, question=query)

#
print(ans)
