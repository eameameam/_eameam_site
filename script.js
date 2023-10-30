document.addEventListener("DOMContentLoaded", function() {
  const contactBtn = document.getElementById("contactBtn");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");
  const content = document.getElementById("content");
  const overlay = document.getElementById("overlay");

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
});
