document.addEventListener("DOMContentLoaded", function() {
  const elements = {
    contactBtn: document.getElementById("contactBtn"),
    popup: document.getElementById("popup"),
    closeBtn: document.getElementById("closeBtn"),
    content: document.getElementById("content"),
    centerText: document.getElementById("centerText"),
    overlay: document.getElementById("overlay")
  };

  let circle = null;
  let line = null;
  let popups = [];

  function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
      let val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }

  function handleOverlayClick() {
    elements.popup.classList.add("hidden");
    elements.overlay.classList.add("hidden");
    elements.content.classList.remove("blur");
  }

  elements.contactBtn.addEventListener("click", function() {
    elements.popup.classList.remove("hidden");
    elements.overlay.classList.remove("hidden");
    elements.content.classList.add("blur");
  });

  elements.closeBtn.addEventListener("click", handleOverlayClick);
  elements.overlay.addEventListener("click", handleOverlayClick);

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
  }

  const imageConfigs = [
    { name: '_anim', xOffset: 0, yOffset: -.6, scale: 1 }, 
    { name: '_rig', xOffset: 1, yOffset: 0, scale: 1 },   
    { name: '_unity', xOffset: -0.8, yOffset: 0.7, scale: 1 }, 
    { name: '_unreal', xOffset: 0.8, yOffset: 0.7, scale: 1 }, 
    { name: '_tools', xOffset: -1, yOffset: 0, scale: 1 } 
  ];
  

  let isPopupCreated = false; 

  document.addEventListener("mousedown", function(event) {
    event.preventDefault();

    if (event.clientX > 380 || event.clientY > 120) {
      if (elements.popup.classList.contains("hidden")) {
        isPopupCreated = true; 

        fadeOut(elements.centerText);

        circle = createCircle(event);
        line = createLine(event);
        document.addEventListener("mousemove", drawLine);

        popups = imageConfigs.map(config => createPopup(event, config));
        popups.forEach(popup => {
          document.body.appendChild(popup);
          fadeIn(popup);
        });
      }
    }
  });

  document.addEventListener("mouseup", function() {
    if (isPopupCreated) {
      fadeIn(elements.centerText);
    }

    cleanUp(circle, line, popups);
    document.removeEventListener("mousemove", drawLine);
    isPopupCreated = false; // Сбрасываем флаг в false
  });


  function createCircle(event) {
    const circle = document.createElement("div");
    circle.style = "width: 10px; height: 10px; background: white; position: absolute; border-radius: 50%;";
    circle.style.left = (event.clientX - 5) + "px";
    circle.style.top = (event.clientY - 5) + "px";
    document.body.appendChild(circle);
    return circle;
  }

  function createLine(event) {
    const line = document.createElement("div");
    line.style = "width: 5px; background: white; position: absolute;";
    line.style.left = event.clientX + "px";
    line.style.top = event.clientY + "px";
    document.body.appendChild(line);
    return line;
  }

  function createPopup(event, imageConfig) {
    const popup = document.createElement("div");
    popup.style = `width: 200px; height: 50px; background-image: url('Resources/${imageConfig.name}.png'); background-size: cover; position: absolute;`;
  
    const x = event.clientX + 160 * imageConfig.xOffset * imageConfig.scale - 100; 
    const y = event.clientY + 160 * imageConfig.yOffset * imageConfig.scale - 25; 
  
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
  
    return popup;
  }

  function cleanUp(circle, line, popups) {
    if (circle) document.body.removeChild(circle);
    if (line) document.body.removeChild(line);
    popups.forEach(popup => {
      fadeOut(popup);
      document.body.removeChild(popup);
    });
    popups = [];
  }
});
