function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      if (page.id === pageId) {
        page.style.transform = "translateX(0%)";
      } else {
        page.style.transform = "translateX(100%)";
      }
    });
  }
  