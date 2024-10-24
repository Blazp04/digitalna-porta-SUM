const { query } = require('express');
const mysql = require('mysql2');
require('dotenv').config();

// Create the database connection once
const db = mysql.createConnection({
    host: process.env.SINGLESTORE_HOST,
    port: 3306,
    user: process.env.SINGLESTORE_USER,
    password: process.env.SINGLESTORE_PASSWORD,
    database: process.env.SINGLESTORE_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.log(`Connecting to the database with the following settings:`);
        console.log(`    host: ${process.env.SINGLESTORE_HOST}`);
        console.log(`    user: ${process.env.SINGLESTORE_USER}`);
        console.log(`    password: ${process.env.SINGLESTORE_PASSWORD}`);
        console.log(`    database: ${process.env.SINGLESTORE_DATABASE}`);
        console.error('Error connecting to the database:', err.stack);

        console.error('Greška pri povezivanju:', err.message);
        return;
    }
    console.log('Connected to the database');
});

// Function to fetch data
async function getDataFromDatabase(embeding, api_key) {
    await new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    const query = `select text, dot_product(vector, JSON_ARRAY_PACK("[${embeding}]")) as score
                   FROM znanje
                   WHERE api_key = "${api_key}"
                   ORDER BY score DESC
                   LIMIT 2;`;

    const result = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

    const informacije = await result.map(item => item.text);
    return informacije;
}

async function getDocuments(api_key) {
    const query = `SELECT title,id FROM znanje WHERE api_key = "${api_key}";`

    const result = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    const data = await result.map(item => ({ name: item.title, id: item.id }));
    console.log(api_key)
    return data

}
async function getDocumentDetails(api_key, id) {
    const query = `SELECT text FROM znanje WHERE api_key = "${api_key}" AND id = "${id}";`
    const result = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    const data = await result.map(item => ({ text: item.text }));
    return data
}

async function updateTextForDocument(api_key, id, text, embedding) {
    const query = `UPDATE znanje SET text = "${text}", vector = JSON_ARRAY_PACK("[${embedding}]")  WHERE api_key = "${api_key}" AND id = "${id}";`
    const result = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    return result;
}


// Function to insert data
async function addDataToDatabase(text, title, embedding, api_key) {
    const query = `INSERT INTO znanje (text, title, vector, api_key, datum) VALUES("${text}", "${title}", JSON_ARRAY_PACK("[${embedding}]"), "${api_key}", CURDATE()); `;

    const result = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    return result;
}

async function deleteFromDatabase(api_key, id) {
    const query = `DELETE FROM znanje WHERE api_key = "${api_key}" AND id = "${id}";`
    const result = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
    return result;
}

module.exports = {
    getDataFromDatabase,
    addDataToDatabase,
    getDocuments,
    getDocumentDetails,
    updateTextForDocument,
    deleteFromDatabase,
};
