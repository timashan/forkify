import View from './view.js';
import icons from 'url:../../img/icons.svg';

class previewView extends View {
  _generateMarkup() {
    const id = location.hash.slice(1);
    return `
      <li class="preview">
      <a class="preview__link ${
        this._data.id === id ? 'preview__link--active' : ''
      }" href="#${this._data.id}">
        <div class="preview__img">
          <img
            alt="${this._data.title}"
            src="${this._data.imageUrl}"
          />
        </div>

        <div class="preview__data">
          <p class="preview__title">
          ${this._data.title}
          </p>
          <p class="preview__publisher">${this._data.publisher}</p>
        </div>
        <div class="preview__user--generated ${this._data.key ? '' : 'hidden'}">
          <svg class="icon">
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </a>
    </li>
      `;
  }
}

export default new previewView();
