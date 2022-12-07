const download_file = document.getElementById("download-button");

// download_file.addEventListener("onclick", function () {
//   const urlFile = "http://localhost:4560/evidence-pdf/generate-xlsx-file";
//   fetch(urlFile).then(console.log("error"));
// });

function getData() {
  const urlFile = "http://localhost:4560/evidence-pdf/generate-xlsx-file";

  fetch(urlFile).then(console.log("success"));
}
