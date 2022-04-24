  $(document).ready(function() {
    var psw = document.getElementById('psw');
    var btnConnect = document.getElementById('connect');
    btnConnect.onclick = function (e) {
      e.preventDefault();
      if (!psw.value) {
        alert('Please enter a password to check');
      } else {
      var hashedpass = SHA1(psw.value);
      $.ajax({url: "https://leakpass.bienlab.com/api/" + hashedpass, success: function(result){
      document.getElementById("result").innerHTML = "Oh no! The password was leaked! (" + result.count + " times)";
      }, error: function(result) {
      document.getElementById("result").innerHTML = "The password was not leaked!";
      }
      }); }
    }
});

