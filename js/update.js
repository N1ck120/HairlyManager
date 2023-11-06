const connection = require('./connection')

function update(nome, tipo, id) {
    const sql = 'UPDATE Jogo SET ? WHERE id_jogo = ?';
    const values = {nm_jogo: nome, tipo_jogo: tipo};

    connection.query(sql, [values, id], function(error, results, fields) {
        if (error) throw error
        console.log('Registro atualizado com sucesso.');
    });

    connection.end()
}

exports.update = update