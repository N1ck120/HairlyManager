function showpass() {
    var pass1 = document.getElementById("pass");
    var pass2 = document.getElementById("pass1");
    var showPass = document.getElementById("showpass");
  
    if(showPass.checked) {
      pass1.type = "text";
      pass2.type = "text";
    }else{
      pass1.type = "password";
      pass2.type = "password";
    }
  }


  function showpass1() {
    var pass1 = document.getElementById("pass");
    var pass2 = document.getElementById("pass1");
    var pass3 = document.getElementById("pass2");
    var showPass = document.getElementById("showpass");
  
    if(showPass.checked) {
      pass1.type = "text";
      pass2.type = "text";
      pass3.type = "text";
    }else{
      pass1.type = "password";
      pass2.type = "password";
      pass3.type = "password";
    }
  }