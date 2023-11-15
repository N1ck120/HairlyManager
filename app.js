const express = require('express');
const bodyParser = require('body-parser');
const argon2 = require('argon2');
const app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8081

//Rotas de redirecionamento

app.listen(port, () => {
  console.log('Example app listening on port ' + port);
});

app.get('/employees', function(req, res) {
    res.sendFile(__dirname + '/employees.html');
});
  
app.get('/finance', function(req, res) {
    res.sendFile(__dirname + '/finance.html');
});
  
app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
  
app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/login.html');
});
  
app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

//Funçôes Gerais

const select = require('./js/select')
const insert = require('./js/insert')
const verifyemail = require('./js/select')
const gethash = require('./js/select')
const connection = require('./js/connection')

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
  connection.query('SELECT pass FROM usr WHERE email = ?', [email], async (error, users) => {
    if (error) {
      return res.json({ success: false, message: 'Database query failed' });
    }
    if (users.length === 0) {
      console.log("Email não cadastrado")
      return res.json({ success: false });
      
    }
    const user = users[0];
    if (await argon2.verify(user.pass, pass)) {
      console.log("Logado")
      res.json({ success: true });
      
    } else {
      console.log("Senha incorreta")
      res.json({ success: false });
    }
  });
});





//ERROR 404
app.get('*', (req, res) => {
    res.send("<h1>404 Página não encontrada!</h1>");
});

