const express = require('express');
const functions = require('./features/generate_response'); // Updated import path
const embedding = require('./features/embeding');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
const port = 3000;


app.post('/ask', async (req, res) => {
    const { prompt, } = req.body;
    const apiKey = req.header('api-key');
    let answer = await functions.askChatGPT(prompt, apiKey);

    res.status(201).json({ message: answer });
});

app.post('/addData', async (req, res) => {
    const { text, title } = req.body;
    const apiKey = req.header('api-key');

    let data = await functions.storeInformation(text, title, apiKey);

    res.status(201).json({ message: data });
});

app.post('/embedding', async (req, res) => {
    const { prompt } = req.body;
    answer = await embedding.createEmbedingFromOpenAI(prompt);

    res.status(201).json({ embedding: answer });
});

app.use((req, res, next) => {
    const apiKey = req.header('api-key');
    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing' });
    }
    next();
});

app.get('/documents', (req, res) => {
    const apiKey = req.header('api-key');
    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing' });
    }
    res.status(200).json({ documents: functions.getDocuments() });
});

app.get('/status', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

app.listen(port, () => {
    console.log(`Express API is running on http://localhost:${port}`);
});
