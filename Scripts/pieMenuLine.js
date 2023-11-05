let circle = null;
let endCircle = null;
let line = null;

function createCircleElement(event, isEndCircle = false) {
    const circleElem = document.createElement("div");
    circleElem.style = "width: 10px; height: 10px; background: rgba(130, 130, 130, 0.9); position: absolute; border-radius: 50%; z-index: 3;";
    circleElem.style.left = (event.clientX - 5) + "px";
    circleElem.style.top = (event.clientY - 5) + "px";
    document.body.appendChild(circleElem);
    return circleElem;
}

function updateEndCirclePosition(event) {
    if (!endCircle) return;
    endCircle.style.left = (event.clientX - 5) + "px";
    endCircle.style.top = (event.clientY - 5) + "px";
}

function drawLine(event) {
    if (!circle || !endCircle || !line) {
        return;
    }

    let x1 = circle.offsetLeft + 5;
    let y1 = circle.offsetTop + 5;
    let x2 = event.clientX;
    let y2 = event.clientY;
    
    let length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI - 90;
    
    line.style.height = length + "px";
    line.style.left = x1 + "px";
    line.style.top = y1 + "px";
    line.style.transformOrigin = "top left";
    line.style.transform = `rotate(${angle}deg)`;

    updateEndCirclePosition(event);
}

function createLine(event) {
    line = document.createElement("div");
    line.style = "width: 5px; background: rgba(44, 44, 44, 0.9); position: absolute; z-index: 2;";
    line.style.left = (event.clientX - 2.5) + "px"; 
    line.style.top = (event.clientY - 2.5) + "px"; 
    document.body.appendChild(line);
    return line;
}

function renderInteractiveComponents(event) {
    if (!circle) circle = createCircleElement(event);
    if (!endCircle) endCircle = createCircleElement(event, true);
    if (!line) line = createLine(event);
    document.addEventListener("mousemove", drawLine);
}


