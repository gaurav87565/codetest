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

// Run C++ using Judge0 API
async function runCppCode() {
  const sourceCode = document.getElementById("cppCode").value;
  const outputFrame = document.getElementById("outputFrame");

  outputFrame.srcdoc = `<html><body style="color:white; background:#23272a; font-family:monospace;">Running...</body></html>`;

  try {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": "6dda188f34msh26c705ff97cf404p18b8d8jsn14ddecfa0823",  // Replace with your key
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com"
      },
      body: JSON.stringify({
        language_id: 54, // C++ (GCC 9.2.0)
        source_code: sourceCode
      })
    });

    const result = await response.json();
    const output = result.stdout || result.stderr || result.compile_output || "No output";

    outputFrame.srcdoc = `<html><body style="color:white; background:#23272a; font-family:monospace; white-space:pre;">${output}</body></html>`;

  } catch (err) {
    outputFrame.srcdoc = `<html><body style="color:red; background:#23272a;">Error: ${err.message}</body></html>`;
  }
}

// Save .cpp file
function downloadCpp() {
  const zip = new JSZip();
  const code = document.getElementById("cppCode").value;
  zip.file("main.cpp", code);
  zip.generateAsync({ type: "blob" }).then(content => {
    saveAs(content, "cpp_code.zip");
  });
}
