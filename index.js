const express = require("express");
const morgan = require("morgan");
const db = require("./db.js")

const app = express()
const port = 3000

app.use("/", express.static('public'))
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get("/pois", function (req, res) {
    let pois = db.getPoi()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(pois)
})

app.get("/pois/:id", function (req, res) {
    let pois = db.getPoi(req.params.id)
    
    if(pois) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(pois)
    } else {
        res.status(404).send({ error: "Id:tä' ei ole"})
    }

})

app.listen(port, () => 
console.log(`Express app listening on port ${port}!`))
