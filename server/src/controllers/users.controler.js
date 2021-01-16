const { v4: uuidv4 } = require('uuid');

const { users } = require('../data/data')

module.exports.getUsers = (req, res) => {
  res.json({status: 'success', users}) 
}

module.exports.getUserById = (req, res) => {
  const { id } = req.params
  selectedUser =  users.find(user => user.id === id)
  res.json({status: 'success', selectedUser}) 
}

module.exports.createUser = (req, res) => {
  const newUser = {id: uuidv4(), ...req.body }
  users.push(newUser)
  res.json({status: 'success', newUser}) 
}