import View from './view.js';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _error = 'API error';
  _message = '';

  _generateIngredients() {
    return this._data.ingredients
      .map(
        ing => `
        <li>
        <svg class="icon icon--orange">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__units">
        ${ing.unit}
          <span class="recipe__desc">
          ${ing.description}
          </span>
        </div>
      </li>
      `
      )
      .join('');
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img
      alt="${this._data.title}"
      src="${this._data.imageUrl}"
    />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="icon icon--orange">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <p class="recipe__info-data">${this._data.cookingTime}</p>
      <p class="recipe__info-unit">minutes</p>
    </div>

    <div class="recipe__info">
      <svg class="icon icon--orange">
        <use href="${icons}#icon-users"></use>
      </svg>
      <p class="recipe__info-data">${this._data.servings}</p>
      <p class="recipe__info-unit">servings</p>
    </div>

    <div class="recipe-container__btns">
      <button class="btn btn--servings" data-serve-to=${
        this._data.servings - 1
      }>
        <svg class="icon">
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>

      <button class="btn btn--servings" data-serve-to=${
        this._data.servings + 1
      }>
        <svg class="icon">
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>

    <div class="user--generated ${this._data.key ? '' : 'hidden'}">
      <svg class="icon">
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>

    <button class="btn btn--bookmark">
      <svg class="icon">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>
  <div class="recipe-ingredients">
    <h1 class="heading-2">recipe ingredients</h1>
    <ul class="recipe-ingredients__list">
    ${this._generateIngredients()}
    </ul>
  </div>
  <div class="recipe-directions">
    <h1 class="heading-2">how to cook it</h1>
    <p>
      This recipe was carefully designed and tested by
      <strong>${this._data.publisher}</strong>. Please check out directions at
      their website.
    </p>
    <a class="btn btn--orange recipe-directions__btn" href="${
      this._data.sourceUrl
    }" target="_blank">
      <span>directions</span>
      <svg class="icon icon--white">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
    `;
  }

  addHandlerLoad(handler) {
    const arr = ['hashchange', 'load'];
    arr.forEach(event => window.addEventListener(event, handler));
  }

  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--servings');
      if (!btn) return;
      const serveTo = +btn.dataset.serveTo;
      if (serveTo > 0 && serveTo < 1000) handler(serveTo);
    });
  }

  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
}

export default new RecipeView();
