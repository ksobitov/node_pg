const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts.
 *     responses:
 *       200:
 *         description: Successful response with a list of posts.
 */
router.get('/posts', postController.getAllPosts)

/**
 * @swagger
 * /posts/user/{userId}:
 *   get:
 *     summary: Get posts by user ID
 *     description: Retrieve a list of posts for a specific user by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with a list of posts for the user.
 *       404:
 *         description: User not found or no posts for the user.
 */
router.get('/posts/user/:userId', postController.getPostsByUserId)

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the post creation request body
 *               // For example, title, content, user_id
 *             example:
 *               title: "New Post"
 *               content: "This is a new post."
 *               user_id: "user_id_here"
 *     responses:
 *       201:
 *         description: Post created successfully.
 *       400:
 *         description: Bad request. Check the request body for errors.
 */
router.post('/posts', postController.createPost)

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     description: Update a post with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the post update request body
 *               // For example, title, content
 *             example:
 *               title: "Updated Post"
 *               content: "This post has been updated."
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       400:
 *         description: Bad request. Check the request body for errors.
 *       404:
 *         description: Post not found.
 */
router.put('/posts/:id', postController.updatePost)

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Delete a post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully.
 *       404:
 *         description: Post not found.
 */
router.delete('/posts/:id', postController.deletePost)

module.exports = router
