const Post = require('../models/post.model');

module.exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json({isSuccess: true, posts}) 
}

module.exports.createPost = async (req, res) => {
  const { author, content } = req.body
  
  if (!author || !content ) {
    return res.json({
      isSuccess: false,
      message: 'Missing required fields',
    });
  }

  const newPost = new Post({ 
    ...req.body, 
    reactions: {
      like: 0,
      smile: 0,
      love: 0,
      angry: 0,
      surprise: 0
    },
    comments: []
  })

  newPost.save(function(err, doc){
    if(err) {
      return res.json({
        isSuccess: false,
        message: 'Database error',
      })
    } else {
      return res.json({
        isSuccess: true,
        message: 'New post is created',
        newPost: doc,
      })
    }  
 });
}

module.exports.updatePost = (req, res) => {
  if(!req.params.id) {
    return res.json({
      isSuccess: false, message: 'Missing required params'
    });
  }
  console.log('req.body', req.body)

  Post.findByIdAndUpdate(req.params.id, req.body, function(err, doc){
    if (err) {
      return res.json({
        isSuccess: false,
        message: 'Error in updating person with id',
      })
    }
    return res.json({isSuccess: true, updatedPost: req.body});
 })
}