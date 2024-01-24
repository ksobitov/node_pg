const pool = require('../config/db')
const { validatePostData } = require('../utils/validationUtils')

const getAllPosts = async () => {
  const result = await pool.query('SELECT * FROM posts')
  return result.rows
}

const getPostsByUserId = async userId => {
  const result = await pool.query('SELECT * FROM posts WHERE user_id = $1', [
    userId
  ])
  return result.rows
}

const createPost = async postData => {
  try {
    validatePostData(postData)

    // Your code to create a new post in the database
    const result = await pool.query(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
      [postData.title, postData.content, postData.user_id]
    )

    if (result.rows.length === 0) {
      throw new Error('Error creating post: Database returned an empty result')
    }

    return result.rows[0]
  } catch (error) {
    console.error(error)
    throw new Error(`Error creating post: ${error.message}`)
  }
}

const updatePost = async (postId, post) => {
  const { title, content, user_id } = post
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, user_id = $3 WHERE post_id = $4 RETURNING *',
    [title, content, user_id, postId]
  )
  return result.rows[0]
}

const deletePost = async postId => {
  const result = await pool.query(
    'DELETE FROM posts WHERE post_id = $1 RETURNING *',
    [postId]
  )
  return result.rows[0]
}

module.exports = {
  getAllPosts,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost
}
