import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 300; // Use your preferred port
const apiKey = API_KEY;

if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

// Translation endpoint
app.post('/api/translate', async (req, res) => {
    try {
        const { text, targetLang } = req.body;

        if (!text || !targetLang) {
            return res.status(400).json({ error: "Text and target language are required." });
        }

        // Construct the prompt for the AI model
        const prompt = `
            Translate the following text to ${targetLang}:
            "${text}"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const translatedText = await response.text();

        res.status(200).json({ translatedText: translatedText.trim() });
    } catch (error) {
        console.error("Error generating translation:", error.message);
        res.status(500).json({ error: "Failed to generate translation: " + error.message });
    }
});

http.createServer(app).listen(port, () => {
    console.log(`Translator server running on port ${port}`);
});
