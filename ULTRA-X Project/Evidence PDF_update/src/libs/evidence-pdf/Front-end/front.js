const getFile = document.querySelector("#normal");

const urlLink = "http://localhost:4560/evidence-pdf/generate-pdf";

fetch(urlLink)
  .then((res) => res.json())
  .then((data) => console.log(data));
