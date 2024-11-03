// Obtener elementos del DOM
const lengthSlider = document.getElementById("length__slider");
const viewOutput = document.getElementById("view__output");
const buttonUpdate = document.getElementById("button__update");
const buttonCopy = document.getElementById("button__copy");
const useLetters = document.getElementById("options__items--letters");
const useNumbers = document.getElementById("options__items--numbers");
const useSymbols = document.getElementById("options__items--symbols");

useLetters.checked = true; // Activar el checkbox de letras por defecto
let lastChecked = useLetters;

// Función para verificar al menos un checkbox activo
function checkCheckboxes(checkbox) {
  if (!checkbox.checked) {
    // Verificar si los otros están desmarcados
    if (!useLetters.checked && !useNumbers.checked && !useSymbols.checked) {
      lastChecked.checked = true;
    }
  } else {
    // Actualizar el último checkbox activo
    lastChecked = checkbox;
  }
}

// Función para generar contraseña
function generatePassword() {
  const length = parseInt(lengthSlider.value);
  const letters = useLetters.checked
    ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    : "";
  const numbers = useNumbers.checked ? "0123456789" : "";
  const symbols = useSymbols.checked ? "!@#$%^&*()_+-=[]{}|;:,.<>?/" : "";

  const allCharacters = letters + numbers + symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  viewOutput.textContent = password;
}

// Función para copiar contraseña al portapapeles
function copyToClipboard() {
  const password = viewOutput.textContent;
  if (password === "Click en botón generar") {
    alert("Genera una contraseña primero.");
    return;
  }
  navigator.clipboard
    .writeText(password)
    .then(() => {
      alert("Contraseña copiada al portapapeles.");
    })
    .catch((err) => {
      console.error("Error al copiar al portapapeles: ", err);
    });
}

//Eventos
useLetters.addEventListener("change", (e) => checkCheckboxes(e.target));
useNumbers.addEventListener("change", (e) => checkCheckboxes(e.target));
useSymbols.addEventListener("change", (e) => checkCheckboxes(e.target));
buttonUpdate.addEventListener("click", generatePassword);
buttonCopy.addEventListener("click", copyToClipboard);