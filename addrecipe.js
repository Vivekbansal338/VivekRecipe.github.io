import { add_to_myrecipes } from "./helper.js";

document.addEventListener("DOMContentLoaded", function () {
  const addmoreingredients = document.querySelector("#add-ingredient-button");
  const ingredentslist = document.querySelector("#ingredients-list");
  const form = document.querySelector(".addrecipe__form");

  addmoreingredients.addEventListener("click", () => {
    const newinput = document.createElement("input");
    newinput.setAttribute("type", "text");
    newinput.setAttribute("name", "ingredient");
    newinput.setAttribute("placeholder", "Ingredient");
    newinput.required = true;
    ingredentslist.appendChild(newinput);
  });

  const submitButton = document.querySelector(".submit_recipe_button");
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    saveFormData();
  });

  function saveFormData() {
    const formData = {
      image_url: document.querySelector("#recipe-image-url").value,
      ingredients: [],
      publisher: document.querySelector("#publisher-name").value,
      publisher_url: document.querySelector("#publisher-website").value,
      recipe_id: generateRecipeId(),
      source_url: document.querySelector("#sourceurl-website").value,
      title: document.querySelector("#recipe_title").value,
    };

    const ingredientInputs = document.querySelectorAll(
      '.addrecipe__ingredients input[name="ingredient"]'
    );
    ingredientInputs.forEach(function (input) {
      formData.ingredients.push(input.value);
    });

    function generateRecipeId() {
      const timestamp = Date.now(); // Get the current timestamp
      const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
      const recipeId = `${timestamp}${randomNum}`; // Combine the timestamp and random number and convert to number
      return recipeId;
    }

    add_to_myrecipes(formData);
    alert("Form data saved successfully!");
    // Remove existing ingredient inputs
    for (let i = 0; i < ingredientInputs.length - 1; i++) {
      ingredientInputs[i].remove();
    }
    form.reset();
    document.querySelector(".close-overlay-addrecipe").click();
  }
});
