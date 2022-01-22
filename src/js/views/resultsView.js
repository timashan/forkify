import View from './view.js';
import previewView from './previewView.js';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _error = 'No results found';

  _generateMarkup() {
    return this._data.map(recipe => previewView.render(recipe, false)).join('');
  }
}

export default new resultsView();
