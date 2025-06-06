function runCode() {
  const html = document.getElementById("htmlCode").value;
  const css = `<style>${document.getElementById("cssCode").value}</style>`;
  const js = `<script>${document.getElementById("jsCode").value}<\/script>`;
  const output = html + css + js;
  document.getElementById("outputFrame").srcdoc = output;
}

runCode(); // Run on load

function downloadCode() {
  const zip = new JSZip();
  zip.file("index.html", document.getElementById("htmlCode").value);
  zip.file("style.css", document.getElementById("cssCode").value);
  zip.file("script.js", document.getElementById("jsCode").value);

  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "code.zip");
  });
}

// Resizable logic
const divider = document.getElementById("divider");
const editor = document.getElementById("editor");
let isResizing = false;

divider.addEventListener("mousedown", () => {
  isResizing = true;
  document.body.style.cursor = "ew-resize";
});

window.addEventListener("mousemove", (e) => {
  if (!isResizing) return;
  const percent = (e.clientX / window.innerWidth) * 100;
  editor.style.flex = "0 0 " + percent + "%";
});

window.addEventListener("mouseup", () => {
  isResizing = false;
  document.body.style.cursor = "default";
});
