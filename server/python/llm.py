from langchain_ollama import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
import sys

user_input = sys.argv[1]
studying = sys.argv[2]
context = sys.argv[3]
def handle_conversation():
    template = """
    Answer the question below in AS LITTLE WORDS AS POSSIBLE!!! (Keep it to 100 words max)

    Here is what the person is studying: {studying}

    Here is the conversation history: {context}

    Question: {question}

    Answer: 
    """

    model = OllamaLLM(model="phi3")
    prompt = ChatPromptTemplate.from_template(template)
    chain = prompt | model
    result = chain.invoke({'context':context, "question":user_input, "studying":studying})
    if user_input.lower() == "clear":
          print("Conversation history cleared")
    else: 
         with open("context.txt", 'a') as f:
            f.write(f"\nUser: {user_input}\nBot: {result}")
         print(f"{result}")
    sys.stdout.flush()

handle_conversation()