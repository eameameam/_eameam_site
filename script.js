document.addEventListener("DOMContentLoaded", function() {
  const contactBtn = document.getElementById("contactBtn");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");
  const content = document.getElementById("content");
  const centerText = document.getElementById("centerText");
  const overlay = document.getElementById("overlay");

  let circle = null;
  let line = null;

  function fadeOut(el){
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  function fadeIn(el, display){
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

  contactBtn.addEventListener("click", function() {
    popup.classList.remove("hidden");
    overlay.classList.remove("hidden");
    content.classList.add("blur");
  });

  closeBtn.addEventListener("click", function() {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
    content.classList.remove("blur");
  });

  overlay.addEventListener("click", function() {
    popup.classList.add("hidden");
    overlay.classList.add("hidden");
    content.classList.remove("blur");
  });

  document.addEventListener("mousedown", function(event) {
    event.preventDefault();
    fadeOut(centerText);

    circle = document.createElement("div");
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.background = "white";
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.left = (event.clientX - 5) + "px";
    circle.style.top = (event.clientY - 5) + "px";

    line = document.createElement("div");
    line.style.width = "5px";
    line.style.background = "white";
    line.style.position = "absolute";
    line.style.left = (event.clientX) + "px";
    line.style.top = (event.clientY) + "px";

    document.body.appendChild(circle);
    document.body.appendChild(line);

    document.addEventListener("mousemove", drawLine);
  });

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
  


  document.addEventListener("mouseup", function() {
    fadeIn(centerText);

    if (circle) {
      document.body.removeChild(circle);
      circle = null;
    }
    
    if (line) {
      document.body.removeChild(line);
      document.removeEventListener("mousemove", drawLine);
      line = null;
    }
  });
});
