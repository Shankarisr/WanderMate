import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3050; // Ensure port matches frontend requests
const apiKey = API_KEY;

if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

app.post('/api/language-learning', async (req, res) => {
    try {
        const { destination, language, phraseCategories, specificPhrases } = req.body;

        if (!destination || !language || phraseCategories.length === 0) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const prompt = `
            Generate basic phrases for learning ${language} based on the following categories:
            - Destination: ${destination}
            - Language: ${language}
            - Categories: ${phraseCategories.join(', ')}
            ${specificPhrases ? `- Specific Phrases: ${specificPhrases}` : ''}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        console.log("Generated text response:", text); // Log the output for debugging

        // Split the text into lines and filter out non-relevant content
        const phrases = text.split('\n').filter(line => line.trim() !== '').map(line => ({
            original: line,
            translation: '', // Optional: Add logic to translate if needed
            pronunciation: '', // Optional: Add logic to generate pronunciation if needed
            culturalNote: '', // Optional: Add any additional processing for cultural notes
        }));

        res.status(200).json({ phrases });
    } catch (error) {
        console.error("Error generating phrases:", error.message);
        res.status(500).json({ error: "Failed to generate phrases: " + error.message });
    }
});

http.createServer(app).listen(port, () => {
    console.log(`Language learning server running on port ${port}`);
});
