// import express from 'express';
// import cors from 'cors';
// import http from 'http';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3007; // Use port 3007 for the CulturePage API
// const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE"; // Ensure you have set this in your .env file

// if (!apiKey) {
//     console.error("API key is missing in environment variables.");
//     process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// app.use(cors());
// app.use(express.json());

// app.post('/api/culture', async (req, res) => {
//     try {
//         const {
//             destination,
//             placeType,
//             otherPlaceDescription,
//             season,
//             specificEvents,
//             languagePreferences,
//             companions,
//             culturalInterests,
//         } = req.body;

//         if (!destination || !placeType) {
//             return res.status(400).json({ error: "Destination and Place Type are required fields." });
//         }

//         // Construct the prompt for the AI model
//         const prompt = `
//             Provide cultural insights based on the following details for all categories of people:
//             - Destination: ${destination}
//             - Place Type: ${placeType}${placeType === 'others' ? ` (${otherPlaceDescription})` : ''}
//             - Season: ${season ? season : 'any'}
//             - Specific Events: ${specificEvents ? specificEvents : 'none'}
//             - Language Tips Needed: ${languagePreferences ? 'Yes' : 'No'}
//             - Traveling Companions: ${companions ? companions : 'not specified'}
//             - Interests: ${culturalInterests.length > 0 ? culturalInterests.join(', ') : 'none'}
            
//             Include recommended dress code, cultural details, and any special considerations for the specified location and place.
//         `;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = await response.text();

//         res.status(200).json({ results: text.trim() });
//     } catch (error) {
//         console.error("Error generating cultural insights:", error.message);
//         res.status(500).json({ error: "Failed to generate cultural insights: " + error.message });
//     }
// });

// http.createServer(app).listen(port, () => {
//     console.log(`Culture server running on port ${port}`);
// });
import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3007; // Use port 3007 for the CulturePage API
const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE"; // Ensure you have set this in your .env file

if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

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

        // Construct the prompt for the AI model
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

http.createServer(app).listen(port, () => {
    console.log(`Culture server running on port ${port}`);
});
