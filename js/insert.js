const connection = require('./connection')

function insert(nome, email, pass){

    let sql = 'INSERT INTO usr SET ?';
    let dados = {nm_usr: nome, email: email, pass: pass}

    connection.query(sql, dados, function(error, results, fields) {
      if (error)throw error
      console.log('Registro adicionado com sucesso.');
      return error
    });
}


function insertfin(service, price, qt, id){

  let sql = 'INSERT INTO service SET ?';
  let dados = {se_service: service, se_price: price, se_qt: qt, id_usr: id}

  connection.query(sql, dados, function(error, results, fields) {
    if (error)throw error
    console.log('Registro adicionado com sucesso.');
    return error
  });
}


function insertemp(name, phone, salary, year, id){

  let sql = 'INSERT INTO employee SET ?';
  let dados = {em_name: name, em_phone: phone, em_salary: salary, em_year: year, id_usr: id}

  connection.query(sql, dados, function(error, results, fields) {
    if (error)throw error
    console.log('Registro adicionado com sucesso.');
    return error
  });
}

function insertsch(name, schedule, date, service, price, id){

  let sql = 'INSERT INTO schedules SET ?';
  let dados = {sc_name: name, sc_schedule: schedule, sc_date: date, sc_service: service, sc_price: price, id_usr: id}

  connection.query(sql, dados, function(error, results, fields) {
    if (error)throw error
    console.log('Registro adicionado com sucesso.');
    return error
  });
}


exports.insert = insert
exports.insertfin = insertfin
exports.insertemp = insertemp
exports.insertsch = insertsch