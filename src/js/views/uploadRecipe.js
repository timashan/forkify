import View from './view.js';

class Uploadrecipe extends View {
  _parentElement = document.querySelector('.upload');
  _form = document.querySelector('.upload__form');
  _overlay = document.querySelector('.overlay');
  _message = 'Successfully uploaded!';

  constructor() {
    super();
    this.#addHandlerShowModal();
    this.#addHandlerHideModal();
  }

  toggleModal() {
    this._parentElement.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  #addHandlerShowModal() {
    document
      .querySelector('.nav__btn--add')
      .addEventListener('click', this.toggleModal.bind(this));
  }

  #addHandlerHideModal() {
    document
      .querySelector('.btn--upload__close')
      .addEventListener('click', this.toggleModal.bind(this));
  }

  #upload(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this._parentElement));
  }

  addHandlerupload(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(this));
      handler(data);
    });
  }
}

export default new Uploadrecipe();
