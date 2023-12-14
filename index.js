const express = require('express');
const functions = require('./features/generate_response'); // Updated import path
const embedding = require('./features/embeding');

const app = express();
app.use(express.json());


const port = 3000;


app.post('/ask', async (req, res) => {
    const { prompt, ustanova } = req.body;
    let answer = await functions.askChatGPT(prompt, ustanova);

    res.status(201).json({ message: answer });
});

app.post('/addData', async (req, res) => {
    const { prompt, ustanova } = req.body;
    let data = await functions.storeInformation(prompt, ustanova);

    res.status(201).json({ message: data });
});

app.post('/embedding', async (req, res) => {
    const { prompt } = req.body;
    answer = await embedding.createEmbedingFromOpenAI(prompt);

    res.status(201).json({ embedding: answer });
});

app.get('/status', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

app.listen(port, () => {
    console.log(`Express API is running on http://localhost:${port}`);
});
