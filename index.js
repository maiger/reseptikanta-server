const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const errorHandler = require("./helpers/error-handler")

const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/", require("./queries/queries.controller"))

// Global error handling
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})