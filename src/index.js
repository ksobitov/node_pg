const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swaggerConfig') // Adjust the path based on your file location
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(userRoutes)
app.use(postRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
