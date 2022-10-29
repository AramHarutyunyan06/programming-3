let LivingCreature = require("./LivingCreature")
module.exports = class Water extends LivingCreature{
    constructor(x, y) {
        super(x,y)
        this.energy = 30;

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character);
    }


    eat() {

        //Predator

        let emptyCelss3 = this.chooseCell(3)
        let newCell3 = emptyCelss3[Math.floor(Math.random() * emptyCelss3.length)]
        if (newCell3) {
            this.energy++
            let newX = newCell3[0]
            let newY = newCell3[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

        }

        //Fire
        
        let emptyCelss4 = this.chooseCell(4)
        let newCell4 = emptyCelss4[Math.floor(Math.random() * emptyCelss4.length)]
        if (newCell4) {
            this.energy++
            let newX = newCell4[0]
            let newY = newCell4[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in fireArr) {
                if (newX == fireArr[i].x && newY == fireArr[i].y) {
                    fireArr.splice(i, 1);
                    break;
                }
            }
        }

        //Ligghting

        let emptyCelss6 = this.chooseCell(6)
        let newCell6 = emptyCelss6[Math.floor(Math.random() * emptyCelss6.length)]
        if (newCell6) {
            this.energy++
            let newX = newCell6[0]
            let newY = newCell6[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in lightingArr) {
                if (newX == lightingArr[i].x && newY == lightingArr[i].y) {
                    lightingArr.splice(i, 1);
                    break;
                }
            }
        }

        
        //grassEater

        let emptyCelss2 = this.chooseCell(2)
        let newCell2 = emptyCelss2[Math.floor(Math.random() * emptyCelss2.length)]
        if (newCell2) {
            this.energy/=2
            let newX = newCell2[0]
            let newY = newCell2[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in waterArr) {
            if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                waterArr.splice(i, 1);
                break;
            }
        }
    }
}

