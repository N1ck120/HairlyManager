function criarCookie(nome, valor, dias) {
  if (dias) {
    var data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    var expira = "; expires=" + data.toGMTString();
  } else {
    var expira = "";
  }
  document.cookie = nome + "=" + valor + expira + "; path=/";
}


function login() {
  let email = document.getElementById('email').value.toLowerCase();
  let pass = document.getElementById('pass').value;
  let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  
  if(!email || !pass){
    document.getElementById("errormsg").style.display = "block";
    document.getElementById("errormsgtxt").textContent= "Erro! Preencha todos os campos!";
  }else{
    if (!regex.test(email)) {
      document.getElementById("errormsg").style.display = "block";
      document.getElementById("errormsgtxt").textContent= "Erro! Forneça um email válido!";
    }else{
      fetch('/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, pass}),
      })
      .then(response => response.json()) // transforma a resposta em JSON
      .then(data => {
        // Adicione suas ações aqui dependendo da resposta
      if(data.success == 0) {

        document.getElementById("errormsg").style.display = "none";
        criarCookie("token", data.token, 24);
        window.location.replace("/index");

        // Ação se a resposta for bem-sucedida
      } else if(data.success == 2){

          console.log("dados: "+data)
          document.getElementById("errormsg").style.display = "block";
          document.getElementById("errormsgtxt").textContent= "Erro! Senha incorreta!";
        // Ação se a resposta não for bem-sucedida
      }else{
        document.getElementById("errormsg").style.display = "block";
        document.getElementById("errormsgtxt").textContent= "Erro! Email não cadastrado!";
      }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Ação se ocorrer um erro na requisição
      });
    }
  }
}
