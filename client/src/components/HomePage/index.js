$(document).ready(function () {
	// STATE
	let postData = null
  // FETCH POSTS
  function fetchPosts() {   
    $.ajax({
        url: "http://localhost:3000/posts",
        type: 'GET',
        contentType: 'application/json'
    }).done(function (data) {
        if (data.status === 'error') {
					$('.alert').remove()
					$(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
        } else {
					postData = data.posts
					postData.forEach(post => {
                $(".content").prepend(`<div class="content-main bg-7c mb-3 " key="${post._id}">
                        <div class="author">
                            <div class="author-main pb-2">
                                <a href="#"><img src="../../assets/images/default-user-avatar.png" alt="" style="width: 30px;"></a>
                                <a href="#">
                                    <span>${post.author}</span>
                                </a>
                            </div>
                            <div class="author-status">
                                <span>${post.content}</span>
                            </div>
                        </div>
                      
                        <div class="reaction-comment d-flex justify-content-between">
														<div class="reaction">
						
															<div class="mr-4 reaction-detail">
																<img class="mr-1 reaction-icon" id="likeIcon" src="../../assets/images/reactions/like-reaction.png" alt="icon">
																${post.reactions.like}
															</div> 
															<div class="mr-4 reaction-detail">
																<img class="mr-1 reaction-icon" id="smileIcon"src="../../assets/images/reactions/haha-reaction.png" alt="icon">
																${post.reactions.smile}
															</div>
															<div class="mr-4 reaction-detail">
																<img class="mr-1 reaction-icon" id="loveIcon" src="../../assets/images/reactions/love-reaction.png" alt="icon">
																${post.reactions.love}
															</div>
															<div class="mr-4 reaction-detail">
																<img class="mr-1 reaction-icon" id="angryIcon" src="../../assets/images/reactions/angry-reaction.png" alt="icon">
																${post.reactions.angry}
															</div>
															<div class="mr-4 reaction-detail">
                                <img class="mr-1 reaction-icon" id="surpriseIcon" src="../../assets/images/reactions/wow-reaction.png" alt="icon">
																${post.reactions.surprise}
															</div>
                            </div>
                            <div class="comment d-flex">
                                <a class=" mr-2" href="#">${post.comments.length} bình luận</a>
                                <a class=" mr-2" href="#">86 lượt chia sẻ</a>
                            </div>
                        </div>
                        <div class="d-flex justify-content-around btn-top-ac">
                            <div class="btn-item"> <button data-toggle="collapse" data-target="#action" class="btn btn-reaction"> <i class="flaticon-like"></i> thích</button></div>
                            <div class="btn-item"> <button data-toggle="collapse" data-target="#comment" class="btn btn-reaction postcomment" id=""> <i class="flaticon-comment-white-oval-bubble"></i> bình luận</button></div>
                            <div class="btn-item"> <button data-toggle="collapse" data-target="#share" class="btn btn-reaction"> <i class="flaticon-share"></i> chia sẻ</button></div>
                        </div>
                        
                        <div class="post-comment-main">
                            <div class="comment-main mt-3 mb-3">
																${post.comments.length > 0 ? post.comments.map(comment => 
																	`<div class="comment-item mb-3">
																		<h5 class="comment-author">${comment.author}</h5>
																		<p class="m-0">${comment.content}</p>
																	</div>` 
																	).toString().replace(/,/g, '') : ''					
																}
                            </div>
                            <div class=" row d-flex align-items-center post-comment-item">
                                <div class="col-1">
                                    <img src="../../assets/images/default-user-avatar.png"
                                        alt="author-commet" class="rounded-circle" style="width:35px;">
                                </div>
                                <div class="col-9 post-main">
                                    <input type="text" class="form-control gPgfXu comment-post">
                                </div>
                                <div class="col-2 p-0">
                                    <button class="btn btn-success btn-comment">Đăng</button>
                                </div>
                            </div>
                        </div>
                    </div>`)
            })
        }
    })
  }

  // FETCH USERS
  function fetchUsers() { 
    $.ajax({
        url: "http://localhost:3000/users",
        type: "GET",
        contentType: 'application/json'
    }).done(function (data) {
        if (!data.isSuccess) {
            $('.alert').remove()
            $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">Database error</div>`)
        } else {
            // console.log(data)
            data.users.forEach(user => {
                $('.list-user').prepend(`<li class="item-r">
                <a href="#"><i class="fa fa-user-circle" aria-hidden="true"></i><span
                        class="ml-2 ">${user.lastName} ${user.firstName}</span></a>
                </li>`)
            })
        }
    })
  }

  fetchPosts()
  fetchUsers()

  // CREATE POST
  $('.btn-post').click(function () {
      let author = $('#sel1').val();
      let content = $('#content-post').val()
      if (!author) {
          $('.alert').remove()
          $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Name Invalid</div>')
          return
      }

      if (!content) {
          $('.alert').remove()
          $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Content Invalid</div>')
          return
      }

      $.ajax({
          url: "http://localhost:3000/posts",
          data: JSON.stringify({
              author,
              content
          }),
          type: 'POST',
          contentType: 'application/json'
      }).done(function (data) {
          if (!data.isSuccess) {
              $('.alert').remove()
              $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
          } else {
						location.reload()
          }
      })
      $('#sel1').val('');
      $('#content-post').val('');
  })


  // CREATE COMMENT
  $(".content").on("click", ".content-main .post-comment-main .post-comment-item .btn-comment", function (event) {
			event.preventDefault();
      let postId = $(this).parents('.content-main').attr("key");
			let comment = $('.comment-post').val()
		
      if (!comment) {
          $('.alert').remove()
          $('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Content Invalid</div>')
          return
			}
			const postInfo = postData.find(post => post._id === postId)

			if (!postInfo) {
				$('.alert').remove()
				$('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
				return
			}
			postInfo.comments.push({
				author: 'Trương Công Hiếu',
				content: comment
			})
      $.ajax({
          url: `http://localhost:3000/posts/${postId}`,
          data: JSON.stringify({
						...postInfo
          }),
          type: 'PUT',
          contentType: 'application/json'
      }).done(function (data) {
          if (!data.isSuccess) {
              $('.alert').remove()
              $(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
          } else {
						location.reload()
          }
      })
	})

	// LIKE
	$(".content").on("click", ".content-main .reaction-comment .reaction .reaction-detail #likeIcon", function (event) {
		event.preventDefault();
		let postId = $(this).parents('.content-main').attr("key");
		const postInfo = postData.find(post => post._id === postId)

		if (!postInfo) {
			$('.alert').remove()
			$('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
			return
		}
		postInfo.reactions.like += 1  

		$.ajax({
			url: `http://localhost:3000/posts/${postId}`,
			data: JSON.stringify({
				...postInfo
			}),
			type: 'PUT',
			contentType: 'application/json'
		}).done(function (data) {
			if (!data.isSuccess) {
					$('.alert').remove()
					$(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
			} else {
				location.reload()
			}
		})
	} )

	// SMILE
	$(".content").on("click", ".content-main .reaction-comment .reaction .reaction-detail #smileIcon", function (event) {
		event.preventDefault();
		let postId = $(this).parents('.content-main').attr("key");
		const postInfo = postData.find(post => post._id === postId)

		if (!postInfo) {
			$('.alert').remove()
			$('.container-fluid').prepend('<div class="alert alert-warning" role="alert">Post Invalid</div>')
			return
		}
		postInfo.reactions.smile += 1  

		$.ajax({
			url: `http://localhost:3000/posts/${postId}`,
			data: JSON.stringify({
				...postInfo
			}),
			type: 'PUT',
			contentType: 'application/json'
		}).done(function (data) {
			if (!data.isSuccess) {
					$('.alert').remove()
					$(".container-fluid").prepend(`<div class="alert alert-danger" role="alert">${data.message}</div>`)
		} else {
				location.reload()
			}
		})
	})
})