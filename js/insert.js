const connection = require('./connection')

function insert(nome, email, pass){

    let sql = 'INSERT INTO usr SET ?';
    let dados = {nm_usr: nome, email: email, pass: pass}

    connection.query(sql, dados, function(error, results, fields) {
      if (error)throw error
      console.log('Registro adicionado com sucesso.');
      return error
    });

    //connection.end()
}

exports.insert = insert