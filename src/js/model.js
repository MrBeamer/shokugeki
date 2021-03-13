import { API_URL } from './config.js';
import { API_KEY } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
};

export async function loadRecipe(id) {
  try {
    const data = await getJSON(`${API_URL}${id}${API_KEY}`);

    const res = await fetch(`${API_URL}${id}${API_KEY}`);

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
  }
}
