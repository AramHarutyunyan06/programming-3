let LivingCreature = require("./LivingCreature")
module.exports = class Predator extends LivingCreature{
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

    mul() {
        let emptyCelss0 = this.chooseCell(0)
        let newCell = emptyCelss0[Math.floor(Math.random() * emptyCelss0.length)]
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            let newGr = new Predator(newX, newY)
            predatorArr.push(newGr)
            this.energy = 10
        }
    }

    move() {
        this.energy--
        let emptyCelss = this.chooseCell(0)
        let newCell = emptyCelss[Math.floor(Math.random() * emptyCelss.length)]
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {

        //GrassEater

        let emptyCelss2 = this.chooseCell(2)
        let newCell2 = emptyCelss2[Math.floor(Math.random() * emptyCelss2.length)]
        if (newCell2) {
            this.energy++
            let newX = newCell2[0]
            let newY = newCell2[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 20) {
                this.mul()
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }

        //Water

        let emptyCelss5 = this.chooseCell(5)
        let newCell5 = emptyCelss5[Math.floor(Math.random() * emptyCelss5.length)]
        if (newCell5) {
            this.energy *= 2
            let newX = newCell5[0]
            let newY = newCell5[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 20) {
                this.mul()
            }
            

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}

