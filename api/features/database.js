const sql = require('mssql');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

});

//Malo je ovaj kod ružan
//Prvi mi je put da radim s JS
//Uživaj u čitanju ;)

async function getDataFromDatabase(embeding, ustanova) {

    await new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    const query = `select text, dot_product(vector, JSON_ARRAY_PACK("[${embeding}]")) as score
        from aiPorta
        WHERE ustanova = "${ustanova}"
        order by score desc
        limit 2;`;

    const result = await new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

    const informacije = await result.map(item => item.text);
    // console.log(informacije);
    return informacije;
}

async function addDataToDatabase(text, embeding, ustanova) {

    await new Promise((resolve, reject) => {
        db.connect((err) => {
            if (err) reject(err);
            else resolve();
        });
    });

    // const query = `INSERT INTO demoPorta (text, vector) VALUES ("${text}",JSON_ARRAY_PACK("[${embeding}]"));`;
    const query = `INSERT INTO aiPorta (text, vector, ustanova, datum) VALUES ("${text}", JSON_ARRAY_PACK("[${embeding}], "${ustanova}", CURDATE());`;

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
}

