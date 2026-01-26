async function loadSection(id, htmlPath, jsPath) {
  const container = document.getElementById(id);
  console.log(id);
  const response = await fetch(htmlPath);
  container.innerHTML = await response.text();
  console.log(response);
  if (jsPath) {
    const module = await import(jsPath);
    if (module.default) {
      module.default(container);
    }
  }
}

loadSection("hero", "/homepage/heroCarousel.html", "./heroCarousel.js");
loadSection("footer", "/homepage/footer.html");
