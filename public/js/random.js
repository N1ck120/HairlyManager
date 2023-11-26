function randimg(){
  var numeroAleatorio = Math.floor(Math.random() * 10) + 1;
  numeroAleatorio = numeroAleatorio + ".jpeg"
  document.getElementById("bkgd").style.backgroundImage = "url('/imagens/" + numeroAleatorio + "')";
}
