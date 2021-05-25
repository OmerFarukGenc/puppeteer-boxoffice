const express = require("express")

const app = express()

const mainRoute = require("./routes/index")

app.set("views","./views")
app.set("view engine","pug")

app.use(mainRoute)


app.listen(3000)
console.log("Server connected on port: " + 3000)