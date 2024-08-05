// import express from 'express';
// import cors from 'cors';
// import http from 'http';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3010; // Use port 3009 for language learning
// const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE"; // Use environment variable for API key

// if (!apiKey) {
//     console.error("API key is missing in environment variables.");
//     process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(apiKey);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// app.use(cors());
// app.use(express.json());

// app.post('/api/language-learning', async (req, res) => {
//     try {
//         const { destination, language, phraseCategories, specificPhrases } = req.body;

//         if (!destination || !language || !phraseCategories.length) {
//             return res.status(400).json({ error: "Destination, Language, and Phrase Categories are required." });
//         }

//         // Construct the prompt for the AI model
//         let prompt = `
//             Provide basic phrases in ${language} for traveling to ${destination}. 
//             Categories: ${phraseCategories.join(', ')}.
//             ${specificPhrases ? `Specific phrases: ${specificPhrases}` : ''}
//         `;

//         console.log("Prompt sent to AI model:", prompt); // Debugging log

//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = await response.text();

//         console.log("Response from AI model:", text); // Debugging log

//         // Parsing the text response into a structured format
//         const phrases = parsePhrases(text);

//         console.log("Parsed phrases:", phrases); // Debugging log

//         res.status(200).json({ phrases });
//     } catch (error) {
//         console.error("Error generating phrases:", error.message);
//         res.status(500).json({ error: "Failed to generate phrases: " + error.message });
//     }
// });

// // Helper function to parse phrases from the AI response
// const parsePhrases = (text) => {
//     const phrases = [];
//     const lines = text.split('\n').filter(line => line.trim() !== '');

//     lines.forEach(line => {
//         // Assuming each line contains phrase and description separated by '-'
//         const parts = line.split('-').map(part => part.trim());
//         if (parts.length < 2) return; // Skip lines that don't have a '-'

//         const [phrase, description] = parts;
//         const pronunciationMatch = description.match(/\(pronounced: (.*?)\)/);
//         const pronunciation = pronunciationMatch ? pronunciationMatch[1] : null;
//         const culturalNote = description.replace(/\(pronounced:.*?\)/, '').trim();

//         phrases.push({
//             original: phrase,
//             translation: culturalNote,
//             pronunciation,
//             culturalNote: null
//         });
//     });

//     return phrases;
// };

// http.createServer(app).listen(port, () => {
//     console.log(`Language Learning server running on port ${port}`);
// });

import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3050; // Ensure port matches frontend requests
const apiKey = "AIzaSyC6JDzPAaYEit1WLf9pTSjELdefvctBWbE"; // Use environment variable for API key

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
