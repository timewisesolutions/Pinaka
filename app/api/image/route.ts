import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,

})

export async function POST(request: Request) {

    try{
        const body = await request.json();
        const { userId } = auth()
        const { prompt, amount=1, resolution='512x512'} = body

        if(!userId){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if(!prompt){
            return new NextResponse("Prompt is required", { status: 400 });
        }
        if(!amount){
            return new NextResponse("Amount is required", { status: 400 });
        }
        if(!resolution){
            return new NextResponse("Resolution is required", { status: 400 });
        }
        if(!openai.apiKey){
            return new NextResponse("OpenAI API key not configured", { status: 500 });
        }
        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount,10),
            size: resolution,
        })
        return NextResponse.json(response.data) //  data: Array<Image>; 

    }catch(error){
        console.log('[IMAGE_ERROR]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}