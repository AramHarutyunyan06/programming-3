var socket = io();
let myChart;

var weather = "winter"
var side = 30;
function setup() {
    createCanvas(25 * side, 25 * side);
    const data ={
        labels:[
            "Grass",
            "Grass Eater",
            "Predator",
            "Fire",
            "Water",
            "Lighting"
        ],
        datasets:[{
            label:"Chart of my game",
            data:[25, 55, 65, 32, 20, 40, 35],
            backgroundColor: [
                "Green",
                "Yellow",
                "Red",
                "Orange",
                "Lightblue",
                "Blue"
            ],
            hoverOffset:4
        }]
    };
    const config = {
        type: "pie",
        data: data,
        options: {
            plugins: {
                legend: {
                    display:true,
                    labels: {
                        color: "#fff"
                    }
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById("myChart"),
        config
    );

}

socket.on("chWeather",function(dataChangeWeather){
    weather = dataChangeWeather
})
    
socket.on("send statistics",function(datas){
    myChart.data.datasets[0].data = [
        datas.grass,
        datas.grassEater,
        datas.predator,
        datas.fire,
        datas.water,
        datas.lighting];
        myChart.update();
})

function nkarel(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weather == "spring"){
                    fill("green");
                } else if(weather == "summer"){
                    fill("pink");
                } else if(weather == "autumn"){
                    fill("rgb(255,50,0)");
                } else if(weather == "winter"){
                    fill("white");
                }
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
            } else if (matrix[y][x] == 6) {
                fill("blue");
            }
            rect(x * side, y * side, side, side);
        }
    }
    
}

socket.on("send matrix",nkarel)




function ChWeathers(){
    socket.emit("Change")
}
function kill(){
    socket.emit("kill")
}
function GrassP(){
    socket.emit("plusGrass1")
}
function GrassEaterP(){
    socket.emit("plusGrassEater1")
}
function PredatorP(){
    socket.emit("plusPredator1")
}
function FireP(){
    socket.emit("plusFire1")
}
function WaterP(){
    socket.emit("plusWater1")
}
function LightingP(){
    socket.emit("plusLighting1")
}