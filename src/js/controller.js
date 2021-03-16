import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultView from './views/searchResultView.js';
import paginationView from './views/paginationView.js';

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

    // update results view mark selected search result
    searchResultView.update(model.getSearchResultsPage());

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
    searchResultView.render(model.getSearchResultsPage());

    // render pagination buttons
    paginationView.render(model.state.search);

    // render initial pagination buttons
  } catch (err) {
    console.log(err);
  }
}

function controlPagination(goToPage) {
  // render new results
  searchResultView.render(model.getSearchResultsPage(goToPage));

  // render new pagination buttons
  paginationView.render(model.state.search);
}

function controlServing(newServings) {
  // Update the recipe servings (in the state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
}

function init() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
}
init();
