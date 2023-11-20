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
  document.getElementById("username").textContent = (getTokenInfo()).name;
}

function apagarCookie(nome) {
  document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function reset(){
  apagarCookie("token");
  window.location.replace("/login");
}

