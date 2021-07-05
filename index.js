var http = require('http'); // 1 - Import Node.js core module
const minimax = require("./ejecucion")
const express = require('express')
const app = express()

app.get('/reversi201020331', (req, res) => {
   
    var indice = minimax.inicio(req.query.estado, req.query.turno);
    var r = minimax.indiceColumna(indice);
    console.log("vamos a jugar en la posición: "+r);
    res.send(String(r));
    
})

app.listen(process.env.PORT || 3000); 
