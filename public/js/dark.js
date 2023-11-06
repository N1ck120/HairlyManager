function dark(){
    if(JSON.parse(localStorage.getItem('dark') == "true")){
        var cardElement = document.querySelector('.card');
        if (cardElement) {
            cardElement.setAttribute('data-bs-theme', 'dark');
            document.getElementById('bkg').style.background = "rgb(30, 42, 58)";
          }
    }
}
