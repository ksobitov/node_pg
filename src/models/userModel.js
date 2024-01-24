const pool = require('../config/db')
const { validateUserData } = require('../utils/validationUtils')

const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users')
  return result.rows
}

const getUserById = async userId => {
  const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [
    userId
  ])
  return result.rows[0]
}

const createUser = async userData => {
  try {
    validateUserData(userData)

    // Your code to create a new user in the database
    const result = await pool.query(
      'INSERT INTO users (username, password, email, firstName, lastName) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        userData.username,
        userData.password,
        userData.email,
        userData.firstName,
        userData.lastName
      ]
    )

    if (result.rows.length === 0) {
      throw new Error('Error creating user: Database returned an empty result')
    }

    return result.rows[0]
  } catch (error) {
    console.error(error)
    throw new Error(`Error creating user: ${error.message}`)
  }
}

const updateUser = async (userId, userDetails) => {
  const { username, email, password, firstName, lastName } = userDetails

  // Filter out undefined values to only include provided fields
  const updatedFields = { username, email, password, firstName, lastName }
  const filteredFields = Object.fromEntries(
    Object.entries(updatedFields).filter(([key, value]) => value !== undefined)
  )

  // Construct the SET clause dynamically based on provided fields
  const setClause = Object.keys(filteredFields)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ')

  const values = Object.values(filteredFields)
  values.push(userId) // Add userId for the WHERE clause

  const query = `UPDATE users SET ${setClause} WHERE user_id = $${values.length} RETURNING *`

  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteUser = async userId => {
  const result = await pool.query(
    'DELETE FROM users WHERE user_id = $1 RETURNING *',
    [userId]
  )
  return result.rows[0]
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
