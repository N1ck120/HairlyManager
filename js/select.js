const connection = require('./connection')

function select(email, pass, callback) {
    let sql = 'SELECT * FROM usr WHERE email = ? AND pass = ?'
    
    connection.query(sql, [email, pass], function(error, results, fields) {
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
        console.log('Nome: ' + dados.nm_usr);
        console.log('Email: ' + dados.email);
        console.log('Pass: ' + dados.pass);

        callback(null, dados); // Chame o callback com os dados
    });
    
    //connection.end();
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
    
    //connection.end();
}

exports.select = select;
exports.verifyemail = verifyemail;
