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
        console.error('Detalji greške:', err);
        return;
    }
    console.log('Connected to the database');
});

// Function to fetch data
async function getDataFromDatabase(embedding, ustanova) {
    const query = `SELECT text, dot_product(vector, JSON_ARRAY_PACK(?)) as score
                   FROM documents
                   WHERE ustanova = ?
                   ORDER BY score DESC
                   LIMIT 2;`;

    const result = await new Promise((resolve, reject) => {
        db.query(query, [embedding, ustanova], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

    const informacije = result.map(item => item.text);
    return informacije;
}

// Function to insert data
async function addDataToDatabase(text, embedding, ustanova) {
    const query = `INSERT INTO documents (text, vector, ustanova, datum) 
                   VALUES (?, JSON_ARRAY_PACK(?), ?, CURDATE());`;

    const result = await new Promise((resolve, reject) => {
        db.query(query, [text, embedding, ustanova], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

    return result;
}

module.exports = {
    getDataFromDatabase,
    addDataToDatabase,
};
