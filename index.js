const itemsContainer = document.querySelector("#list-items")
const btnClear = document.querySelector("#btn-clear")
const btnLoad = document.querySelector("#btn-load")

function addItem(item) {
  const colourCard = document.createElement("section")
  colourCard.className = "card w-75 mb-3"

  colourCard.innerHTML = `
    <article class="card-body">
      <h5 class="card-title">${item.name} (${item.year})</h5>
      <p class="card-text">Pantone: ${item.pantone_value}</p>
      <figure style="background-color: ${item.color}; color: #fff; padding: 5px; text-align: center;">
        ${item.color}
      </figure>
    </article>
  `
  itemsContainer.append(colourCard)
}

// Cargar data.json y almacenar localStorage
async function fetchColorsList() {
  try {
    const response = await fetch('./js/data.json')
    const data = await response.json()
    const colors = data.data

    itemsContainer.innerHTML = ""
    colors.map(addItem) // usamos map para iterar

    localStorage.setItem("colors", JSON.stringify(colors))
  } catch (error) {
    console.error("Error al obtener los colores:", error)
  }
}

// Cargar desde localStorage
function loadColorsFromStorage() {
  const storedColors = localStorage.getItem("colors")
  if (storedColors) {
    const colors = JSON.parse(storedColors)
    itemsContainer.innerHTML = ""
    colors.map(addItem) // map para iterar
  }
}

// Botones
btnClear.addEventListener("click", () => {
  itemsContainer.innerHTML = ""
  localStorage.removeItem("colors")
})

btnLoad.addEventListener("click", () => {
  fetchColorsList()
})

// Al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  loadColorsFromStorage()
})
