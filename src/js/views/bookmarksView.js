import previewView from './previewView.js';
import View from './view.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');

  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join('');
  }

  addHandlerLoad(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
