function setUp() {
    for(let j=0; j<NUM_CELLS; j++) {
        drawNewShape(j*CELL_WIDTH, j, imgArray);
        clickedArray[j] = 0;
    }
    let imageToSelect = 1+Math.floor(Math.random()*3)
    let valid = false;
    while (!valid) {
        for(let n=0; n<NUM_CELLS; n++) {
            if (imgArray[n] == imageToSelect) {
                valid = true;
                break
            }
        }
        if (!valid) {
            imageToSelect = 1+Math.floor(Math.random()*3)
        }
    }
    console.log(imageToSelect)
    switch (imageToSelect) {
        case 1:
            document.getElementById("animal-to-guess").innerHTML = "Select all images of a snake";
            break
        case 2:
            document.getElementById("animal-to-guess").innerHTML = "Select all images of a parrot";
            break
        case 3:
            document.getElementById("animal-to-guess").innerHTML = "Select all images of a frog";
            break
    }
    return imageToSelect;
}

function drawNewShape(x, count) {
    imgRef = 1+Math.floor(Math.random()*3);

    switch (imgRef) {
        case 1:
            imgArray[count] = 1
            snake(x);
            break
        case 2:
            imgArray[count] = 2
            parrot(x);
            break
        case 3:
            imgArray[count] = 3
            frog(x);
            break
    }
    return imgArray
}


function snake(x) {
    drawEllipse("rgb(0,255,0)", x+50, 95, 30, 20, Math.PI, 0, 1.2*Math.PI);
    drawEllipse("rgb(0,255,0)", x+70, 93, 25, 17.5, 0, 0, Math.PI);
    drawEllipse("rgb(0,255,0)", x+95, 89, 23, 17.5, 0, 0, Math.PI);
    drawEllipse("rgb(0,255,0)", x+120, 93, 25, 17.5, 0, 0, Math.PI);
    drawEllipse("rgb(0,255,0)", x+129, 107, 25, 17.5, Math.PI, 0, Math.PI);
    drawEllipse("rgb(0,255,0)", x+160, 90, 25, 17.5, 0, 0.6, Math.PI);
    drawEllipse("rgb(0,0,0)", x+50, 85, 6, 6, 0, 0, 2*Math.PI);
}

function parrot(x) {
    drawEllipse("rgb(0,255,0)", x+100, 100, 30, 50, 0, 0, 2*Math.PI);
    drawTriangle("rgb(255,200,0)", x+50, 80, x+80, 100, x+80, 60);
    drawEllipse("rgb(0,0,0)", x+95, 70, 8, 8, 0, 0, 2*Math.PI);
    drawRect("rgb(1,50,32)", x+90, 95, 45, 15);
    drawEllipse("rgb(255,200,0)", x+90, 150, 15, 7, 0, 2*Math.PI-0.6, Math.PI);
    drawEllipse("rgb(255,200,0)", x+120, 140, 15, 15, 0, 0.6, Math.PI);
}

function frog(x) {
    drawEllipse("rgb(60,180,56)", x+100, 100, 55, 55, 0, 0, 2*Math.PI);
    drawEllipse("rgb(100,255,60)", x+100, 110, 15, 15, 0, 0, Math.PI);
    drawEllipse("rgb(255,190,0)", x+80, 48, 12, 12, 0, 0, 2*Math.PI);
    drawEllipse("rgb(255,190,0)", x+120, 48, 12, 12, 0, 0, 2*Math.PI);
    drawEllipse("rgb(0,0,0)", x+80, 48, 8, 8, 0, 0, 2*Math.PI);
    drawEllipse("rgb(0,0,0)", x+120, 48, 8, 8, 0, 0, 2*Math.PI);
}

function drawEllipse(aCol, x, y, radiusX, radiusY, rotation, startAngle, endAngle) {
    context.fillStyle = aCol;
    context.beginPath();
    context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
    context.fill();
}

function drawRect(aCol, x, y, width, height) {
    context.fillStyle = aCol
    context.beginPath();
    context.rect(x, y, width, height);
    context.fill();
}

function drawTriangle(aCol, x1, y1, x2, y2, x3, y3) {
    context.fillStyle = aCol;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.closePath();
    context.fill();
}

function getMouseXY(e) {
    return {x: e.offsetX, y: e.offsetY};
}

function whichCell(x, y) {
    if (x < 0) x = 0; // defensive programming
    if (y < 0) y = 0;
    if (x >= CANVAS_WIDTH) x = CANVAS_WIDTH - 1;
    if (y >= CANVAS_HEIGHT) y = CANVAS_HEIGHT - 1;
    let cell = Math.floor(x / CELL_WIDTH); // returns 0, 1 or 2
    return cell;
}
function tickTheCell(evt) {
    let pos = getMouseXY(evt);
    let str = "x, y: " + pos.x + ", " + pos.y;
    let cell = whichCell(pos.x, pos.y);
    str += "; cell i: " + cell;
    console.log(str);
    if (clickedArray[cell] == 1) {
        clickedArray[cell] = 0;
        removeTick(cell);
    }
    else {
        clickedArray[cell] = 1;
        drawTick("rgb(0,0,255)", (cell*200), 1, 3);
        
    }
}
    
function drawTick(aCol, x, scale, width) {
    context.strokeStyle = aCol;
    context.beginPath();
    context.moveTo(x+10*scale,16*scale);
    context.lineTo(x+16*scale,20*scale);
    context.lineTo(x+22*scale,12*scale);
    context.lineWidth = width;
    context.stroke();  
}

function removeTick(cell) {
    context.fillStyle = "rgb(255,255,255)";
    context.beginPath();
    context.rect(200*cell,0,50,50);
    context.closePath();
    context.fill();
}

function checkIfCorrect(imageToSelect) {
    for(let k=0; k<NUM_CELLS; k++) {
        if (clickedArray[k] == 1){
            if (imgArray[k] != imageToSelect) {
                return false
            }
        }
        else {
            if (imgArray[k] == imageToSelect) {
                return false
            }
        }
    }
    return true
}

function removeShapes() {
    for(let p=0; p<NUM_CELLS; p++) {
        drawRect("rgb(255,255,255)",p*200,0,200,200)
    }
}

function successCanvas() {
    drawRect("rgb(255,255,255",0,0,1000,200);
    drawTick("rgb(0,255,0)", 388, 7, 30);
}

function beenSubmitted() {
    if (checkIfCorrect(imageToSelect)) {
        console.log("Thats right")
        verifyButton.removeEventListener("click", beenSubmitted);
        canvas.removeEventListener("click", tickTheCell);
        successCanvas();
        document.getElementById("animal-to-guess").innerHTML = "";
        document.getElementById("result").innerHTML = "SUCCESS";
        document.getElementById("button1").innerHTML = "Check complete";
    }
    else {
        console.log("Thats wrong")
        remainingAttempts -=1;
        if (remainingAttempts == 0) {
            console.log("You have lost")
        }
        else {
            removeShapes()
            imageToSelect = setUp()
        }
    }
}

let remainingAttempts = 2;
let canvas = document.getElementById("canvas1");
let context = canvas.getContext("2d");
let imgArray = new Array(5);
let clickedArray = new Array(5);
let done = false;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const NUM_CELLS = 5;
let CELL_WIDTH = canvas.width / NUM_CELLS;
let CELL_HEIGHT = CELL_WIDTH;

context.strokeStyle = "rgb(200,200,200)";
context.lineWidth = "1";
context.beginPath();
for(let i=1; i<=NUM_CELLS; i++) {
    context.moveTo(i * CELL_WIDTH, 0);
    context.lineTo(i * CELL_WIDTH, CELL_HEIGHT);
}
context.stroke();

let imageToSelect = setUp()


let verifyButton = document.getElementById("button1");
let reinitializeButton = document.getElementById("button2");


verifyButton.addEventListener("click", beenSubmitted);
canvas.addEventListener("click", tickTheCell);
reinitializeButton.addEventListener("click", function(){window.location.reload();});

/*document.write( `<br><b>${imgArray}</b>`)*/