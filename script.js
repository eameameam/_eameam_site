document.addEventListener("DOMContentLoaded", function () {
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
  let isFullScreenPopupVisible = false;
  let isPopupCreated = false;


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

  window.addEventListener("blur", function () {
    if (!elements.popup.classList.contains("hidden")) {
      elements.popup.classList.add("hidden");
      elements.overlay.classList.add("hidden");
      elements.content.classList.remove("blur");
    }

    if (isPopupCreated) {
      cleanUp(circle, line, popups);
      document.removeEventListener("mousemove", drawLine);
      isPopupCreated = false;
    }
  });


  function handleOverlayClick() {
    elements.popup.classList.add("hidden");
    elements.overlay.classList.add("hidden");
    elements.content.classList.remove("blur");
  }

  elements.contactBtn.addEventListener("click", function () {
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


  document.addEventListener("mousedown", function (event) {
    event.preventDefault();

    if (isFullScreenPopupVisible) return;

    if (event.clientX > 380 || event.clientY > 120) {
      if (elements.popup.classList.contains("hidden")) {
        isPopupCreated = true;

        fadeOut(elements.centerText);

        circle = createCircle(event);
        line = createLine(event);
        document.addEventListener("mousemove", drawLine);

        elements.content.classList.add("blur");

        popups = imageConfigs.map(config => createPopup(event, config));
        popups.forEach(popup => {
          document.body.appendChild(popup);
          fadeIn(popup);
        });
        popups.forEach(popup => {
          popup.addEventListener("mouseenter", function () {
            const fullScreenPopup = document.getElementById("fullScreenPopup");
            const fullScreenContent = document.getElementById("fullScreenContent");

            if (popup.style.backgroundImage.includes('_anim')) {
              fullScreenContent.innerHTML = '<h1>Animation Details</h1><p>...some content...</p>';
            } else if (popup.style.backgroundImage.includes('_rig')) {
              fullScreenContent.innerHTML = '<h1>Rigging Details</h1><p>...some content...</p>';
            } else if (popup.style.backgroundImage.includes('_unity')) {
              fullScreenContent.innerHTML = '<h1>Unity Details</h1><p>...some content...</p>';
            } else if (popup.style.backgroundImage.includes('_unreal')) {
              fullScreenContent.innerHTML = '<h1>Unreal Engine Details</h1><p>...some content...</p>';
            } else if (popup.style.backgroundImage.includes('_tools')) {
              fullScreenContent.innerHTML = '<h1>Tools Details</h1><p>...some content...</p>';
            }

            fadeIn(fullScreenPopup, "flex");
            elements.content.classList.add("blur");
            isFullScreenPopupVisible = true;
            cleanUp(circle, line, popups);
          });
        });
      }
    }
  });

  document.addEventListener("mouseup", function () {
    if (isFullScreenPopupVisible) return;

    if (!isFullScreenPopupVisible) {
      if (isPopupCreated) {
        fadeIn(elements.centerText);
      }

      elements.content.classList.remove("blur");
      cleanUp(circle, line, popups);
      document.removeEventListener("mousemove", drawLine);
      isPopupCreated = false;
    }
  });

  function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

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
    const fullScreenPopup = document.getElementById("fullScreenPopup");
    fadeOut(fullScreenPopup);
    if (circle) document.body.removeChild(circle);
    if (line) document.body.removeChild(line);
    popups.forEach(popup => {
      fadeOut(popup);
      document.body.removeChild(popup);
    });
    popups = [];
  }

  function createFullScreenPopup() {
    let fullScreenPopup = document.getElementById("fullScreenPopup");

    if (!fullScreenPopup) {
      fullScreenPopup = document.createElement("div");
      fullScreenPopup.id = "fullScreenPopup";
      fullScreenPopup.className = "full-screen-popup";
      const closeButton = document.createElement("button");
      closeButton.id = "fullScreenCloseBtn";
      fullScreenPopup.appendChild(closeButton);
      document.body.appendChild(fullScreenPopup);
    }

    const closeButton = fullScreenPopup.querySelector("#fullScreenCloseBtn");

    closeButton.addEventListener("click", function () {
      fadeOut(fullScreenPopup);
      fadeIn(elements.centerText);
      elements.content.classList.remove("blur");
      isFullScreenPopupVisible = false;
      isPopupCreated = false;
    });
  }

  elements.overlay.addEventListener("click", function (event) {
    const fullScreenPopup = document.getElementById("fullScreenPopup");
    if (isFullScreenPopupVisible) {
      if (!isDescendant(fullScreenPopup, event.target)) {
        fadeOut(fullScreenPopup);
        fadeIn(elements.centerText);
        elements.content.classList.remove("blur");
        isFullScreenPopupVisible = false;
        isPopupCreated = false;
      }
    } else {
      handleOverlayClick();
    }
  });
  
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      const fullScreenPopup = document.getElementById("fullScreenPopup");
      if (isFullScreenPopupVisible) {
        fadeOut(fullScreenPopup);
        elements.content.classList.remove("blur");
        isFullScreenPopupVisible = false;
        isPopupCreated = false;
        fadeIn(elements.centerText);
      } else {
        handleOverlayClick();
      }
    }
  });

  createFullScreenPopup();


});
