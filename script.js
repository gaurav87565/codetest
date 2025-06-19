const runBtn = document.getElementById("runBtn");
const saveBtn = document.getElementById("saveBtn");
const htmlEditor = document.getElementById("htmlEditor");
const cssEditor = document.getElementById("cssEditor");
const jsEditor = document.getElementById("jsEditor");
const outputFrame = document.getElementById("output");

runBtn.addEventListener("click", () => {
  const html = htmlEditor.value;
  const css = cssEditor.value;
  const js = jsEditor.value;

  const result = `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}<\/script>
</body>
</html>
  `;
  outputFrame.srcdoc = result;
});

saveBtn.addEventListener("click", () => {
  const zip = new JSZip();

  zip.file("index.html", htmlEditor.value);
  zip.file("style.css", cssEditor.value);
  zip.file("script.js", jsEditor.value);

  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "tryit-yourself.zip");
  });
});

// Layout toggle buttons
const layoutSide = document.getElementById("layoutSide");
const layoutStack = document.getElementById("layoutStack");
const layoutEditorOnly = document.getElementById("layoutEditorOnly");
const editorArea = document.querySelector(".editor-area");

layoutSide.addEventListener("click", () => {
  editorArea.classList.add("side-by-side");
  editorArea.classList.remove("stacked", "editor-only");
  outputFrame.classList.remove("hidden");
});

layoutStack.addEventListener("click", () => {
  editorArea.classList.add("stacked");
  editorArea.classList.remove("side-by-side", "editor-only");
  outputFrame.classList.remove("hidden");
});

layoutEditorOnly.addEventListener("click", () => {
  editorArea.classList.add("editor-only");
  editorArea.classList.remove("side-by-side", "stacked");
  outputFrame.classList.add("hidden");
});
