document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (elementId, filePath) => {
    const element = document.getElementById(elementId);
    if (element) {
      fetch(filePath)
        .then(response => response.ok ? response.text() : Promise.reject('File not found'))
        .then(data => {
          element.innerHTML = data;
        })
        .catch(error => console.error(`Error loading component ${filePath}:`, error));
    }
  };

  loadComponent("header-placeholder", "layout/header.html");
  loadComponent("footer-placeholder", "layout/footer.html");
});
