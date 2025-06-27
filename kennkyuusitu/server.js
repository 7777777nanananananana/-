import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "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";

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + OPENAI_API_KEY
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages,
                max_tokens: 300,
                temperature: 0.7
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "API call failed." });
    }
});

app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: "Gemini API call failed." });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
