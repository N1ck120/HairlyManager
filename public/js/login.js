// Função para fazer a requisição HTTP
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
        if(data.success) {
            console.log("secesso"+data.sucess)
            console.log(data)
          // Ação se a resposta for bem-sucedida
        } else {
            console.log("secesso"+data.sucess)
            console.log("dados"+data)
          // Ação se a resposta não for bem-sucedida
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // Ação se ocorrer um erro na requisição
      });
    }
  }
}
