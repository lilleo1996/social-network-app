$(document).ready(function() {
  // LOGIN
  $('#loginButton').click(function() {
    const email= $("#emailInput").val()
    const password = $("#passwordInput").val()
    if(!email) {
      $('.alert').remove()
      $(".container-fluid").prepend(`<div class="alert alert-warning" role="alert">Email invalid</div>`)
      return
    }

    if(!password) {
      $('.alert').remove()
      $(".container-fluid").prepend(`<div class="alert alert-warning" role="alert">Password invalid</div>`)
      return
    }

    $.ajax(
      {
        url: "http://localhost:3000/login",
        data: JSON.stringify({
          email,
          password
        }),
        type: 'POST',
        contentType: 'application/json'
      }).done( function (data) {
          if(data.status === 'error') {
            $('.alert').remove()
            $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
          } else {
            window.location.replace('file:///C:/Users/HieuTC7/Downloads/social-network-app/client/src/components/HomePage/index.html')
          }
      })
  })

  // SIGN IN
  $('#signupButton').click(function() {
    window.location.replace('file:///Users/macintoshhd/Developer/mindX/Fullstack/demo/social-network-app/client/src/components/SignUpPage/index.html')
  })
 })