export const state = {
  recipe: {},
};

export async function loadRecipe(id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=<a6b8d971-9bf8-47de-9bcc-f660ef493642>`
    );

    const data = await res.json();
    if (!res.ok)
      throw new Error(
        `${data.message} ${res.status}  Please enter a correct id`
      );
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
    alert(err);
  }
}
