const connection = require('./connection')

function del(id) {
    const sql = 'DELETE FROM Jogo WHERE id_jogo = ?'

    connection.query(sql, id, (error, results) => {
      if (error) throw error
      console.log('Registro apagado com sucesso.');
    });

    connection.end()
}

exports.del = del