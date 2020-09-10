const button = document.querySelector(".search");
const input = document.querySelector(".foodInput");
const recipeData = document.querySelector("#content");
const API_ID = "f38cf42b";
const API_KEY = "940188b8e6db4aa8f205be61600cb5b5";
let generatedHTML = "";

const getRecipes = async function () {
  const resp = await fetch(
    `https://api.edamam.com/search?app_id=${API_ID}&app_key=${API_KEY}&q=${input.value}&to=20`
  );
  const data = await resp.json();
  console.log(data);
  displayRecipes(data.hits);
};

const displayRecipes = (results) => {
  results.map((result) => {
    generatedHTML += `<div class="card">
    <img
      src="${result.recipe.image}"
      class="card-img-top"
      alt=""
    />
    <div class="card-body">
      <h3 class="card-title">${result.recipe.label}</h3>
      <p class="card-text">Calories: ${result.recipe.calories}</p>
      <p class="card-text">Health Labels: ${result.recipe.healthLabels}</p>
      <p class="card-text">Ingredient Lines: ${result.recipe.ingredientLines}</p>
      <p class="card-text">Source: ${result.recipe.source}</p>
      <a href="${result.recipe.url}" class="card-link"><button>View Recipe</button></a>
    </div>
  </div>`;
  });
  recipeData.innerHTML = generatedHTML;
};

button.addEventListener("click", () => {
  getRecipes();
});

input.addEventListener("keypress", (e) => {
  if (input.value.length > 0 && e.keyCode === 13) {
    getRecipes();
    input.value = "";
  }
});
