const interactiveZone = {
    startX: window.innerWidth * 0.15,
    endX: window.innerWidth * 0.85,
    startY: window.innerHeight * 0.15,
    endY: window.innerHeight * 0.85
};

function isInInteractiveZone(x, y) {
    return x >= interactiveZone.startX && x <= interactiveZone.endX && y >= interactiveZone.startY && y <= interactiveZone.endY;
}
