let LivingCreature = require("./LivingCreature");
module.exports = class Grass extends LivingCreature{
    constructor(x, y) {
        super(x,y)
    }
    mul() {
        this.multiply++
        let emptyCell = this.chooseCell(0)
        let newCell = emptyCell[Math.floor(Math.random()  * emptyCell.length)]

        if (this.multiply >= 3 && newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 1
            let newGr = new Grass(newX, newY)
            grassArr.push(newGr)
            this.multiply = 0
        }
    }

}
