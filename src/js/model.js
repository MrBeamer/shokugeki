import { API_URL } from './config.js';
import { API_KEY } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}${API_KEY}`);

    // const res = await fetch(`${API_URL}${id}${API_KEY}`);

    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/////////////

export async function loadSearchResults(query) {
  try {
    state.search.query = query;
    const data = await getJSON(` ${API_URL}?search=${query}${API_KEY}> `);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });
  } catch (err) {
    throw err;
  }
}
