const express = require("express");
const morgan = require("morgan");
const db = require("./db.js")
const bodyParser = require('body-parser')

const Poi = require('./poi.js').Poi

const app = express()
const port = 3000

app.use("/", express.static('public'))
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/api/v1/pois", function (req, res) {
    let pois = db.getPoi()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(pois)
})

app.get("/api/v1/pois/:id", function (req, res) {
    let pois = db.getPoi(req.params.id)
    
    if(pois) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(pois)
    } else {
        res.status(404).send({ error: "Id:tä' ei ole"})
    }

})

app.post("/api/v1/pois", function (req, res) {
    
    try {
        let poi = new Poi(req.body.name, req.body.description, req.body.city, req.body.coordinates)
        let pois = db.setPoi(undefined, poi)
        res.setHeader('Content-Type', 'application/json');
        res.status(201).send(pois)
    } catch (e) {
        res.status(400).send({ error: "POI-tiedot virheelliset"})
    }
})

app.put("/api/v1/pois/:id", function (req, res) {
    
    try {
        
        let poiExists = db.getPoi(req.params.id)
        let statusCode = poiExists ? 200 : 201
        
        let poi = new Poi(req.body.name, req.body.description, req.body.city, req.body.coordinates)
        let pois = db.setPoi(req.params.id, poi)
        res.setHeader('Content-Type', 'application/json');
        res.status(statusCode).send(pois)
    } catch (e) {
        res.status(400).send({ error: "POI-tiedot virheelliset"})
    }
})

app.delete("/api/v1/pois/:id", function (req, res) {
    let poi = db.getPoi(req.params.id)
    
    res.setHeader('Content-Type', 'application/json');
    if(poi) {
        db.deletePoi(req.params.id)
        res.status(204).send({ message: "Poistettu"})
    } else {
        res.status(404).send({ error: "Id:tä' ei ole"})
    }
})

app.listen(port, () => 
console.log(`Express app listening on port ${port}!`))
