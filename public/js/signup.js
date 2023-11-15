function showpass() {
  var pass1 = document.getElementById("pass");
  var pass2 = document.getElementById("pass1");
  var showPass = document.getElementById("showpass");

  if(showPass.checked) {
    pass1.type = "text";
    pass2.type = "text";
  }else{
    pass1.type = "password";
    pass2.type = "password";
  }
}

// Função para fazer a requisição HTTP
function enviarDados() {
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value.toLowerCase();
  let pass = document.getElementById('pass').value;
  let pass1 = document.getElementById('pass1').value;
  let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  if(!name || !email || !pass || !pass1){
    document.getElementById("errormsg").style.display = "block";
    document.getElementById("errormsgtxt").textContent= "Erro! Preencha todos os campos!";
  }else{
    if (!regex.test(email)) {
      document.getElementById("errormsg").style.display = "block";
      document.getElementById("errormsgtxt").textContent= "Erro! Forneça um email válido!";
    }else{
      if(pass != pass1){
        document.getElementById("errormsg").style.display = "block";
        document.getElementById("errormsgtxt").textContent= "Erro! As senhas não coincidem!";
      }else{
        fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, email, pass}),
        })
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            throw response;
          }
        })
        .then((data) => {
          // Usuário cadastrado com sucesso
          document.getElementById("errormsg").style.display = "none";
          document.getElementById("sucessmsg").style.display = "block";
          document.getElementById("sucessmsgtxt").textContent= "Cadastrado com sucesso! Redirecionando...";
          setTimeout(function(){ location.href = '/login'; }, 2000);
        })
        .catch((response) => {
          // Verifique o status da resposta
          if (response.status === 409) {
            // Email já cadastrado
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! Email já cadastrado!";
          } else {
            // Outro erro
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro no servidor";
          }
        });        
      }
    }
  }
}
