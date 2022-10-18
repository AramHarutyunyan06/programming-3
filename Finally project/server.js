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


grassArr = [];
grassEaterArr = [];
predatorArr = [];
fireArr = [];
waterArr = [];