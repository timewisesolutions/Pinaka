import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

//  model: "gpt-3.5-turbo"
const model = new ChatOpenAI({openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: "gpt-4-1106-preview"});
const promptTemplate = PromptTemplate.fromTemplate(
    "You are a helpful assistant. \n\n{input}\n\n"
)

export async function POST(request: Request) {

    try{
        const body = await request.json();
        const { userId } = auth()
        const { messages  } = body

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if(!messages){
            return new NextResponse("Messages are required", { status: 400 });
        }
        if(!model.openAIApiKey){
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }
        const chain = promptTemplate.pipe(model) 
        const response = await chain.invoke({input: messages})
        return NextResponse.json(response)

    }catch(error){
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

/*
Below method uses history and langchain buffermemory to store conversation history. Both work.

import { ConversationChain } from "langchain/chains";
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts";
import { BufferMemory } from "langchain/memory";

const chat = new ChatOpenAI({openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9, modelName: gpt-4-1106-preview});

export async function POST(request: Request) {

    try{
        const body = await request.json();
        const { userId } = auth()
        const { messages  } = body

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if(!messages){
            return new NextResponse("Messages are required", { status: 400 });
        }
        if(!chat.openAIApiKey){
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }
        const chatPrompt = ChatPromptTemplate.fromMessages([
        [
            "system",
            "You are a helpful assistant",
        ],
        new MessagesPlaceholder("history"),
        ["human", "{messages}"],
        ]);
        const chain = new ConversationChain({
            memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
            prompt: chatPrompt,
            llm: chat,
        });
        const response = await chat.call(messages)
        return NextResponse.json(response)
    }catch(error){
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
*/