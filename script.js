var gridSize = 16;

const sizeDisplay = document.getElementById("sizeDisplay");
sizeDisplay.innerHTML = gridSize;

const colorInput = document.getElementById("colorInput");
var boxColor = colorInput.value;

const sizeSlider = document.getElementById("sizeSlider");

const rainbowCheckbox = document.getElementById("rainbowCheckbox");
var rainbow = false;
rainbowCheckbox.addEventListener("change", function() {
    rainbow = this.checked;
    if(!rainbow){
        boxColor = colorInput.value;
    }
})

const resetButton = document.getElementById("resetButton");
resetButton.onclick = function(){
    deleteGrid();
    createGrid(gridSize, rainbow);
}

createGrid(gridSize, rainbow);


function createGrid(gridSize, rainbow){
    console.log(rainbow)
    const gridContainer = document.getElementById("gridContainer");
    const containerWidth = gridContainer.clientHeight;

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

function getColor() {
    if(rainbow){
        const letters = '0123456789ABCDEF';
        boxColor = '#';
        for (let i = 0; i < 6; i++) {
            boxColor += letters[Math.floor(Math.random() * 16)];
        }
    }    
    return boxColor;
}

sizeSlider.oninput = function(){
    gridSize = this.value;
    sizeDisplay.innerHTML = this.value;
    deleteGrid();
    createGrid(gridSize, rainbow);
}

colorInput.oninput = function(){
    boxColor = this.value;
}


