function offline() {
    window.location.href = 'home.html';
}


function login(email, pass) {
    //Login hardcoded para testes
    if(email == "admin" && pass == "admin"){
        window.location.href = 'home.html';
    }else{
        document.getElementById("errologin").style.display = "block";
    }
}

function signup(name, email, pass1, pass2){
    if(name == "" || email == "" || pass1 == "" || pass2 == ""){
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! Preencha todos os campos!";
    }else{
        if(pass1 != pass2){
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! As senhas não coincidem!";
        }else{
            //TODO
            //Trocar para verificação de emails cadastrados no BD
            if(email == "admin"){
                document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! Email já cadastrado!";
            }else{
                //TODO
                //Cadastrar no BD
                window.location.href = 'home.html';
            }
        }
    }
}