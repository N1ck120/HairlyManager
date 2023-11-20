function changePass() {
    let pass = document.getElementById('pass').value;
    let pass1 = document.getElementById('pass1').value;
    let pass2 = document.getElementById('pass2').value;
    
    if(!pass || !pass1 || !pass2){
      document.getElementById("errormsg").style.display = "block";
      document.getElementById("errormsgtxt").textContent= "Erro! Preencha todos os campos!";
    }else{
        if(pass1 != pass2){
          document.getElementById("errormsg").style.display = "block";
          document.getElementById("errormsgtxt").textContent= "Erro! As senhas não coincidem!";
        }else{
          fetch('/editusr', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({pass, pass1}),
        })
        .then(response => response.json()) // transforma a resposta em JSON
        .then(data => {
        // Adicione suas ações aqui dependendo da resposta
        if(data.success == 0) {

          document.getElementById("errormsg").style.display = "none";
          document.getElementById("sucessmsg").style.display = "block";
          document.getElementById("sucessmsgtxt").textContent= "Senha atualizada com sucesso! Redirecionando...";
          window.location.replace("/index");

        } else if(data.success == 1){

            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! Senha incorreta!";
      
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      })     
        }
    }
  }





function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
  
function jwtDecode(t) {
  let token = {};
  token.raw = t;
  token.header = JSON.parse(window.atob(t.split('.')[0]));
  token.payload = JSON.parse(window.atob(t.split('.')[1]));
  return token;
}
  
function getTokenInfo(){
  let tinfo = jwtDecode(getCookie("token"));
  console.log(tinfo);
  return tinfo.payload;
}

function loadInfo(){
  document.getElementById("name").value = (getTokenInfo()).name;
  document.getElementById("email").value = (getTokenInfo()).email;
}