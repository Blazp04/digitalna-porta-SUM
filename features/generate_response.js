const chat = require('./chat');
const embedding = require('./embeding');
const database = require('./database');



async function askChatGPT(prompt) {
    //create embeding
    vectors = await embedding.createEmbedingFromOpenAI(prompt);
    //getting data from databse
    let data = await database.getDataFromDatabase(vectors);

    let systemMessage = await chat.prepareDataForSystemMessage(prompt, data);

    return await chat.generateGPTAnswer(prompt, systemMessage);

}

async function storeInformation(prompt) {
    //create embeding
    vectors = await embedding.createEmbedingFromOpenAI(prompt);

    data = await database.addDataToDatabase(prompt, vectors);

    return data;

}



module.exports = {
    askChatGPT,
    storeInformation,
}