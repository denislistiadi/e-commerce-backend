const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
const authJwt = require("./helpers/jwt")
const errorHandler = require("./helpers/errorHandler")

require("dotenv").config()
const api = process.env.API_URL

app.use(cors())
app.options("*", cors())

// ? Middleware
app.use(express.json())
app.use(morgan("tiny"))
app.use(authJwt())
app.use(errorHandler)

// ! Routes
const usersRouter = require("./routers/users")
const categoriesRouter = require("./routers/categories")
const productsRouter = require("./routers/products")
const ordersRouter = require("./routers/orders")

app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)

mongoose
  .connect(process.env.CONNECT_DB)
  .then(() => {
    console.log("Connected to Database...")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
