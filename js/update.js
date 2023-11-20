const connection = require('./connection')

function updatePass(pass, id) {
    const sql = 'UPDATE usr SET pass = ? WHERE id_usr = ?';

    connection.query(sql, [pass, id], function(error, results, fields) {
        if (error) throw error
        console.log('Registro atualizado com sucesso.');
    });
}

exports.updatePass = updatePass