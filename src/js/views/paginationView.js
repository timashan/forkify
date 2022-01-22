import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const page = +this._data.page;
    const pages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (page === 1 && pages > 1) return this.#generateBtn();

    if (page === pages && pages > 1) return this.#generateBtn(false);

    if (page !== 1) return `${this.#generateBtn(false)}${this.#generateBtn()}`;

    return '';
  }

  #generateBtn(forward = true) {
    let page = this._data.page;
    const goto = forward ? ++page : --page;
    return `
    <button class="btn search-results__btn" data-goto="${goto}">${goto} page</button>
        `;
  }

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.search-results__btn');
      if (!btn) return;
      handler(btn.dataset.goto);
    });
  }
}

export default new PaginationView();
