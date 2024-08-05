// import express from 'express';
// import cors from 'cors';
// import http from 'http';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3060; 
// const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE"; // Use environment variable for API key

// if (!apiKey) {
//     console.error("API key is missing in environment variables.");
//     process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// app.use(cors());
// app.use(express.json());

// app.post('/api/safety', async (req, res) => {
//     try {
//         const { destination, season, travelType, accommodation, activitiesPlanned, durationOfStay, specialConsiderations } = req.body;

//         if (!destination || !season || !travelType || !accommodation || !activitiesPlanned || !durationOfStay) {
//             return res.status(400).json({ error: "All required fields must be filled." });
//         }

//         // Construct the prompt for the AI model
//         let prompt = `
//             Provide personalized packing and preparation tips for the following trip:
//             - Destination: ${destination}
//             - Season: ${season}
//             - Travel Type: ${travelType}${req.body.otherTravelType ? ` (${req.body.otherTravelType})` : ''}
//             - Accommodation: ${accommodation}${req.body.otherAccommodation ? ` (${req.body.otherAccommodation})` : ''}
//             - Activities Planned: ${activitiesPlanned}${req.body.otherActivities ? ` (${req.body.otherActivities})` : ''}
//             - Duration of Stay: ${durationOfStay} days
//             - Special Considerations: ${specialConsiderations || 'None'}
//         `;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = await response.text();

//         res.status(200).json({ results: text.trim() });
//     } catch (error) {
//         console.error("Error generating safety tips:", error.message);
//         res.status(500).json({ error: "Failed to generate safety tips: " + error.message });
//     }
// });

// http.createServer(app).listen(port, () => {
//     console.log(`Safety server running on port ${port}`);
// });

import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3060;
const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE"; // Use environment variable for API key

if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

app.post('/api/safety', async (req, res) => {
    try {
        const { destination, season, travelType, accommodation, activitiesPlanned, durationOfStay, specialConsiderations, otherTravelType, otherAccommodation, otherActivities } = req.body;

        if (!destination || !season || !travelType || !accommodation || !activitiesPlanned || !durationOfStay) {
            return res.status(400).json({ error: "All required fields must be filled." });
        }

        // Construct the prompt for the AI model
        let prompt = `
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

http.createServer(app).listen(port, () => {
    console.log(`Packing server running on port ${port}`);
});

