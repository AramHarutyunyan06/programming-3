function generateMatrix(matrixLeng, gr, grEat, pred,fire,water) {
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

let matrix = generateMatrix(35,35,25,32,35,40)
var side = 30;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let fireArr = [];
let waterArr = [];

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Fire(x,y)
                fireArr.push(gr)
            } 
        }
    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            } else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow");
            } else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("orange");
            } else if (matrix[y][x] == 5) {
                fill("lightblue");
            }
            rect(x * side, y * side, side, side);
        }
    }
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
}