const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8081

app.listen(port, () => {
  console.log('Example app listening on port ' + port)
})

app.get('/index', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/home', function(req, res) {
  res.sendFile(__dirname + '/home.html')
})

app.get('/config', function(req, res) {
  res.sendFile(__dirname + '/config.html')
})

app.get('/colab', function(req, res) {
  res.sendFile(__dirname + '/colaboradores.html')
})

app.get('/finance', function(req, res) {
  res.sendFile(__dirname + '/finance.html')
})

app.get('/cadastrar', function(req, res) {
  res.sendFile(__dirname + '/signup.html')
})

const insert = require('./js/insert')

app.post('/cadastro', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.pass1;

  try {
    await insert.insert(name, email, pass); // Espera a função insert ser concluída
    res.redirect('/index');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});



const select = require('./js/select')

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass1;

  select.select(email, pass, (error, dados) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro no servidor');
      return;
    }

    if (dados) {
      // Faça algo com os dados, por exemplo, enviar uma resposta com os dados
      
      console.log('Dados encontrados: ' + JSON.stringify(dados))
      res.redirect('/home');
    } else {
      // Nenhum dado encontrado
      res.send(`
        <script>
          alert('Login ou senha incorretos');
          window.location.href = '/index'; // Redirecione de volta para a página de login
        </script>
      `);
    }
  });
});





//ERROR 404
app.get('*', (req, res) => {
  res.send("<h1>404 Página não encontrada!</h1>");
});