const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = express();
var path = require('path');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8081

//Geração da chave de assinatura do token

const secret = crypto.randomBytes(64).toString('hex');
console.log(secret);

//Funções de verificação e decodificação de token

function verifyToken(req, res, next) {
  const token = req.cookies['token'];
  if (!token) {
      return res.status(403).redirect('/401');
  }
  jwt.verify(token, secret, function(err, decoded) {
      if (err) {
          // Redirecionar para a página 401
          return res.status(401).redirect('/401');
      }
      // req.userId = decoded.id;
      next();
  });
}


function decodeToken(token) {
  const decoded = jwt.decode(token);
  console.log(decoded);
}

//Rotas de redirecionamento

app.listen(port, () => {
  console.log('Example app listening on port ' + port);
});

app.get('/employees',verifyToken, function(req, res) {
    res.sendFile(__dirname + '/employees.html');
});
  
app.get('/finance',verifyToken, function(req, res) {
    res.sendFile(__dirname + '/finance.html');
});

app.get('/editusr',verifyToken, function(req, res) {
  res.sendFile(__dirname + '/editusr.html');
});

app.get('/settings',verifyToken, function(req, res) {
  res.sendFile(__dirname + '/settings.html');
});

app.get('/schedules',verifyToken, function(req, res) {
  res.sendFile(__dirname + '/schedules.html');
});

app.get('/index',verifyToken, function(req, res) {
    res.sendFile(__dirname + '/index.html');
    decodeToken(req.cookies['token']);
});
  
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/login.html');
});
  
app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

//Funçôes Gerais

const insertsch = require('./js/insert')
const insertemp = require('./js/insert')
const insertfin = require('./js/insert')
const schedule = require('./js/select')
const select = require('./js/select')
const insert = require('./js/insert')
const verifyemail = require('./js/select')
const gethash = require('./js/select')
const connection = require('./js/connection')
const updatePass = require('./js/update')

async function gerarHash(senha) {
  try {
    let hash1 = await argon2.hash(senha, { hashLength: 128 });
    return hash1;
  } catch (err) {
    console.log(err);
  }
}

async function verificarSenha(hash2, senha) {
  try {
    if (await argon2.verify(hash2, senha)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}

//Rotas de Função

//Cadastro

app.post('/signup', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.pass;

  try {
    const passhash = await gerarHash(pass);

    verifyemail.verifyemail(email, (error, dados) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
        return;
      }
      if (dados) {
        res.status(409).send('Erro! Email já cadastrado!');
      } else {
        try {
          insert.insert(name, email, passhash);
          res.status(200).send('Usuário cadastrado com sucesso!');
        } catch (err) {
          console.error(err);
          res.status(500).send('Erro no servidor');
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

//Login
app.post('/login', (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  connection.query('SELECT * FROM usr WHERE email = ?', [email], async (error, users) => {
    if (error) {
      return res.json({ success: false, message: 'Database query failed' });
    }
    if (users.length === 0) {
      console.log("Email não cadastrado")
      return res.json({ success: 1 });
    }
    const user = users[0];
    if (await argon2.verify(user.pass, pass)) {

      const token = jwt.sign({ id: user.id_usr, name: user.nm_usr, email: email }, secret, { expiresIn: '1h' });
      res.json({ success: 0, token: token });
      console.log("Logado");

    } else {

      console.log("Senha incorreta");
      res.json({ success: 2 });
      
    }
  });
});

//Tabela Finance

app.post('/finance', async (req, res) => {
  const id = req.body.id;

  try {
    select.select('service', id, (error, dados) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
        return;
      }
      if (dados) {
        //console.log(dados);
        res.json(JSON.stringify(dados));
      } else {
        console.log("Sem dados");
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});


//Cad Finance

app.post('/financecad', async (req, res) => {
  const service = req.body.service;
  const price = req.body.price;
  const qt = req.body.qt;
  const id = req.body.id;

  try {
    insertfin.insertfin(service, price, qt, id);
    res.status(200).send('Linha cadastrada com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});


//Tabela Employees

app.post('/employees', async (req, res) => {
  const id = req.body.id;

  try {
    select.select('employee', id, (error, dados) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
        return;
      }
      if (dados) {
        //console.log(dados);
        res.json(JSON.stringify(dados));
      } else {
        console.log("Sem dados");
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});


//Cad Employees

app.post('/employeescad', async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const salary = req.body.salary;
  const year = req.body.year;
  const id = req.body.id;

  try {
    insertemp.insertemp(name, phone, salary, year, id);
    res.status(200).send('Linha cadastrada com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});



//Tabela Schedules

app.post('/schedules', async (req, res) => {
  const id = req.body.id;

  try {
    schedule.schedule('schedules', id, (error, dados) => {
      if (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
        return;
      }
      if (dados) {
        console.log(dados);
        res.json(JSON.stringify(dados));
      } else {
        console.log("Sem dados");
      }
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});


//Cad Schedules

app.post('/schedulescad', async (req, res) => {
  const name = req.body.name;
  const schedule = req.body.schedule;
  const date = req.body.date;
  const service = req.body.service;
  const price = req.body.price;  
  const id = req.body.id;

  try {
    insertsch.insertsch(name, schedule, date, service, price, id);
    res.status(200).send('Linha cadastrada com sucesso!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

//Atualizar senha
app.post('/editusr', async (req, res) => {
  const pass = req.body.pass;
  const pass1 = req.body.pass1;

  try {
    const passhash1 = await gerarHash(pass1);
    //const tokenedit = decodeToken(req.cookies['token']);
    const tokenedit = jwt.decode(req.cookies['token']);
    console.log("Token: "+ tokenedit.id);
    connection.query('SELECT * FROM usr WHERE id_usr = ?', [tokenedit.id], async (error, users) => {
      if (error) {
        return res.json({ success: false, message: 'Database query failed' });
      }
      const user = users[0];
      if (await argon2.verify(user.pass, pass)) {
        try {
          updatePass.updatePass(passhash1, tokenedit.id);
          return res.json({ success: 0 });
        } catch (err) {
          console.error(err);
          res.status(500).send('Erro no servidor');
        }
      } else {
        console.log("Senha incorreta");
        res.json({ success: 1 });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

//ERROR 404
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/404.html');
});