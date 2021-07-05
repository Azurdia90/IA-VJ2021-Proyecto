const principal = require("ejecucion.js");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000

app.get('/minmax', function (req, res) {
    console.log("Inicio-Reversi")
    console.log(req.query)
    res.send(principal.principal(req.query.estado,req.query.turno));
});

app.listen(port, () => {
	console.log("Started in Port: ", port);
});