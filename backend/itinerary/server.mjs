import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3006; // Use port 3006 for itinerary
const apiKey = API_KEY;
if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

app.post('/api/itinerary', async (req, res) => {
    try {
        const { numberOfPeople, numberOfDays, place, budget, fromLocation, focus, otherFocus } = req.body;

        if (!numberOfPeople || !numberOfDays || !place || !budget || !fromLocation || !focus) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Construct the prompt for the AI model
        const prompt = `
            Create an itinerary for a trip with the following details:
            - Number of people: ${numberOfPeople}
            - Number of days: ${numberOfDays}
            - Destination: ${place}
            - Budget: ${budget}
            - From Location: ${fromLocation}
            - Focus: ${focus}${otherFocus ? `, with additional focus on: ${otherFocus}` : ''}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.status(200).json({ results: text.trim() });
    } catch (error) {
        console.error("Error generating itinerary:", error.message);
        res.status(500).json({ error: "Failed to generate itinerary: " + error.message });
    }
});

http.createServer(app).listen(port, () => {
    console.log(`Itinerary server running on port ${port}`);
});
