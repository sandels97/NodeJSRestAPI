const express = require("express");
const morgan = require("morgan");

const app = express()
const port = 3000

app.use("/", express.static('public'))
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/weather", function (req, res) {	

})

app.listen(port, () => 
console.log(`Express app listening on port ${port}!`))
