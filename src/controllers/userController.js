const userModel = require('../models/userModel')
const { validateUserData } = require('../utils/validationUtils')

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers()
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function getUserById(req, res) {
  const userId = req.params.id

  try {
    const user = await userModel.getUserById(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req.body

    // Use the validation function from the model
    validateUserData(userData)

    // Call createUser function from the model
    const createdUser = await userModel.createUser(userData)

    console.log('User created successfully:', createdUser)

    // Respond with the created user
    res
      .status(201)
      .json({ message: 'User created successfully', user: createdUser })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

async function updateUser(req, res) {
  const userId = req.params.id

  try {
    const user = await userModel.updateUser(userId, req.body)
    if (!user) {
      res.status(404).json({ status: 'error', error: 'User not found' })
    } else {
      res
        .status(200)
        .json({ status: 'success', message: 'User updated successfully', user })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

async function deleteUser(req, res) {
  const userId = req.params.id

  try {
    const deletedUser = await userModel.deleteUser(userId)

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
