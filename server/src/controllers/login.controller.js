const { users } = require('../data/data')

module.exports.login = (req, res) => {
  const { email, password } = req.body
  const user =  users.find(user => user.email === email && user.password === password)
  
  if (user) {
    res.json({status: 'success'}) 
  } else {
    res.json({status: 'error', message: 'Email or password incorrect'})
  }
}