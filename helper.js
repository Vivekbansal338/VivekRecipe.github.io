function if_element_inbookmark_records(id) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmark_records")) || {
    count: 0,
    recipes: [],
  };

  return bookmarks.recipes.some((recipe) => recipe.recipe_id === id);
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}

function remove_from_bookmarks(recipeId) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmark_records")) || {
    count: 0,
    recipes: [],
  };

  const updatedRecipes = bookmarks.recipes.filter(
    (recipe) => recipe.recipe_id !== recipeId
  );

  bookmarks.recipes = updatedRecipes;
  bookmarks.count = updatedRecipes.length;

  localStorage.setItem("bookmark_records", JSON.stringify(bookmarks));
}

function add_to_bookmarks(newBookmark) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmark_records")) || {
    count: 0,
    recipes: [],
  };

  bookmarks.recipes.push(newBookmark);
  bookmarks.count = bookmarks.recipes.length;

  localStorage.setItem("bookmark_records", JSON.stringify(bookmarks));
}

function add_to_myrecipes(formData) {
  let form_records = JSON.parse(localStorage.getItem("form_records")) || {
    count: 0,
    recipes: [],
  };

  form_records.recipes.push(formData);
  form_records.count = form_records.recipes.length;
  localStorage.setItem("form_records", JSON.stringify(form_records));
}

function remove_from_myrecipes(recipe_id) {
  console.log(recipe_id, "helper");
  let form_records = JSON.parse(localStorage.getItem("form_records")) || {
    count: 0,
    recipes: [],
  };
  const updatedRecipes = form_records.recipes.filter(
    (recipe) => recipe.recipe_id !== recipe_id
  );
  form_records.recipes = updatedRecipes;
  form_records.count = updatedRecipes.length;
  localStorage.setItem("form_records", JSON.stringify(form_records));
}

// Export the function to make it accessible from other files
export {
  if_element_inbookmark_records,
  truncateText,
  remove_from_bookmarks,
  add_to_bookmarks,
  add_to_myrecipes,
  remove_from_myrecipes,
};
