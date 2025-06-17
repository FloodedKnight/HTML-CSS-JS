function hexToRgb(hex) {

    hex = hex.replace(/^#/, '');
  
    if (hex.length === 3) {
      hex = hex.split('').map(ch => ch + ch).join('');
    }
  
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
  
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255; 
    const g = (bigint >> 8) & 255;  
    const b = bigint & 255;         
  
    return { r, g, b };
  }


const ctx = document.getElementById('chart').getContext('2d');

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Line Plot',
            data: [
                { x: 0, y: 10 },
                { x: 1, y: 11 },
                { x: 2, y: 12 },
                { x: 3, y: 15 },
                { x: 4, y: 14 },
                { x: 5, y: 18 },
                { x: 6, y: 17 },
                { x: 7, y: 20 },
                { x: 8, y: 22 },
                { x: 9, y: 25 },
                { x: 10, y: 24 }
            ],
            borderColor: 'black',
            fill: true,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            tension: 0.0,
            pointRadius: 8,
            pointBackgroundColor: 'black'
        }]
    },
    options: {
        aspectRatio: 1,
        layout: {
            padding: {
              left: 20,  // add space around axis titles and title
              right: 30,
              top: 20,
              bottom: 20
            }
          },        
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                      size: 24
                    },
                    color: 'black'
                  }
            },
            title: {
                display: true,
                text: 'Line Plot',
                font: {
                    size: 28,
                    family: 'Montserrat',
                    weight: 'bold'
                },
                padding: {
                    top: 20,
                    bottom: 10
                },
                color: '#000000'
            }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'X-axis',
              font: {
                size: 22,
                weight: 'bold',
                family: 'Montserrat',
                lineHeight: 2
              },
              color: '#000000'
            },
            ticks: {
              color: '#000000',      
              font: {
                size: 16,
                weight: 'normal',
                family: 'Montserrat',
                lineHeight: 2
              },
              stepSize: 1 // chart.options.scales.x.ticks.stepSize
            },
            grid: {
              display: true,
              color: 'rgba(60, 60, 60, 0.2)',
              lineWidth: 2,
              borderColor: '#000000'
            },
            type: 'linear',       // or 'logarithmic', 'category', 'time', etc.
            position: 'bottom',   // 'top', 'bottom', 'left', 'right'
            offset: false          // add offset to center labels between gridlines
          },
      
          y: {
            title: {
              display: true,
              text: 'Y-axis',
              font: {
                size: 22,
                weight: 'bold',
                family: 'Montserrat',
              },
              color: '#000000'
            },
            beginAtZero: true,    // forces the axis to start at zero
            ticks: {
              color: '#000000',
              font: {
                size: 16,
                family: 'Montserrat'
              },
              stepSize: 1
            },
            grid: {
                display: true,
                color: 'rgba(60, 60, 60, 0.2)',
                lineWidth: 2,
                borderColor: '#000'
            },
            type: 'linear',
            position: 'left'
          }
        }
      }
});

function changeCol(option){
    if(option === "bg"){
        const col1 = document.getElementById('backgroundCol1').value;
        const col2 = document.getElementById('backgroundCol2').value;
        const chart = document.getElementById('chart');
        chart.style.background = `linear-gradient(135deg, ${col1}, ${col2})`
    } else if (option === "line"){
        const lineCol = document.getElementById('lineCol').value;
        chart.data.datasets[0].borderColor = `${lineCol}`;
        chart.data.datasets[0].pointBorderColor = `${lineCol}`;
        chart.data.datasets[0].pointBackgroundColor = `${lineCol}`;
        let { r, g, b } = hexToRgb(lineCol);
        chart.data.datasets[0].backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
        chart.update()
    } else if (option === "grid"){
        const gridCol = document.getElementById('gridCol').value;
        let { r, g, b } = hexToRgb(gridCol);
        chart.options.scales.x.grid.color = `rgba(${r}, ${g}, ${b}, 0.2)`;
        chart.options.scales.y.grid.color = `rgba(${r}, ${g}, ${b}, 0.2)`;
        chart.update()
    } else if (option === "font"){
        const fontCol = document.getElementById('fontCol').value;
        let { r, g, b } = hexToRgb(fontCol);
        chart.options.plugins.title.color = `rgb(${r}, ${g}, ${b})`;
        chart.options.scales.x.title.color = `rgb(${r}, ${g}, ${b})`;
        chart.options.scales.x.ticks.color = `rgb(${r}, ${g}, ${b})`;
        chart.options.scales.y.title.color = `rgb(${r}, ${g}, ${b})`;
        chart.options.scales.y.ticks.color = `rgb(${r}, ${g}, ${b})`;
        chart.update()
    } 

}

function changeLabels(){
    const AxisX = document.getElementById('AxisX').value || "X-Axis";
    const AxisY = document.getElementById('AxisY').value || "Y-Axis";
    const title = document.getElementById('title').value || "Line Plot";
    chart.options.scales.x.title.text = AxisX;
    chart.options.scales.y.title.text = AxisY;
    chart.options.plugins.title.text = title;
    chart.update()
}

function updateCoordinates(){
  const coordsCSV = document.getElementById('coordinates').value.trim().split("\n");
  let coords = []
  for (let i = 0; i < coordsCSV.length; i++) {
    // coordsCSV[i] is "x, y"
    // then splitting that is ["x", " y"]
     // converting to float then
    coords.push({ x : parseFloat((coordsCSV[i].split(","))[0]), y: parseFloat((coordsCSV[i].split(","))[1]) });
  }
  chart.data.datasets[0].data = coords;
  chart.update()
}

function changeScale(){
  const scaleX = parseFloat(document.getElementById('scaleX').value) || 1;
  const scaleY = parseFloat(document.getElementById('scaleY').value) || 1;
  chart.options.scales.x.ticks.stepSize = scaleX;
  chart.options.scales.y.ticks.stepSize = scaleY;
  chart.update()
}








function exportChart() {
    const canvas = document.getElementById('chart');
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const ctx = exportCanvas.getContext('2d');

    // Get the gradient colors from the inputs
    const col1 = document.getElementById('backgroundCol1').value || '#ffffff';
    const col2 = document.getElementById('backgroundCol2').value || '#ffffff';

    // Create and apply matching gradient
    const gradient = ctx.createLinearGradient(0, 0, exportCanvas.width, exportCanvas.height);
    gradient.addColorStop(0, col1);
    gradient.addColorStop(1, col2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // Draw the chart canvas onto the export canvas
    ctx.drawImage(canvas, 0, 0);

    // Create download link
    const link = document.createElement('a');
    link.download = (chart.options.plugins.title.text || 'chart') + '.png';
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
}

function editSmoothness(num){
  chart.data.datasets[0].tension = num;
  chart.update()
}

const slider = document.getElementById('smoothness');
const smoothDisp = document.getElementById('smoothDisplay')
slider.addEventListener('input', () => {
  editSmoothness(parseFloat(slider.value));
  smoothDisp.innerText = "Smoothness: " + slider.value;
});
