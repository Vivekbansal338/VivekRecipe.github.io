const searchInput = document.querySelector(".header__search_input");
const searchButton = document.querySelector(".header_search-button1");
let currentdata;
let current_open; // bookmark or search or myrecipe
import {
  if_element_inbookmark_records,
  truncateText,
  remove_from_bookmarks,
  add_to_bookmarks,
  remove_from_myrecipes,
} from "./helper.js";

searchButton.addEventListener("click", () => {
  current_open = "search";
  const query = searchInput.value;
  performRecipeSearch(query);
});

searchInput.addEventListener("keyup", (event) => {
  current_open = "search";
  if (event.keyCode === 13) {
    const query = searchInput.value;
    performRecipeSearch(query);
  }
});

function performRecipeSearch(query) {
  searchInput.value = "";
  const apiUrl = `https://forkify-api.herokuapp.com/api/search?q=${query}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        displayNoResult("No Recipe Found");
        return;
      }
      localStorage.setItem("searchResults", JSON.stringify(data));
      displaySearchResults(data);
    })
    .catch((error) => {
      displayNoResult("No Recipe Found");
      console.log("An error occurred:", error);
    });
}

function displayNoResult(message) {
  const searchResultsContainer = document.querySelector(
    ".hero__search__results"
  );

  // Clear any existing search results
  searchResultsContainer.innerHTML = "";

  let html = `<div class="hero__search__result">
        <div class="hero__search__result__img">
          <img src="/img/meal-1.jpg" alt="Recipe 1" />
        </div>

        <div class="hero__search__result__details">
          <h2>${message}</h2>
        </div>
      </div>`;
  searchResultsContainer.innerHTML += html;
}

function displaySearchResults(results) {
  console.log("displaying search results");
  // Get the search results container element
  const searchResultsContainer = document.querySelector(
    ".hero__search__results"
  );
  // Clear any existing search results
  searchResultsContainer.innerHTML = "";
  for (var i = 0; i < results.count; i++) {
    const truncatedTitle = truncateText(results.recipes[i].title, 17);
    const truncatedproducer = truncateText(results.recipes[i].publisher, 15);
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("hero__search__result");
    recipeElement.setAttribute("data-recipe-id", results.recipes[i].recipe_id);

    recipeElement.innerHTML = `
            <div class="hero__search__result__img">
              <img src=${results.recipes[i].image_url} alt="Recipe 1" />
            </div>
            <div class="hero__search__result__details">
              <h2>${truncatedTitle}</h2>
              <h3>By ${truncatedproducer}</h3>
            </div>
          `;
    searchResultsContainer.appendChild(recipeElement);
  }
  registerRecipeListeners();
}

function registerRecipeListeners() {
  console.log("registering search listeners");
  const recipeElements = document.querySelectorAll(".hero__search__result");
  let selectedRecipeElement = null;
  for (let i = 0; i < recipeElements.length; i++) {
    recipeElements[i].addEventListener("click", () => {
      if (selectedRecipeElement) {
        selectedRecipeElement.classList.remove("hero__search__result_toggled");
      }

      // Apply scale transformation to the current clicked element
      recipeElements[i].classList.add("hero__search__result_toggled");
      selectedRecipeElement = recipeElements[i];

      const recipeId = recipeElements[i].getAttribute("data-recipe-id");
      loadRecipeDetails(recipeId);
    });
  }
}

function loadRecipeDetails(recipeId) {
  console.log("loading search recipe details");

  // Construct the API URL using the recipeId
  const apiUrl = `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`;

  // Make an API request to retrieve the recipe details
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Process the response and display the recipe details
      displayRecipedetails(data);
    })
    .catch((error) => {
      // Handle any errors that occur during the API call
      console.log("An error occurred:", error);
    });
}

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

  document
    .querySelector(".initial_message")
    .classList.add("initial_message_hidden");
  document
    .querySelector(".hero_recipe_detail")
    .classList.remove("hero_recipe_detail_hidden");

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

const recipeDetailbookmarkbutton = document.querySelector(
  ".recipe_bookmark_button"
);
event_listeners_bookmark(recipeDetailbookmarkbutton);

function event_listeners_bookmark(recipeDetailbookmarkbutton) {
  recipeDetailbookmarkbutton.addEventListener("click", () => {
    add_remove_bookmarks(
      recipeDetailbookmarkbutton.getAttribute("data-recipe-id")
    );
  });
}

function add_remove_bookmarks(recipe_id) {
  const {
    // recipe_id,
    image_url,
    title,
    publisher,
    publisher_url,
    source_url,
    ingredients,
  } = currentdata.recipe;
  const recipeDetailbookmarkbutton = document.querySelector(
    ".recipe_bookmark_button"
  );
  const isBookmarked = if_element_inbookmark_records(recipe_id);
  console.log("isBookmarked", isBookmarked);
  if (isBookmarked) {
    // Remove from bookmarks
    recipeDetailbookmarkbutton.style.backgroundColor = "#9a77ff";
    console.log("removing from bookmarks");
    remove_from_bookmarks(recipe_id);
    console.log("Recipe removed from bookmarks.");
  }
  if (!isBookmarked) {
    // Add to bookmarks
    recipeDetailbookmarkbutton.style.backgroundColor = "#9b4fe2";
    const newBookmark = {
      recipe_id,
      image_url,
      title,
      publisher,
      publisher_url,
      source_url,
      ingredients,
    };
    add_to_bookmarks(newBookmark);
  }
  if (current_open === "bookmark") {
    displayBookmarkResults(
      JSON.parse(localStorage.getItem("bookmark_records"))
    );
  }
}

// <------------------------------code for deleting myrecipe start------------------------->

const recipedetaildeletebutton = document.querySelector(
  ".delete_myrecipe_button"
);
event_listeners_delete(recipedetaildeletebutton);

function event_listeners_delete(recipedetaildeletebutton) {
  recipedetaildeletebutton.addEventListener("click", () => {
    delete_myrecipe(recipedetaildeletebutton.getAttribute("data-recipe-id"));
  });
}

function delete_myrecipe(recipe_id) {
  // Remove from myrecipes
  console.log("removing from myrecipes");
  console.log("recipe_id", recipe_id);
  remove_from_myrecipes(recipe_id);
  alert("Recipe removed from myrecipes.");
  console.log("Recipe removed from myrecipes.");

  if (current_open === "myrecipe") {
    displaymyrecipeResults(JSON.parse(localStorage.getItem("form_records")));
  }
}

// <------------------------------code for deleting myrecipe ends------------------------->

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const bookmarkButton = document.querySelector(".header__bookmark-button");

bookmarkButton.addEventListener("click", () => {
  current_open = "bookmark";
  const data = JSON.parse(localStorage.getItem("bookmark_records")) || {
    count: 0,
    recipes: [],
  };

  displayBookmarkResults(data);
  console.log(data);
});

function displayBookmarkResults(results) {
  if (results.count === 0) {
    displayNoResult("No Recipe Found");
    return;
  }
  console.log("displaying bookmark results");
  // Get the search results container element
  const searchResultsContainer = document.querySelector(
    ".hero__search__results"
  );
  // Clear any existing search results
  searchResultsContainer.innerHTML = "";
  for (var i = 0; i < results.count; i++) {
    const truncatedTitle = truncateText(results.recipes[i].title, 17);
    const truncatedproducer = truncateText(results.recipes[i].publisher, 15);
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("hero__search__result");
    recipeElement.setAttribute("data-recipe-id", results.recipes[i].recipe_id);

    recipeElement.innerHTML = `
            <div class="hero__search__result__img">
              <img src=${results.recipes[i].image_url} alt="Recipe 1" />
            </div>
            <div class="hero__search__result__details">
              <h2>${truncatedTitle}</h2>
              <h3>By ${truncatedproducer}</h3>
            </div>
          `;
    searchResultsContainer.appendChild(recipeElement);
  }
  registerRecipeBookmarkListeners();
}

function registerRecipeBookmarkListeners() {
  console.log("registering search listeners");
  const recipeElements = document.querySelectorAll(".hero__search__result");
  let selectedRecipeElement = null;
  for (let i = 0; i < recipeElements.length; i++) {
    recipeElements[i].addEventListener("click", () => {
      if (selectedRecipeElement) {
        selectedRecipeElement.classList.remove("hero__search__result_toggled");
      }

      // Apply scale transformation to the current clicked element
      recipeElements[i].classList.add("hero__search__result_toggled");
      selectedRecipeElement = recipeElements[i];

      const recipeId = recipeElements[i].getAttribute("data-recipe-id");
      loadRecipeBookmarkDetails(recipeId);
    });
  }
}

function loadRecipeBookmarkDetails(recipeId) {
  console.log("loading bookmark recipe details");

  const data = JSON.parse(localStorage.getItem("bookmark_records")) || {
    count: 0,
    recipes: [],
  };
  for (var i = 0; i < data.count; i++) {
    if (data.recipes[i].recipe_id == recipeId) {
      displayRecipedetails({ recipe: data.recipes[i] });
      break;
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const myrecipebutton = document.querySelector(".header__myrecipe-button");

myrecipebutton.addEventListener("click", () => {
  current_open = "myrecipe";
  const data = JSON.parse(localStorage.getItem("form_records")) || {
    count: 0,
    recipes: [],
  };
  displaymyrecipeResults(data);
  console.log(data);
});

function displaymyrecipeResults(results) {
  console.log("displaying myrecipe results");
  // Get the search results container element
  const myrecipecontainer = document.querySelector(".hero__myrecipe__results");
  // Clear any existing search results
  myrecipecontainer.innerHTML = "";
  for (var i = 0; i < results.count; i++) {
    const truncatedTitle = truncateText(results.recipes[i].title, 17);
    const truncatedproducer = truncateText(results.recipes[i].publisher, 15);
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("hero__search__result");
    recipeElement.setAttribute("data-recipe-id", results.recipes[i].recipe_id);

    recipeElement.innerHTML = `
            <div class="hero__search__result__img">
              <img src=${results.recipes[i].image_url} alt="Recipe 1" />
            </div>
            <div class="hero__search__result__details">
              <h2>${truncatedTitle}</h2>
              <h3>By ${truncatedproducer}</h3>
            </div>
          `;
    myrecipecontainer.appendChild(recipeElement);
  }

  registermyRecipeListeners();
}

function registermyRecipeListeners() {
  console.log("registering myrecipe listeners");
  const recipeElements = document.querySelectorAll(".hero__search__result");
  let selectedRecipeElement = null;
  for (let i = 0; i < recipeElements.length; i++) {
    recipeElements[i].addEventListener("click", () => {
      if (selectedRecipeElement) {
        selectedRecipeElement.classList.remove("hero__search__result_toggled");
      }

      // Apply scale transformation to the current clicked element
      recipeElements[i].classList.add("hero__search__result_toggled");
      selectedRecipeElement = recipeElements[i];

      const recipeId = recipeElements[i].getAttribute("data-recipe-id");
      loadmyRecipeDetails(recipeId);
    });
  }
}

function loadmyRecipeDetails(recipeId) {
  console.log("loading my recipe details");

  const data = JSON.parse(localStorage.getItem("form_records")) || {
    count: 0,
    recipes: [],
  };

  for (var i = 0; i < data.count; i++) {
    if (data.recipes[i].recipe_id == recipeId) {
      displayRecipedetails({ recipe: data.recipes[i] });
      break;
    }
  }
}
