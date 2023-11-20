var isChecked = true;

function showpass() {
  if(isChecked) {
    document.getElementById("eye").src = "/assets/bootstrap-icons/eye.svg";
    document.getElementById("pass").type = "text";
    isChecked = false;
  } else {
    document.getElementById("eye").src = "/assets/bootstrap-icons/eye-slash.svg";
    document.getElementById("pass").type = "password";
    isChecked = true;
  }
}


var isChecked1 = true;

function showpass1() {
  if(isChecked1) {
    document.getElementById("eye1").src = "/assets/bootstrap-icons/eye.svg";
    document.getElementById("pass1").type = "text";
    isChecked1 = false;
  } else {
    document.getElementById("eye1").src = "/assets/bootstrap-icons/eye-slash.svg";
    document.getElementById("pass1").type = "password";
    isChecked1 = true;
  }
}


var isChecked2 = true;

function showpass2() {
  if(isChecked2) {
    document.getElementById("eye2").src = "/assets/bootstrap-icons/eye.svg";
    document.getElementById("pass2").type = "text";
    isChecked2 = false;
  } else {
    document.getElementById("eye2").src = "/assets/bootstrap-icons/eye-slash.svg";
    document.getElementById("pass2").type = "password";
    isChecked2 = true;
  }
}