function displayRecipedetails(data) {
  currentdata = data;
  console.log("displaying search recipe details");
  console.log(data);
  const {
    recipe_id,
    image_url,
    title,
    publisher,
    publisher_url,
    source_url,
    ingredients,
  } = data.recipe;

  //images
  console.log("displaying search recipe images");
  const recipeDetailimg = document.querySelector(".hero_recipe_detail_img");
  recipeDetailimg.innerHTML = `<img src=${image_url} alt=${title} />`;

  // recipe details

  console.log("displaying search recipe details");
  const recipeDetailtitle = document.querySelector(".hero_recipe_tilte");
  recipeDetailtitle.innerHTML = `${title}`;

  const recipeDetailpublisher = document.querySelector(".hero_publisher_name");
  recipeDetailpublisher.innerHTML = `${publisher}`;

  const recipeDetailpublisherurl = document.querySelector(
    ".hero_publisher_url"
  );
  recipeDetailpublisherurl.setAttribute("href", `${publisher_url}`);

  //load bookmark button color
  console.log("displaying bookmark button color");

  const recipeDetailbookmarkbutton = document.querySelector(
    ".recipe_bookmark_button"
  );
  const recipedetaildeletebutton = document.querySelector(
    ".delete_myrecipe_button"
  );

  const isbookmared = if_element_inbookmark_records(recipe_id);
  if (isbookmared) {
    recipeDetailbookmarkbutton.style.backgroundColor = "#9b4fe2";
  } else {
    recipeDetailbookmarkbutton.style.backgroundColor = "#9a77ff";
  }

  recipeDetailbookmarkbutton.setAttribute("data-recipe-id", recipe_id);
  recipedetaildeletebutton.setAttribute("data-recipe-id", recipe_id);

  // delete or bookmark button
  console.log("displaying delete or bookmark button");
  if (current_open === "search" || current_open === "bookmark") {
    document.querySelector(".recipe_bookmark_button").style.display = "block";
    document.querySelector(".delete_myrecipe_button").style.display = "none";
  }
  if (current_open === "myrecipe") {
    document.querySelector(".recipe_bookmark_button").style.display = "none";
    document.querySelector(".delete_myrecipe_button").style.display = "block";
  }

  // Ingredents
  console.log("displaying search recipe ingredents");
  const recipeDetailingredientslist = document.querySelector(
    ".Recipe_ingredents_list"
  );

  let html = ``;
  for (var i = 0; i < ingredients.length; i++) {
    html =
      html + `<li><i class="fas fa-check"></i> <p> ${ingredients[i]}</p></li>`;
  }
  recipeDetailingredientslist.innerHTML = html;

  // source url
  const directionButton = document.querySelector(".Direction__button");
  directionButton.setAttribute("href", `${source_url}`);
}
