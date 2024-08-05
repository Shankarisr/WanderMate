// import express from 'express';
// import cors from 'cors';
// import http from 'http';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3080;
// const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE";

// if (!apiKey) {
//     console.error("API key is missing in environment variables.");
//     process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// app.use(cors());
// app.use(express.json());

// app.get('/api/problem-solving', async (req, res) => {
//     try {
//         const { query } = req.query;

//         if (!query) {
//             return res.status(400).json({ error: "Query is required." });
//         }

//         // Construct the prompt for the AI model
//         const prompt = `Provide a solution for the following travel-related problem: "${query}"`;

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const solution = await response.text();

//         res.status(200).json({ solution: solution.trim() });
//     } catch (error) {
//         console.error("Error generating solution:", error.message);
//         res.status(500).json({ error: "Failed to generate solution: " + error.message });
//     }
// });

// http.createServer(app).listen(port, () => {
//     console.log(`Problem-Solving Assistant server running on port ${port}`);
// });

import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3080;
const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE";

if (!apiKey) {
    console.error("API key is missing in environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(express.json());

app.get('/api/problem-solving', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Query parameter is required." });
        }

        // Construct the prompt for the AI model
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

http.createServer(app).listen(port, () => {
    console.log(`Problem-Solving Assistant server running on port ${port}`);
});
