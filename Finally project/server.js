var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require('fs');

app.use(express.static('.'));

app.get("/", function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, () => {
    console.log("server run");
});



//Function Generate




function generateMatrix(matrixLeng, gr, grEat, pred, fire, water) {
    let matrix = [];
    for (let i = 0; i < matrixLeng; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixLeng; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matrixLeng)
        let y = Math.floor(Math.random() * matrixLeng)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matrixLeng)
        let y = Math.floor(Math.random() * matrixLeng)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }

    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matrixLeng)
        let y = Math.floor(Math.random() * matrixLeng)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }

    for (let i = 0; i < fire; i++) {
        let x = Math.floor(Math.random() * matrixLeng)
        let y = Math.floor(Math.random() * matrixLeng)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }

    for (let i = 0; i < water; i++) {
        let x = Math.floor(Math.random() * matrixLeng)
        let y = Math.floor(Math.random() * matrixLeng)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    return matrix
}

matrix = generateMatrix(35, 35, 25, 32, 35, 40);






io.sockets.emit("send matrix", matrix)

//Array

grassArr = [];
grassEaterArr = [];
predatorArr = [];
fireArr = [];
waterArr = [];

//module

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Fire = require("./fire")
Water = require("./water")



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y)
                predatorArr.push(pred)
            } else if (matrix[y][x] == 4) {
                let fire = new Fire(x, y)
                fireArr.push(fire)
            }
        }
    }
    io.sockets.emit("send matrix", matrix)
}


function game(){
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }
    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat()
    }
    for (let i = 0; i < fireArr.length; i++) {
        fireArr[i].eat()
    }
    for (let i = 0; i < waterArr.length; i++) {
        waterArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix)
}

setInterval(game,200);


io.on('connection', () => {
    createObject(matrix)
 })


 var statistics = {};

 
 
