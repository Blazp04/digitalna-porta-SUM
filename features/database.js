const sql = require('mssql');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'svc-03247994-6873-41e2-8489-4d45774f90ef-dml.gcp-virginia-1.svc.singlestore.com',
    user: 'admin',
    password: 'Password1!',
    database: 'informacije',

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

