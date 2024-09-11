from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import sys

user_input = sys.argv[1]
context = sys.argv[2]
def handle_conversation():
    template = """
    Answer the question below in AS LITTLE WORDS AS POSSIBLE!!!

    Here is some context: {context}

    Question: {question}

    Answer: 
    """

    model = OllamaLLM(model="phi3")
    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | model
    result = chain.invoke({'context':context, "question":user_input})
    with open("context.txt", 'a') as f:
            f.write(f"\nUser: {user_input}\nBot: {result}")
    print(f"{result}")
    sys.stdout.flush()

handle_conversation()