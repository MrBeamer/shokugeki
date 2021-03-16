import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultView from './views/searchResultView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
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

    //0. update results view mark selected search result
    searchResultView.update(model.getSearchResultsPage());

    // 1. loading recipe
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    // 2. Rendering recipe
    recipeView.render(recipe);

    // 3. updating bookmark view
    bookmarksView.update(model.state.bookmarks);
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
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeView.update(model.state.recipe);

  //render the bookmarks
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

async function controlAddRecipe(newRecipe) {
  try {
    // render spinner
    addRecipeView.renderSpinner();

    // upload new recipe data
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.renderMessage();

    // render the bookmark view
    bookmarksView.render(model.state.bookmarks);

    // change id in url / changing url without reloading the page
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    // render error message
    addRecipeView.renderError(err.message);
  }
}

function init() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();
