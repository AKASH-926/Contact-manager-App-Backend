const express = require("express")
const app = express()
const contactRouter = require("./routes/contactsRoute")
app.use("/contacts",contactRouter)




module.exports = app
