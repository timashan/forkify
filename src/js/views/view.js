import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  _parentElement = '';
  _message = '';
  _error = '';

  _clear() {
    this._parentElement.textContent = '';
  }

  renderSpinner() {
    const html = `
    <div class="spinner">
    <svg class="icon">
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  render(data, render = 'true') {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   throw new Error('No results found ;)');

    this._data = data;

    if (!render) return this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', this._generateMarkup());
  }

  update(data) {
    this._data = data;
    const currentElement = this._parentElement.querySelectorAll('*');
    const newElement = document
      .createRange()
      .createContextualFragment(this._generateMarkup())
      .querySelectorAll('*');

    currentElement.forEach((curEl, i) => {
      const newEl = newElement[i];
      if (
        !curEl.isEqualNode(newEl) &&
        curEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!curEl.isEqualNode(newEl)) {
        [...newEl.attributes].forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  renderError(error = this._error) {
    const html = `
  <div class="msg msg-pale">
    <svg class="icon">
      <use href="${icons}#icon-alert-triangle"></use>
    </svg>
    <span>${error}</span>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }

  renderMessage(message = this._message) {
    const html = `
  <div class="msg msg-green">
    <svg class="icon">
      <use href="${icons}#icon-alert-circle"></use>
    </svg>
    <span>${message}</span>
  </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', html);
  }
}
