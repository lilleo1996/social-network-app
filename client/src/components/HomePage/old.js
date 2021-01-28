$(document).ready(function() {
  let usersData = []

  // FETCH USERS
  function fetchUsers() {         
    $.ajax({
      url: "http://localhost:3000/users",
      type: 'GET',
      contentType: 'application/json'
    }).done( function (data) {
          if(data.status === 'error') {
            $('.alert').remove()
            $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
          } else {
            usersData = data.data
          
            usersData.forEach(user => {
              $(".users-wrapper").append(
                `<div class="user-info mb-3" key=${user._id}>` +
                  `${user.lastName} ${user.firstName}` + 
                  `<div class="reaction-wrapper row">` +
                    `<div class="detail-reaction">` +
                      `<i class="bi bi-hand-thumbs-up detail-reaction__like"></i>` +
                      `<span class="detail-reaction__count">${user.reactions.like}</span>` +
                    `</div>` +
                    `<div class="detail-reaction">` +
                      `<i class="bi bi-hand-thumbs-down detail-reaction__dislike"></i>` +
                      `<span class="detail-reaction__count">${user.reactions.dislike}</span>` +
                    `</div>` +
                    `<div class="detail-reaction">` +
                      `<i class="bi bi-emoji-smile detail-reaction__smile"></i>` + 
                      `<span class="detail-reaction__count">${user.reactions.smile}</span>` +
                    `</div>` +
                    `<div class="detail-reaction">` +
                      `<i class="bi bi-heart detail-reaction__heart"></i>` +
                      `<span class="detail-reaction__count">${user.reactions.heart}</span>` +
                    `</div>` +
                  `</div>` +
                `</div>`
              )
            });             
          }
    })
  }

  fetchUsers()

  // EVENT PROPAGATION 
  // LIKE
  $( ".users-wrapper" ).on( "click", ".user-info .reaction-wrapper .detail-reaction .detail-reaction__like", function(event) {
    event.preventDefault();
    console.log('LIKE - ', $(this).parents('.user-info').attr("key"));
  })

  // DISLIKE
  $( ".users-wrapper" ).on( "click", ".user-info .reaction-wrapper .detail-reaction .detail-reaction__dislike", function(event) {
    event.preventDefault();
    console.log('DISLIKE - ', $(this).parents('.user-info').attr("key"));
  })

  // SMILE
  $( ".users-wrapper" ).on( "click", ".user-info .reaction-wrapper .detail-reaction .detail-reaction__smile", function(event) {
    event.preventDefault();
    console.log('SMILE - ', $(this).parents('.user-info').attr("key"));
  })

  // HEART
  // $( ".users-wrapper" ).on( "click", ".user-info .reaction-wrapper .detail-reaction .detail-reaction__heart", function(event) {
  //   event.preventDefault();
  //   console.log('HEART - ', $(this).parents('.user-info').attr("key"));
  // })

  // FIX DO NOT LISTEN EVENT
  $(document).on( "click", ".detail-reaction__heart", function(event) {
    console.log('hihi');
  })
})