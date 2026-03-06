'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function askGuru(message: string, history: any[]) {
    if (!process.env.GEMINI_API_KEY) {
        return { error: "Gemini API key is not configured. Please add it to your .env file." };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }],
            })),
            generationConfig: {
                maxOutputTokens: 500,
            },
        });

        const prompt = `You are "Guru", Swaramthala's expert musical instrument assistant. 
        Swaramthala is India's premium marketplace for buying, selling, and renting musical instruments.
        Answer the following user question about musical instruments, maintenance, or buying advice. 
        Be helpful, professional, and concise. Use a friendly tone.
        
        User Question: ${message}`;

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return { text: response.text() };
    } catch (error) {
        console.error("Guru Error:", error);
        return { error: "Guru is currently taking a break. Please try again later." };
    }
}

export async function generateListingDetails(params: { title: string, brand: string, category: string, condition: string }) {
    if (!process.env.GEMINI_API_KEY) {
        return { success: true, price: 50000, description: `A high-quality ${params.brand} ${params.title} in ${params.condition} condition. Ready to play and sounds fantastic. Perfect for intermediate and advanced players.` };
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are an expert musical instrument appraiser. I have a user selling a ${params.brand} ${params.title} (Category: ${params.category}, Condition: ${params.condition}). 
        Give me a short 2-3 sentence engaging description for the listing and a reasonable price in INR. 
        Format your response exactly as JSON: {"price": number, "description": "string"}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
            const data = JSON.parse(jsonMatch[0]);
            return { success: true, price: data.price, description: data.description };
        }
        return { success: true, price: 50000, description: "A great instrument ready for a new home." };
    } catch (error) {
        console.error("AI Generation Error:", error);
        return { success: false, error: "Failed to generate details" };
    }
}
