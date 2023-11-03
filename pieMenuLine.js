let circle = null;
let endCircle = null;
let line = null;
let popups = [];


function createCircle(event) {
    circle = document.createElement("div");
    circle.style = "width: 10px; height: 10px; background: rgba(130, 130, 130, 0.9); position: absolute; border-radius: 50%; z-index: 3;";
    circle.style.left = (event.clientX - 5) + "px";
    circle.style.top = (event.clientY - 5) + "px";
    document.body.appendChild(circle);
    return circle;
}

function createEndCircle(event) {
    endCircle = document.createElement("div");
    endCircle.style = "width: 10px; height: 10px; background: rgba(130, 130, 130, 0.9); position: absolute; border-radius: 50%; z-index: 3;";
    endCircle.style.left = (event.clientX - 5) + "px";
    endCircle.style.top = (event.clientY - 5) + "px";
    document.body.appendChild(endCircle);
    return endCircle;
}

function updateEndCirclePosition(event) {
    if (!endCircle) return;
    endCircle.style.left = (event.clientX - 5) + "px";
    endCircle.style.top = (event.clientY - 5) + "px";
}

function drawLine(event) {
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
    
    popups.forEach((popup) => {
        if (popup.dataset.name === '_header') return; 

        let popupRect = popup.getBoundingClientRect();
        let popupCenterX = (popupRect.left + popupRect.right) / 2;
        let popupCenterY = (popupRect.top + popupRect.bottom) / 2;

        let distanceToPopup = Math.sqrt(Math.pow(popupCenterX - x2, 2) + Math.pow(popupCenterY - y2, 2));

        let maxDistance = 150; 
        let minScale = 1.0;  
        let maxScale = 0.8; 

        let scale = maxScale - (maxScale - minScale) * Math.min(distanceToPopup, maxDistance) / maxDistance;
        popup.style.transform = `scale(${scale})`;
    });
}

function createLine(event) {
    line = document.createElement("div");
    line.style = "width: 5px; background: rgba(44, 44, 44, 0.9); position: absolute; z-index: 2;";
    line.style.left = (event.clientX - 2.5) + "px"; 
    line.style.top = (event.clientY - 2.5) + "px"; 
    document.body.appendChild(line);
    return line;
}

