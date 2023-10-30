document.addEventListener("DOMContentLoaded", function() {
  const contactBtn = document.getElementById("contactBtn");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");
  const content = document.getElementById("content");
  const centerText = document.getElementById("centerText");
  const overlay = document.getElementById("overlay");
  
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
    fadeOut(centerText);

    let circle = document.createElement("div");
    circle.style.width = "5px";
    circle.style.height = "5px";
    circle.style.background = "white";
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.left = event.clientX + "px";
    circle.style.top = event.clientY + "px";

    document.body.appendChild(circle);
  });

  document.addEventListener("mouseup", function() {
    fadeIn(centerText);
  });
});
