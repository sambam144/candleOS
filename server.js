// GM Screen - CandleOS
// Copyright (C) 2025 Sam Lidgard
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// See the file LICENSE for details.
// Load our secret key from the .env file
require('dotenv').config();
const express = require('express');
// We will import node-fetch dynamically inside the function where it's used.

const app = express();
const port = 3000;

// This lets our server understand JSON and allows our HTML file to talk to it
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// This is the main endpoint our GM Screen will call
app.post('/generate', async (req, res) => {
    // Dynamically import the node-fetch library
    const { default: fetch } = await import('node-fetch');

    const userPrompt = req.body.prompt;
    if (!userPrompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    // CORRECTED: Updated the model name to the stable 'gemini-pro'
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const payload = {
            contents: [{
                parts: [{
                    text: userPrompt
                }]
            }]
        };

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await apiResponse.json();
        
        // Add a check to make sure the response is valid before sending it back
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content) {
            const generatedText = result.candidates[0].content.parts[0].text;
            res.json({ text: generatedText });
        } else {
            // If the response is not valid, log it and send an error
            console.error('Invalid response structure from Gemini API:', result);
            res.status(500).json({ error: 'Received an invalid response from the AI.' });
        }

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to generate content.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});