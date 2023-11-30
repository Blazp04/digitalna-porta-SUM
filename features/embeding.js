const openAIHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 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'
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