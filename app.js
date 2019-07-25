const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const errorHandler = require("./helpers/error-handler")

const userRouter = require("./routes/user")
const recipeRouter = require("./routes/recipe")

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/api/user", userRouter)
app.use("/api/recipes", recipeRouter)

// Global error handling
app.use(errorHandler)

module.exports = app