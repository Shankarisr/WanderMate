import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3008; // Use port 3008 for emergency
const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE"; // Fetch from environment variables

if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

app.post('/api/emergency', async (req, res) => {
    const { city, state, emergencyType, healthcareNeeds, languagePreferences, contactPreference, travelStatus } = req.body;

    console.log('Received data:', req.body); // Debugging line

    if (!city || !state || !emergencyType || !contactPreference || !travelStatus) {
        return res.status(400).json({
            error: "City, State, Emergency Type, Contact Preference, and Travel Status are required."
        });
    }

    // Construct prompt for AI model
    const prompt = `
        Provide emergency contact details based on the following criteria:
        - City: ${city}
        - State: ${state}
        - Emergency Type: ${emergencyType}
        - Healthcare Needs: ${healthcareNeeds}
        - Language Preferences: ${languagePreferences}
        - Contact Preference: ${contactPreference}
        - Travel Status: ${travelStatus}
        Include contact numbers, addresses and relevant details for each emergency service. The response should be practical and useful, with clear and actionable information.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.status(200).json({ results: text.trim() });
    } catch (error) {
        console.error("Error generating emergency contacts:", error.message);
        res.status(500).json({ error: "Failed to generate emergency contacts: " + error.message });
    }
});

http.createServer(app).listen(port, () => {
    console.log(`Emergency server running on port ${port}`);
});
