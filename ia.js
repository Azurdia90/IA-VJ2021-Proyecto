var matrix_prob = [
    [120,-20,20,5,5,20,-20,120],
    [-20,-40,-5,-5,-5,-5,-40,-20],
    [20,-5,15,3,3,15,-5,20],
    [5,-5,3,3,3,3,-5,5],
    [5,-5,3,3,3,3,-5,-5],
    [20,-5,15,3,3,15,-5,20],
    [-20,-40,-5,-5,-5,-5,-40,-20],
    [120,-20,20,5,5,20,-20,120]
  ];

var matrix_reversis = [
        [0,1,2,3,4,5,6,7],
        [8,9,10,11,12,13,14,15],
        [16,17,18,19,20,21,22,23],
        [24,25,26,27,28,29,30,31],
        [32,33,34,35,36,37,38,39],
        [40,41,42,43,44,45,46,47],
        [48,49,50,51,52,53,54,55],
        [56,57,58,59,60,61,62,63]
       ];

const port = Process.env.PORT || 3000 ;

var http = require('http'); 
var express = require('express')
var app = express();

var server = http.createServer(function (req, res) {   

var url = req.url;
var da = url.split("/");
var x = da.slice(1);
var y = x.slice(1,2);
var z = x.slice(3,4);

//res.writeHead(200, { 'Content-Type': 'application/json' });
//res.write(JSON.stringify({ turno: y}));  
//res.write(JSON.stringify({ estado: z})); 

res.writeHead(200, {
'Content-Type': 'text/html',
'Content-Length': html.length,
'Expires': new Date().toUTCString()
});

if(y == "1"){
res.write("56"); 
}
else{
res.write("27"); 
}

res.end(html);  



});

server.listen(port);
console.log('Node.js web server at port 5000 is running..')