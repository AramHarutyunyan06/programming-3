const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Grass', 'GrassEater', 'Predator', 'Fire', 'Water'],
        datasets:[]
            label: 'Game',
            data: [grassArr.length,grassEaterArr.length,predatorArr.length,fireArr.length,waterArr.length],
            backgroundColor: [
                'Green',
                'Yellow',
                'Red',
                'Orange',
                'Lightblue',
            ],
            borderColor: [
                'Green',
                'Yellow',
                'Red',
                'Orange',
                'Lightblue',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

