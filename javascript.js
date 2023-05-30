const bookmarksButton = document.querySelector(".header__bookmark-button");
const addrecipeButton = document.querySelector(".header__addrecipe-button");

const headersearchinput = document.querySelector(".header__search_input");
const headersearchButton = document.querySelector(".header_search-button1");

const bookmarksOverlay = document.querySelector(".bookmarksOverlay");
const addrecipeOverlay = document.querySelector(".addrecipeOverlay");
const directionsButton = document.querySelector(".Direction__button");

const hero__search__results = document.querySelector(".hero__search__results");

const showsearch = [bookmarksButton, headersearchButton];
showsearch.forEach((button) => {
  button.addEventListener("click", () => {
    hero__search__results.classList.add("hero__search__results__show");
    hero__myrecipe__results.classList.remove("hero__myrecipe__results__show");
  });
});

headersearchinput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    hero__search__results.classList.add("hero__search__results__show");
    hero__myrecipe__results.classList.remove("hero__myrecipe__results__show");
  }
});

const myrecipeButton = document.querySelector(".header__myrecipe-button");
const hero__myrecipe__results = document.querySelector(
  ".hero__myrecipe__results"
);

myrecipeButton.addEventListener("click", () => {
  hero__myrecipe__results.classList.add("hero__myrecipe__results__show");
  hero__search__results.classList.remove("hero__search__results__show");
});

// import AOS from "aos";
// import "node_modulesaosdistaos.css";

// AOS.init({
//   duration: 1000,
//   offset: 100,
// });

// bookmarksButton.addEventListener("click", () => {
//   bookmarksOverlay.classList.add("show-overlay");
// });
// function closeOverlay() {
//   bookmarksOverlay.classList.remove("show-overlay");
// }

addrecipeButton.addEventListener("click", () => {
  addrecipeOverlay.classList.add("show-addrecipe-overlay");
});

function closeaddrecipeOverlay() {
  addrecipeOverlay.classList.remove("show-addrecipe-overlay");
}
