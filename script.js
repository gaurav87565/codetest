const runBtn = document.getElementById("runBtn");
const saveBtn = document.getElementById("saveBtn");
const htmlEditor = document.getElementById("htmlEditor");
const cssEditor = document.getElementById("cssEditor");
const jsEditor = document.getElementById("jsEditor");
const outputFrame = document.getElementById("output");

// ▶️ Run button
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
</html>`;
  outputFrame.srcdoc = result;
});

// 💾 Save button
saveBtn.addEventListener("click", () => {
  const zip = new JSZip();
  zip.file("index.html", htmlEditor.value);
  zip.file("style.css", cssEditor.value);
  zip.file("script.js", jsEditor.value);

  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "tryit-yourself.zip");
  });
});

// 📐 Layout switching
const layoutToggleMain = document.getElementById("layoutToggleMain");
const layoutMenu = document.getElementById("layoutMenu");
const workspace = document.querySelector(".workspace");

const layoutIcons = {
  left: "⬅️",
  right: "➡️",
  top: "⬆️"
};

function setLayout(type) {
  workspace.classList.remove("layout-left", "layout-right", "layout-top");
  workspace.classList.add(`layout-${type}`);
  layoutToggleMain.textContent = layoutIcons[type];
  layoutMenu.classList.add("hidden");

  const editorArea = document.querySelector(".editor-area");
  const output = document.getElementById("output");

  editorArea.style.width = "";
  editorArea.style.height = "";
  output.style.width = "";
  output.style.height = "";
}

layoutToggleMain.addEventListener("click", () => {
  layoutMenu.classList.toggle("hidden");
});

layoutMenu.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => {
    const layout = btn.getAttribute("data-layout");
    setLayout(layout);
  });
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".layout-toggle-wrapper")) {
    layoutMenu.classList.add("hidden");
  }
});
