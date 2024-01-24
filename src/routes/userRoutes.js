const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Successful response with a list of users.
 */
router.get('/users', userController.getAllUsers)

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the user data.
 *       404:
 *         description: User not found.
 */
router.get('/users/:id', userController.getUserById)

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the user creation request body
 *               // For example, username, password, email, firstName, lastName
 *             example:
 *               username: "john_doe"
 *               password: "secure_password"
 *               email: "john.doe@example.com"
 *               firstName: "John"
 *               lastName: "Doe"
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Bad request. Check the request body for errors.
 */
router.post('/users', userController.createUser)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update a user with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the user update request body
 *               // For example, username, password, email, firstName, lastName
 *             example:
 *               username: "updated_username"
 *               firstName: "Updated"
 *               lastName: "User"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Bad request. Check the request body for errors.
 *       404:
 *         description: User not found.
 */
router.put('/users/:id', userController.updateUser)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 */
router.delete('/users/:id', userController.deleteUser)

module.exports = router
