import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Gets Recipe from API

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. loading recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    // 2. Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    console.error(err);
    alert(err);
  }
}

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
