const express = require('express');
const functions = require('./features/generate_response'); // Updated import path
const embedding = require('./features/embeding');
const database = require('./features/database');
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

app.get('/documents', async (req, res) => {
    const apiKey = req.header('api-key');
    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing' });
    }
    const data = await database.getDocuments(apiKey);
    res.status(200).json({ documents: data });
});

app.post('/document-details', async (req, res) => {
    const { id } = req.body;

    const apiKey = req.header('api-key');
    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing' });
    }
    const data = await database.getDocumentDetails(apiKey, id);
    res.status(200).json({ document: data });
});
app.post('/update-document', async (req, res) => {
    const { id, text } = req.body;

    const apiKey = req.header('api-key');
    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing' });
    }
    const vectors = await embedding.createEmbedingFromOpenAI(text)
    const data = await database.updateTextForDocument(apiKey, id, text, vectors);
    res.status(200).json({ document: data });
});

app.post('/delete-document', async (req, res) => {
    const { id } = req.body;
    const apiKey = req.header('api-key');
    if (!apiKey) {
        return res.status(400).json({ error: 'API key is missing' });
    }
    const data = await database.deleteFromDatabase(apiKey, id,);
    res.status(200).json({ resoult: data });
});


app.get('/status', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

app.listen(port, () => {
    console.log(`Express API is running on http://localhost:${port}`);
});
