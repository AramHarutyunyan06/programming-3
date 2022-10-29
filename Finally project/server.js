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




function generateMatrix(matrixLeng, gr, grEat, pred, fire, water,light) {
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

    for (let i = 0; i < light; i++) {
        let x = Math.floor(Math.random() * matrixLeng)
        let y = Math.floor(Math.random() * matrixLeng)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
        }
    }
    return matrix
}

matrix = generateMatrix(40, 55, 65, 32, 20, 40, 35);


io.sockets.emit("send matrix", matrix)

//Array

grassArr = [];
grassEaterArr = [];
predatorArr = [];
fireArr = [];
waterArr = [];
lightingArr = [];


//module

Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Fire = require("./fire")
Water = require("./water")
Lighting = require("./lighting")





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
            } else if (matrix[y][x] == 5) {
                let water = new Water(x, y)
                waterArr.push(water)
            } else if (matrix[y][x] == 6) {
                let lighting = new Lighting(x, y)
                lightingArr.push(lighting)
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
    for (let i = 0; i < lightingArr.length; i++) {
        lightingArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix)
}

setInterval(game,200);
/////////////////////////////Weather////////////////////////////////

let weathers = ["spring","summer","autumn","winter"]
let i = weathers.length - 1

function chWeather(){
    var weath = weathers[i--];
    if(i < 0){
       i = 3
    }
    io.sockets.emit("chWeather",weath)
}
setInterval(chWeather,3000);



function ChangeWeather(){
    chWeather();
}

/////////////////////////////Weather End////////////////////////////
/////////////////////////////Buttons////////////////////////////////

////KILLALL
function killAll(){
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    fireArr = [];
    waterArr = [];
    lightingArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0
        }
    }
}

/////Grass++++

function plusGrass(){
    for(var i = 0;i < 10;i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if(matrix[y][x] == 0){
            matrix[y][x] = 1;
            var Gr = new Grass(x,y)
            grassArr.push(Gr)
        }
    }
    io.sockets.emit("send matrix", matrix)
}

/////GrassEater++++
function plusGrassEater(){
    for(var i = 0;i < 15;i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if(matrix[y][x] == 0 || matrix[y][x] == 1){
            matrix[y][x] = 2;
            let grEat = new GrassEater(x,y);
            grassEaterArr.push(grEat);
        }
    }
    io.sockets.emit("send matrix", matrix)
}

/////predator+++
function plusPredator(){
    for(var i = 0;i < 20;i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if(matrix[y][x] == 0 || matrix[y][x] == 2){
            matrix[y][x] = 3;
            let pred = new Predator(x,y);
            predatorArr.push(pred);
        }
    }
    io.sockets.emit("send matrix", matrix)
}

/////Fire+++++
function plusFire(){
    for(var i = 0;i < 5;i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if(matrix[y][x] == 0 || matrix[y][x] == 3){
            matrix[y][x] = 4;
            let fire = new Fire(x,y);
            fireArr.push(fire);
        }
    }
    io.sockets.emit("send matrix", matrix)
}



/////Lighting+++++
function plusLight(){
    for(var i = 0;i < 25;i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if(matrix[y][x] == 0 || matrix[y][x] == 1 || matrix[y][x] == 3){
            matrix[y][x] = 6;
            let lighting = new Lighting(x,y);
            lightingArr.push(lighting);
        }
    }
    io.sockets.emit("send matrix", matrix)
}

/////////////////////////////Buttons End////////////////////////////

io.on('connection', (socket) => {
    createObject(matrix);
    socket.on("Change", ChangeWeather);
    socket.on("kill", killAll);
    socket.on("plusGrass1", plusGrass);
    socket.on("plusGrassEater1", plusGrassEater);
    socket.on("plusPredator1", plusPredator);
    socket.on("plusFire1", plusFire);
    socket.on("plusLighting1", plusLight)
 })


 var statistics = {};

setInterval(() => {
 statistics.grass = grassArr.length
 statistics.grassEater = grassEaterArr.length
 statistics.predator = predatorArr.length
 statistics.fire = fireArr.length
 statistics.water = waterArr.length
 statistics.lighting = lightingArr.length


 fs.writeFile("statistic.json",JSON.stringify(statistics),function () {
     io.sockets.emit("send statistics", statistics)
 } )
},1000)