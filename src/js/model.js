import { async } from 'regenerator-runtime';
import { API_URL, KEY, RESULTS_PER_PAGE } from './config.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: { query: '', results: [], page: 1, resultsPerPage: RESULTS_PER_PAGE },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    sourceUrl: recipe.source_url,
    ingredients: recipe.ingredients,
    bookmarked: state.bookmarks.some(rec => rec.id === recipe.id)
      ? true
      : false,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
  state.recipe = createRecipeObject(data);
};

export const searchResults = async function (query) {
  try {
    state.search.query = query;
    let { recipes } = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    if (recipes.length === 0) throw Error;

    recipes = recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        imageUrl: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.results = recipes;
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const adjustServings = function (serveTo) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * serveTo) / state.recipe.servings;
  });
  state.recipe.servings = serveTo;
};

export const getPagination = function (page = 1) {
  state.search.page = page;
  return state.search.results.slice((page - 1) * 10, page * 10);
};

export const addBookmark = function () {
  state.recipe.bookmarked = true;
  state.bookmarks.push(state.recipe);
};

export const removeBookmark = function () {
  state.recipe.bookmarked = false;
  const index = state.bookmarks.findIndex(rec => rec.id === state.recipe.id);
  state.bookmarks.splice(index, 1);
};

export const persitBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const retriveBookmarks = function () {
  const data = JSON.parse(localStorage.getItem('bookmarks'));
  if (!data) return;
  state.bookmarks = data;
};

export const uploadRecipe = async function (rec) {
  try {
    let ingredients = Object.entries(rec);
    ingredients = ingredients
      .filter(ing => ing[0].startsWith('ingredient') && ing[1].length !== 0)
      .map(ing => {
        const entry = ing[1].split(',').map(val => val.trim());
        if (entry.length !== 3) throw new Error('Invalid inputs');

        const [quantity, unit, description] = entry;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: rec.title,
      publisher: rec.publisher,
      servings: rec.servings,
      cooking_time: rec.cookingTime,
      image_url: rec.imageUrl,
      source_url: rec.sourceUrl,
      ingredients: ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    if (!data) return;

    const newRecipe = createRecipeObject(data);
    newRecipe.key = KEY;
    newRecipe.bookmarked = true;
    state.recipe = newRecipe;
    state.bookmarks.push(newRecipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  retriveBookmarks();
};
init();
