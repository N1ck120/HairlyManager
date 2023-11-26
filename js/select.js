const connection = require('./connection')

function select(table, id_usr, callback) {
    let sql = `SELECT * FROM ${table} WHERE id_usr = ?`;
    
    connection.query(sql, [id_usr], function(error, results, fields) {
        if (error) {
            callback(error, null); // Se houver erro, chame o callback com o erro
            return;
        }
    
        if (results.length === 0) {
            console.log('Nenhum dado encontrado');
            callback(null, null); // Nenhum dado encontrado, chame o callback com null
            return;
        }
    
        const dados = results;
        console.log(dados);

        callback(null, dados); // Chame o callback com os dados
    });
}


function count(table, id_usr, callback) {
    let sqlcount = `SELECT COUNT(*) FROM ${table} WHERE id_usr = ?`;
    
    connection.query(sqlcount, [id_usr], function(error, results, fields) {
        if (error) {
            callback(error, null); // Se houver erro, chame o callback com o erro
            return;
        }
    
        if (results.length === 0) {
            console.log('Nenhum dado encontrado');
            callback(null, null); // Nenhum dado encontrado, chame o callback com null
            return;
        }
    
        const dados = results;
        console.log(dados);

        callback(null, dados); // Chame o callback com os dados
    });
}


function verifyemail(email,callback) {
    let sql = 'SELECT email FROM usr WHERE email = ?'
    
    connection.query(sql, [email], function(error, results, fields) {
        if (error) {
            callback(error, null); // Se houver erro, chame o callback com o erro
            return;
        }
    
        if (results.length === 0) {
            console.log('Nenhum dado encontrado');
            callback(null, null); // Nenhum dado encontrado, chame o callback com null
            return;
        }
    
        const dados = results[0];
        console.log('Email: ' + dados.email);
  
        callback(null, dados); // Chame o callback com os dados
    });
}

exports.select = select;
exports.count = count;
exports.verifyemail = verifyemail;
