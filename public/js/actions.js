document.addEventListener('DOMContentLoaded', function() {
    const botoesVoltar = document.querySelectorAll('.botao-voltar');

    for (const botao of botoesVoltar) {
        botao.addEventListener('click', function() {
            window.history.back();
        });
    }
});

function config() {
    window.location.href = 'config';
}

function showpass(){
    if(document.getElementById("showpass").checked == true){
        document.getElementById('pass').type = 'text';
    }else{
        document.getElementById('pass').type = 'password';
    }
}

function showpass1(){
    if(document.getElementById("showpass1").checked == true){
        document.getElementById('pass1').type = 'text';
        document.getElementById('pass2').type = 'text';
    }else{
        document.getElementById('pass1').type = 'password';
        document.getElementById('pass2').type = 'password';
    }
}


