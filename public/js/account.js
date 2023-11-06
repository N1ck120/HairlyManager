

function offline() {
    window.location.href = '/home';
}

/*function login(email, pass) {
    //Login hardcoded para testes
    if(email == "admin" && pass == "admin"){
        window.location.href = 'home.html';
    }else{
        document.getElementById("errologin").style.display = "block";
    }
}*/

/*function signup(){
    if(name == "" || email == "" || pass1 == "" || pass2 == ""){
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! Preencha todos os campos!";
            return false;
    }else{
        if(pass1 != pass2){
            document.getElementById("errormsg").style.display = "block";
            document.getElementById("errormsgtxt").textContent= "Erro! As senhas não coincidem!";
            return false;
        }else{
            if(email == "admin"){
                document.getElementById("errormsg").style.display = "block";
                document.getElementById("errormsgtxt").textContent= "Erro! Email já cadastrado!";
                return false;
            }else{   
                return false;
            }
        }
    }
}*/