import View from './view.js';

class searchView extends View {
  _parentElement = document.querySelector('.search');

  addEventHandlerSearch(handler) {
    document
      .querySelector('.form-search__btn')
      .addEventListener('click', function (e) {
        e.preventDefault();

        const searchField = document.querySelector('.search__field');
        const query = searchField.value;
        searchField.value = '';
        if (!query) return;
        handler(query);
      });
  }
}

export default new searchView();
