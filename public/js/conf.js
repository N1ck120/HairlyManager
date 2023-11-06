function reset(){ 
    if (confirm("Essa ação apagará TODOS os dados do aplicativo, para continuar clique em OK") == true) {
        document.getElementById("deletedalert").style.display = "block";
        localStorage.clear();
        setTimeout(() => {
            location.reload();
          }, 3000);
          
      }
}

function darkpref(){
    if(document.getElementById("switch1").checked == true){
        localStorage.setItem('dark', JSON.stringify(true))
        location.reload();
       
    }else{
        localStorage.setItem('dark', JSON.stringify(false))
        location.reload();
    }
}

function restoreswitch(){
        document.getElementById("switch1").checked = JSON.parse(localStorage.getItem('dark'));
}

