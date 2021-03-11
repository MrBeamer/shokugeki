import icons from 'url:../img/icons.svg'; // parcel to replace icons with parcel icons, then put in the src of the images html
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

function renderSpinner(parentEl) {
  const markUp = `
 <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markUp);
}

// Gets Recipe from API

async function showRecipe() {
  // 1. loading recipe
  renderSpinner(recipeContainer);

  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=<a6b8d971-9bf8-47de-9bcc-f660ef493642>`
    );

    // if (!res.ok) throw new Error(`${data.message}`);

    const data = await res.json();
    if (!res.ok)
      throw new Error(
        `${data.message} ${res.status}  Please enter a correct id`
      );
    let { recipe } = data.data;
    recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    // 2. Rendering recipe

    const markup = `  <figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

${recipe.ingredients
  .map(ingredient => {
    return `<li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ingredient.quantity ?? ''}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ingredient.unit ?? ''}</span>
                  ${ingredient.description}
                </div>
              </li>`;
  })
  .join('')}
  </ul>
    </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
    console.log(recipe);
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
