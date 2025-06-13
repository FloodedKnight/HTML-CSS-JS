
// ~~~~~~~~~~~~~~~~OPTIONS~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~OPTIONS~~~~~~~~~~~~~~~~
const height = 15; // HEIGHT OF THE FLOOR. WARNING: IF YOU HAVE A HIGH NUMBER OF COLUMNS, MAKING THIS HIGHER WILL CAUSE LAG
const rows = 30; // ROWS AND COLUMNS
const cols = 100; // ROWS AND COLUMNS
const changeCol = true; // ENABLE TO TRUE IF YOU WANT CHANGING COLORS
const changeColSpeed = 120; // HOW FAST YOU WANT THE COLORS IN THE BACK GROUND TO CHANGE. ONLY IF changeCol is true
const saturation = 50 // SATURATION
const opacitySpeed = 1 // HOW FAST YOU WANT YOUR FLOOR TO FADE OUT.
// ~~~~~~~~~~~~~~~~OPTIONS~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~OPTIONS~~~~~~~~~~~~~~~~


// GENERATING SQUARES
const grid = document.getElementById('grid');
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const div = document.createElement('div');
    div.className = 'square';

    const rowRatio = (r + 1) / (rows * opacitySpeed);

    div.style.aspectRatio = `1 / 1`;
    div.style.opacity = `${rowRatio}`;
    div.style.width = `${height}vh`;

    grid.appendChild(div);
  }
}


// COLOR STUFF
let hue = 0;
let deg = 0;
function updateBackground() {
  hue = (hue + 1) % 360;
  deg = deg + 4;
  const color1 = `hsl(${(hue + 60) % 360}, ${saturation}%, 50%)`;
  const color2 = `hsl(${(hue + 120) % 360}, ${saturation}%, 50%)`;
  let custBackground = document.getElementById('custBackground');
  custBackground.style.background = `linear-gradient(${deg}deg, ${color1}, ${color2})`;
}
if (changeCol){
  setInterval(updateBackground,changeColSpeed);
}

grid.style.gridTemplateColumns = `repeat(${cols}, auto)`;