import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
//const apiKey = process.env.GOOGLE_GEN_AI_API_KEY || 'AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE';
const apiKey = process.env.API_KEY;


if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

// Problem Solving Assistant
app.get('/api/problem-solving', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required." });
        }

        const prompt = `Provide a solution for the following travel-related problem: "${query}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const solution = await response.text();

        res.status(200).json({ solution: solution.trim() });
    } catch (error) {
        console.error("Error generating solution:", error.message);
        res.status(500).json({ error: "Failed to generate solution: " + error.message });
    }
});

// Culture Insights
app.post('/api/culture', async (req, res) => {
    try {
        const {
            destination,
            placeType,
            otherPlaceDescription,
            season,
            specificEvents,
            languagePreferences,
            companions,
            culturalInterests,
        } = req.body;

        if (!destination || !placeType) {
            return res.status(400).json({ error: "Destination and Place Type are required fields." });
        }

        const prompt = `
            Provide cultural insights based on the following details:
            - Destination: ${destination}
            - Place Type: ${placeType}${placeType === 'others' ? ` (${otherPlaceDescription})` : ''}
            - Season: ${season ? season : 'any'}
            - Specific Events: ${specificEvents ? specificEvents : 'none'}
            - Language Tips Needed: ${languagePreferences ? 'Yes' : 'No'}
            - Traveling Companions: ${companions ? companions : 'not specified'}
            - Interests: ${culturalInterests.length > 0 ? culturalInterests.join(', ') : 'none'}
            
            Include recommended dress code, cultural details, and any special considerations for the specified location and place.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.status(200).json({ results: text.trim() });
    } catch (error) {
        console.error("Error generating cultural insights:", error.message);
        res.status(500).json({ error: "Failed to generate cultural insights: " + error.message });
    }
});

// Emergency Contacts
app.post('/api/emergency', async (req, res) => {
    const { city, state, emergencyType, healthcareNeeds, languagePreferences, contactPreference, travelStatus } = req.body;

    if (!city || !state || !emergencyType || !contactPreference || !travelStatus) {
        return res.status(400).json({
            error: "City, State, Emergency Type, Contact Preference, and Travel Status are required."
        });
    }

    const prompt = `
        Provide emergency contact details based on the following criteria:
        - City: ${city}
        - State: ${state}
        - Emergency Type: ${emergencyType}
        - Healthcare Needs: ${healthcareNeeds}
        - Language Preferences: ${languagePreferences}
        - Contact Preference: ${contactPreference}
        - Travel Status: ${travelStatus}
        Include contact numbers, addresses, and relevant details for each emergency service. The response should be practical and useful, with clear and actionable information.
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

// Itinerary
app.post('/api/itinerary', async (req, res) => {
    try {
        const { numberOfPeople, numberOfDays, place, budget, fromLocation, focus, otherFocus } = req.body;

        if (!numberOfPeople || !numberOfDays || !place || !budget || !fromLocation || !focus) {
            return res.status(400).json({ error: "All fields are required." });
        }

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

// Language Learning
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

        const phrases = text.split('\n').filter(line => line.trim() !== '').map(line => ({
            original: line,
            translation: '', 
            pronunciation: '',
            culturalNote: '',
        }));

        res.status(200).json({ phrases });
    } catch (error) {
        console.error("Error generating phrases:", error.message);
        res.status(500).json({ error: "Failed to generate phrases: " + error.message });
    }
});

// Packing and Safety Tips
app.post('/api/safety', async (req, res) => {
    try {
        const { destination, season, travelType, accommodation, activitiesPlanned, durationOfStay, specialConsiderations, otherTravelType, otherAccommodation, otherActivities } = req.body;

        if (!destination || !season || !travelType || !accommodation || !activitiesPlanned || !durationOfStay) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        const prompt = `
            Provide personalized packing and preparation tips for the following trip:
            - Destination: ${destination}
            - Season: ${season}
            - Travel Type: ${travelType}${otherTravelType ? ` (${otherTravelType})` : ''}
            - Accommodation: ${accommodation}${otherAccommodation ? ` (${otherAccommodation})` : ''}
            - Activities Planned: ${activitiesPlanned}${otherActivities ? ` (${otherActivities})` : ''}
            - Duration of Stay: ${durationOfStay} days
            - Special Considerations: ${specialConsiderations || 'None'}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        res.status(200).json({ results: text.trim() });
    } catch (error) {
        console.error("Error generating safety tips:", error.message);
        res.status(500).json({ error: "Failed to generate safety tips: " + error.message });
    }
});

// Translation
app.post('/api/translate', async (req, res) => {
    try {
        const { text, targetLang } = req.body;

        if (!text || !targetLang) {
            return res.status(400).json({ error: "Text and target language are required." });
        }

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
    console.log(`Server running on port ${port}`);
});
