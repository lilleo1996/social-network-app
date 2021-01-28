const User = require('../models/user.model');

module.exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json({isSuccess: true, users}) 
}


module.exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if(user) {
    return res.json({
      isSuccess: true,
      user,
    })
  }
  return res.json({
    isSuccess: false,
    message: 'User does not exist yet',
  })
}

module.exports.createUser = async (req, res) => {
  const { email, password, firstName, lastName, birthday, gender } = req.body
  
  if (!email || !password || !firstName || !lastName || !birthday || !gender) {
    return res.json({
      isSuccess: false,
      message: 'Missing required fields',
    });
  }

  const user = await User.findOne({ email })

  if (user) {
    return res.json({
      isSuccess: false,
      message: 'Email was registered',
    })
  }

  const newUser = new User({ ...req.body })

  newUser.save(function(err, doc){
    if(err) {
      return res.json({
        isSuccess: false,
        message: 'Database error',
      })
    } else {
      return res.json({
        isSuccess: true,
        message: 'User is created',
        newUser: doc,
      })
    }  
 });
}

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, doc){
    if (err) {
      return res.json({
        isSuccess: false,
        message: 'Error in updating person with id',
      })
    }
    return res.json({isSuccess: true, updatedUser: doc});
 })
}

module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id, function(err, response){
    if (err) {
      return res.json({
        isSuccess: false,
        message: `Error in deleting record id ${req.params.id}`,
      })
    }
    return res.json({
      isSuccess: true,
      message: `Person with id ${req.params.id} removed`,
    });
 })
}