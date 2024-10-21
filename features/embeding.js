require('dotenv').config();


const openAIHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
}

async function createEmbedingFromOpenAI(prompt) {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: openAIHeader,
        body: JSON.stringify({
            "input": prompt,
            "model": "text-embedding-ada-002"
        })
    })
    if (response.ok) {
        return response.json().then(data => {
            const embedding = data['data'][0]['embedding'];
            return embedding;
        })
    }
}

module.exports =
{
    createEmbedingFromOpenAI
}