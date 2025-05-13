// Get DOM elements
const generateBtn = document.getElementById("generate-btn");
const baseColor = document.getElementById("base-color");
const schemeType = document.getElementById("scheme-type");
const colorScheme = document.getElementById("color-scheme");

// Event listener: Trigger fetch when "Generate" button is clicked
generateBtn.addEventListener("click", () => {
  // Remove '#' and get color hex
  const hex = baseColor.value.replace("#", "");
  const mode = schemeType.value;

  // Fetch color scheme from TheColorAPI
  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
    .then(res => res.json())
    .then(data => {
      // Clear previous color boxes
      colorScheme.innerHTML = "";

      // Create a color box for each color in the response
      data.colors.forEach(color => {
        const box = document.createElement("div");
        box.className = "color-box";
        box.style.backgroundColor = color.hex.value;
        box.textContent = color.hex.value;

        // Add click-to-copy functionality
        box.addEventListener("click", () => {
          navigator.clipboard.writeText(color.hex.value);
          alert(`Copied ${color.hex.value} to clipboard!`);
        });

        // Append box to the DOM
        colorScheme.appendChild(box);
      });
    });
});
