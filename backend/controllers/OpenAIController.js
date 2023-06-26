import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv"

dotenv.config()

export default class OpenAIController {

    openai_instance

    constructor() {
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai_instance = new OpenAIApi(configuration);
    }

    async foo() {
        const chat_completion = await this.openai_instance.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant that takes in article titles and headlines, and outputs a single country that the text best relates to in the format: {COUNTRY}." },
                { role: "user", content: "Man bought lifetime pass on United Airlines, racks up over 23 million miles since" }
            ],
        });
        console.log(chat_completion.data.choices[0].message.content)
    }
}