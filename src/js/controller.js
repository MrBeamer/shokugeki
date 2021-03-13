import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultView from './views/searchResultView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

///////////////////////////////////////

// Gets Recipe from API

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. loading recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    // 2. Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    // Renders error
    recipeView.renderError();
    console.error(err);
  }
}

async function controlSearchResults() {
  try {
    searchResultView.renderSpinner();

    // get query
    const query = searchView.getQuery();
    if (!query) return;

    // load search result
    await model.loadSearchResults(query);
    searchView.clearInput();

    /// rendering search results
    const recipes = model.state.search.results;

    searchResultView.render(recipes);
  } catch (err) {
    console.log(err);
  }
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
