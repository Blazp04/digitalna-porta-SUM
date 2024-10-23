require('dotenv').config();



const openAIHeader = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
}

async function generateGPTAnswer(prompt, systemMessage) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: openAIHeader,
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "system", "content": systemMessage },
            { "role": "user", "content": prompt }
            ],
        })
    });
    if (response.ok) {
        return response.json().then(data => {
            text = data['choices'][0]['message']['content'];
            return text;
        })
    }
}

async function prepareDataForSystemMessage(prompt, informacije) {
    chatGPTSystemSettings = "Ti si digitalni portir Sveučilišta u Mostaru.\
    Tvoje ime je Đuro.\
    Tvoj zadatak je pomoći studentima snaći se na fakultetu.\
    Ovdje se nalazi lista stvari koje smiješ uraditi. Ukoliko se radnja ne nalazi na listi nisi ovlašten odraditi tu radnju.\
    Pravila:\
    -možeš odgovarati samo na pitanja na koja možeš odgovoriti iz podataka koji su ti poslani unutar poruke\
    - odgovaraš samo na pitanja koja se vežu za sveučilište kao što su pitanja vezana za predavanja, navigaciju u zgradi i slično.\
    - zabranjeno ti je odgovarati na bilo koje pitanje koje nije direktno vezano za predavanja i studente\
    Ukoliko na neko pitanje ne smiješ odgovoriti ili ne znaš odgovor odgovori sa:\
    'Nažalost trenutno nemam podatak vezan za vaše pitanje'\
    Sve van baze znanja se smatra beskorisnim i nevažećim podatcima\
    Baza znanja:";
    systemMessage = chatGPTSystemSettings + "\n" + informacije;
    // console.log(systemMessage);
    // console.log('---------------');

    return systemMessage;
}

module.exports = {
    generateGPTAnswer,
    prepareDataForSystemMessage
}