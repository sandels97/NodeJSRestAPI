const express = require("express");
const tokens = require('../tokens.js');
const router = express.Router();

const authenticate = (req, res, next) => {
    try {
        let aut = req.headers.authorization
        let parts = aut.split(" ");
        if(tokens.verify(parts[1])){
            next()
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(401).send({ error: "Tunnistus ei onnistunut"}); 
        }
    } catch (e) {
        console.log(e);
        res.setHeader('Content-Type', 'application/json');
        res.status(401).send({ error: "Error: Tunnistus ei onnistunut"});
    }
}

router.post("*/", (req, res) => {
    
    let username = req.body.username
    let password = req.body.password
    
    res.setHeader('Content-Type', 'application/json');
    
    if(username == "mark" && password == "giraffe") {
        let token = tokens.create(username);
        res.status(200).send({"token": token});
    } else {
        res.status(400).send({ error: "Tunnistus ei onnistunut"});
    }
})

module.exports = {
    router,
    authenticate
}