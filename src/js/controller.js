import * as model from './model.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import uploadRecipe from './views/uploadRecipe.js';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import { async } from 'regenerator-runtime';
import { MODAL_SEC } from './config.js';

const controlRecipe = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    resultsView.update(model.getPagination());
    bookmarksView.update(model.state.bookmarks);

    recipeView.renderSpinner();
    await model.loadRecipe(hash);
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearch = async function (query) {
  try {
    resultsView.renderSpinner();
    await model.searchResults(query);
    resultsView.render(model.getPagination());
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err.message);
  }
};

const controlPagination = function (id) {
  resultsView.render(model.getPagination(id));
  paginationView.render(model.state.search);
};

const controlServings = function (serveTo) {
  model.adjustServings(serveTo);
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark();
  else model.removeBookmark();

  model.persitBookmarks();
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlLoadBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUpload = async function (data) {
  try {
    uploadRecipe.renderSpinner();
    await model.uploadRecipe(data);
    uploadRecipe.renderMessage();

    window.location.hash = model.state.recipe.id;
    setTimeout(() => uploadRecipe.toggleModal(), MODAL_SEC * 1000);

    bookmarksView.render(model.state.bookmarks);
    model.persitBookmarks();
  } catch (err) {
    uploadRecipe.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerLoad(controlRecipe);
  bookmarksView.addHandlerLoad(controlLoadBookmarks);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmarks);
  searchView.addEventHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
  uploadRecipe.addHandlerupload(controlUpload);
};
init();
