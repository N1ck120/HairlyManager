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
      req.userId = decoded.id;
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

app.get('/employees', function(req, res) {
    res.sendFile(__dirname + '/employees.html');
});
  
app.get('/finance', function(req, res) {
    res.sendFile(__dirname + '/finance.html');
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



app.use((req, res, next) => {
  // Obtenha o token do cabeçalho de autorização
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Se não houver token, retorne um erro

  // Verifique a validade do token
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token não for válido, retorne um erro

    req.user = user; // Salve as informações do usuário na solicitação

    next(); // Continue para a próxima rota
  });
});




//ERROR 404
app.get('*', (req, res) => {
    res.send("<h1>404 Página não encontrada!</h1>");
});

