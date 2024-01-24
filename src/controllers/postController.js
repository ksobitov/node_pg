const postModel = require('../models/postModel')
const { validatePostData } = require('../utils/validationUtils')

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts()
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getPostsByUserId = async (req, res) => {
  const userId = req.params.userId

  try {
    const posts = await postModel.getPostsByUserId(userId)
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const createPost = async (req, res) => {
  try {
    // Extract post data from the request body
    const postData = req.body

    // Use the validation function from the model
    validatePostData(postData)

    // Call createPost function from the model
    const createdPost = await postModel.createPost(postData, req.user_id)

    // Respond with the created post
    res
      .status(201)
      .json({ message: 'Post created successfully', post: createdPost })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

const updatePost = async (req, res) => {
  const postId = req.params.postId

  try {
    const post = await postModel.updatePost(postId, req.body)
    if (!post) {
      res.status(404).json({ status: 'error', error: 'Post not found' })
    } else {
      res
        .status(200)
        .json({ status: 'success', message: 'Post updated successfully', post })
    }
  } catch (error) {
    if (error.statusCode === 400) {
      res.status(400).json({
        status: 'error',
        error: 'Validation Error',
        details: error.details
      })
    } else {
      console.error(error)
      res.status(500).json({ status: 'error', error: 'Internal Server Error' })
    }
  }
}

const deletePost = async (req, res) => {
  const postId = req.params.id

  try {
    const deletedPost = await postModel.deletePost(postId)

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllPosts,
  getPostsByUserId,
  createPost,
  updatePost,
  deletePost
}
