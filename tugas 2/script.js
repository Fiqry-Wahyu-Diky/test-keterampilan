const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const recipesContainer = document.querySelector("#recipes");
const sortBtn = document.querySelector("#sortBtn");

const apiUrl = "https://chinese-food-db.p.rapidapi.com";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "890452f4d1mshb07522cce21bd18p1d9caajsn4c851ff78c71",
    "x-rapidapi-host": "chinese-food-db.p.rapidapi.com",
  },
};

let currentRecipes = [];
let sortDirection = "asc";

async function searchRecipes(query = "") {
  const url = `${apiUrl}`;

  try {
    recipesContainer.innerHTML = '<div class="loading">Loading...</div>';
    const response = await fetch(url, options);
    let data = await response.json();

    if (query) {
      data = data.filter((recipe) => recipe.title.toLowerCase().includes(query.toLowerCase()));
    }
    currentRecipes = data;
    console.log(data);
    displayRecipes(data);
  } catch (error) {
    recipesContainer.innerHTML = '<div class="error">Error fetching recipes. Please try again.</div>';
    console.error(error);
  }
}

function displayRecipes(recipes) {
  if (!recipes.length) {
    recipesContainer.innerHTML = '<div class="no-results">No recipes found</div>';
    return;
  }

  recipesContainer.innerHTML = recipes
    .map(
      (recipe) => `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="recipe-info">
        <h3>${recipe.title}</h3>
        <p>Ready in ${recipe.readyInMinutes} minutes</p>
        <p>Servings: ${recipe.servings}</p>
        <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>
      </div>
    </div>
  `
    )
    .join("");
}

async function fetchRecipeDetails(id) {
  const url = `${apiUrl}/${id}`;

  const response = await fetch(url, options);
  return response.json();
}

function createModal() {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modal-body"></div>
      </div>
    `;
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector(".close");
  closeBtn.onclick = () => (modal.style.display = "none");

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return modal;
}

function showRecipeDetails(modal, recipe) {
  const modalBody = modal.querySelector(".modal-body");
  modalBody.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}">

      <div class="recipe-sections">
        <div class="ingredients-section">
          <h3>Ingredients</h3>
          <ul>
            ${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
          </ul>
        </div>

        <div class="instructions-section">
          <h3>Instructions</h3>
          <ol>
            ${
              recipe.method.map((step, index) => `<li>${step["Step " + (index + 1)]}</li>`).join("") ||
              "<li>No instructions available</li>"
            }
          </ol>
        </div>
      </div>
    `;
  modal.style.display = "block";
}

function sortRecipesByTitle(recipes, direction = "asc") {
  return [...recipes].sort((a, b) => {
    const comparison = a.title.localeCompare(b.title);
    return direction === "asc" ? comparison : -comparison;
  });
}

window.addEventListener("click", (e) => {
  if (e.target.id === "searchBtn") {
    const query = searchInput.value.trim();
    searchRecipes(query);
  }

  if (e.target.classList.contains("view-recipe")) {
    const id = e.target.dataset.id;
    // chenge text content loading
    e.target.textContent = "Loading...";
    fetchRecipeDetails(id)
      .then((recipe) => {
        const modal = createModal();
        showRecipeDetails(modal, recipe);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        e.target.textContent = "View Recipe";
      });
  }
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      searchRecipes(query);
    }
  }
});

sortBtn.addEventListener("click", () => {
  sortDirection = sortDirection === "asc" ? "desc" : "asc";
  sortBtn.textContent = `Sort by Title ${sortDirection === "asc" ? "↑" : "↓"}`;
  const sortedRecipes = sortRecipesByTitle(currentRecipes, sortDirection);
  displayRecipes(sortedRecipes);
});

window.onload = () => {
  searchRecipes();
};
