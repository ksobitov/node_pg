const Joi = require('joi')

// Define the user columns and their validation rules with custom error messages
const userColumns = [
  {
    name: 'username',
    rule: Joi.string().alphanum().min(3).max(30).required().messages({
      'string.alphanum': 'Username must only contain alphanumeric characters'
    })
  },
  { name: 'password', rule: Joi.string().min(6).required() },
  { name: 'email', rule: Joi.string().email().required() },
  { name: 'firstName', rule: Joi.string().min(1).max(30).required() },
  { name: 'lastName', rule: Joi.string().min(1).max(30).required() }
]

// Define the post columns and their validation rules with custom error messages
const postColumns = [
  { name: 'title', rule: Joi.string().min(1).max(255).required() },
  { name: 'content', rule: Joi.string().min(1).required() },
  { name: 'user_id', rule: Joi.string().required() } // Adjust validation as needed
]

// Create a dynamic Joi validation schema for user data
const userSchema = Joi.object(
  userColumns.reduce((acc, { name, rule }) => {
    acc[name] = rule
    return acc
  }, {})
)

// Create a dynamic Joi validation schema for post data
const postSchema = Joi.object(
  postColumns.reduce((acc, { name, rule }) => {
    acc[name] = rule
    return acc
  }, {})
)

// Validate user data using Joi
const validateUserData = userData => {
  validateData(userData, userSchema, 'user')
}

// Validate post data using Joi
const validatePostData = postData => {
  validateData(postData, postSchema, 'post')
}

// Generic function to validate data using a schema
const validateData = (data, schema, entityType) => {
  // Check if all required columns are present
  const requiredColumns = Object.keys(schema.describe().keys)
  const missingColumns = requiredColumns.filter(
    column =>
      schema.describe().keys[column].flags.presence === 'required' &&
      !(column in data)
  )

  if (missingColumns.length > 0) {
    const missingFields = missingColumns.join(', ')
    throw new Error(
      `Validation error (${entityType}): Missing required fields - ${missingFields}`
    )
  }

  // Perform the actual Joi validation
  const { error } = schema.validate(data, { abortEarly: false })
  if (error) {
    const validationError = new Error(`Validation error (${entityType})`)
    validationError.statusCode = 400
    validationError.details = error.details.map(detail => ({
      message: detail.message,
      path: detail.path
    }))
    throw validationError
  }
}

module.exports = {
  validateUserData,
  validatePostData
}
