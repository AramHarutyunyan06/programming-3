class Water extends LivingCreature{
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
        let emptyCelss = this.chooseCell(3)
        let newCell = random(emptyCelss)
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 10) {
                this.mul()
            }
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
        }

        //Predator
        let emptyCelss = this.chooseCell(4)
        let newCell = random(emptyCelss)
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 10) {
                this.mul()
            }
            for (var i in fireArr) {
                if (newX == fireArr[i].x && newY == fireArr[i].y) {
                    fireArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move()
        }
        //grassEater

        let emptyCelss1 = this.chooseCell(2)
        let newCell1 = random(emptyCelss1)
        if (newCell1) {
            this.energy/=2
            let newX = newCell1[0]
            let newY = newCell1[1]
            matrix[newY][newX] = matrix[this.y][this.x]///////2
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            if (this.energy >= 10) {
                this.mul()
            }

        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in fireArr) {
            if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                fireArr.splice(i, 1);
                break;
            }
        }
    }
}

