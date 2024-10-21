CREATE DATABASE IF NOT EXISTS djuro;

CREATE TABLE IF NOT EXISTS znanje(
    text TEXT,
    title TEXT,
    api_key TEXT,
    datum DATE,
    vector BLOB
);

DROP TABLE znanje;

SELECT text, dot_product(vector, JSON_ARRAY_PACK(?)) as score
                   FROM znanje
                   WHERE api_key = ?
                   ORDER BY score DESC
                   LIMIT 2;

INSERT INTO znanje (
    text,
    title,
    vector,
    api_key,
    datum
) VALUES (
    ?, 
    ?,
    JSON_ARRAY_PACK(?), 
    ?, 
    CURDATE()
);

SELECT * FROM znanje