var gridSize = 16;

const sizeDisplay = document.getElementById("sizeDisplay");
sizeDisplay.innerHTML = "Grid Size: " + gridSize;

const colorInput = document.getElementById("colorInput");
var boxColor = colorInput.value;

const sizeSlider = document.getElementById("sizeSlider");

const resetButton = document.getElementById("resetButton");
resetButton.onclick = function(){
    deleteGrid();
    createGrid(gridSize, rainbow);
}

// Color controls ---------------------------------------------
const colorButton = document.getElementById("colorButton");
var color = true;
colorButton.addEventListener("click", function() {
    if(!color){
        color = true;

        rainbow = false;
        eraser = false;
        updateColorControls()
    }
})

const rainbowButton = document.getElementById("rainbowButton");
var rainbow = false;
rainbowButton.addEventListener("click", function() {
    if(!rainbow){
        rainbow = true;

        color = false;
        eraser = false;
        updateColorControls()
    }
})

const eraserButton = document.getElementById("eraserButton");
var eraser = false;
eraserButton.addEventListener("click", function() {    
    if(!eraser){
        eraser = true;

        color = false;
        rainbow = false;
        updateColorControls()
    }
})


function updateColorControls(){
    if(color){
        colorButton.style.backgroundColor = "red"
    }
    else{
        colorButton.style.backgroundColor = "white"
    }

    if(rainbow){
        rainbowButton.style.backgroundColor = "red"
    }
    else{
        rainbowButton.style.backgroundColor = "white"
    }

    if(eraser){
        eraserButton.style.backgroundColor = "red"
    }
    else{
        eraserButton.style.backgroundColor = "white"
    }
}
// ------------------------------------------------------------

// Darken -----------------------------------------------------
const darkenButton = document.getElementById("darkenButton");
var darken = false;
darkenButton.addEventListener("click", function() {    
    if(!darken){
        darken = true;
        darkenButton.style.backgroundColor = "red"
    }
    else{
        darken = false;
        darkenButton.style.backgroundColor = "white"    
    }
})

function lowerOpacity(box){  
    box.style.opacity = window.getComputedStyle(box).opacity - 0.1;
}
// ------------------------------------------------------------

// Grid -------------------------------------------------------
function createGrid(gridSize){
    console.log(rainbow)
    const gridContainer = document.getElementById("gridContainer");
    const containerWidth = gridContainer.clientHeight - 50;

    for(let i = 0; i < gridSize; i++){
        const row = document.createElement("div");
        row.style.display = "flex";
        for(let i = 0; i < gridSize; i++){
            const box = document.createElement("div");
            box.style.width = (containerWidth / gridSize) + "px";
            box.style.height = (containerWidth / gridSize) + "px";
            box.className = "gridBox";

            box.addEventListener("mouseenter", () => {
                box.style.backgroundColor = getColor();
                if(darken && !eraser) {
                    lowerOpacity(box);
                }
                else{
                    box.style.opacity = 1.0
                    console.log("HIT");
                }                
            });
                        
            row.append(box);
        }
        gridContainer.append(row);
    }
}

function deleteGrid(){
    var boxes = document.getElementsByClassName('gridBox');

    while(boxes[0]) {
        boxes[0].parentNode.removeChild(boxes[0]);
    }
}

sizeSlider.oninput = function(){
    gridSize = this.value;
    sizeDisplay.innerHTML = "Grid Size: " + this.value;
    deleteGrid();
    createGrid(gridSize, rainbow);
}
// ------------------------------------------------------------

function getColor() {
    if(rainbow){
        const letters = '0123456789ABCDEF';
        boxColor = '#';
        for (let i = 0; i < 6; i++) {
            boxColor += letters[Math.floor(Math.random() * 16)];
        }
    }
    else if(color){
        boxColor = colorInput.value;
    }
    else{
        boxColor = "white";
    }
    return boxColor;
}

createGrid(gridSize);
updateColorControls();