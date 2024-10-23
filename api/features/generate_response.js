const chat = require('./chat');
const embedding = require('./embeding');
const database = require('./database');



async function askChatGPT(prompt, api_key) {
    //create embeding
    vectors = await embedding.createEmbedingFromOpenAI(prompt);
    //getting data from databse
    let data = await database.getDataFromDatabase(vectors, api_key);

    let systemMessage = await chat.prepareDataForSystemMessage(prompt, data);

    return await chat.generateGPTAnswer(prompt, systemMessage);

}

async function storeInformation(prompt, title, api_key) {
    //create embeding
    vectors = await embedding.createEmbedingFromOpenAI(prompt);

    data = await database.addDataToDatabase(prompt, title, vectors, api_key);

    return data;

}



module.exports = {
    askChatGPT,
    storeInformation,
}