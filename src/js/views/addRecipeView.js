import View from './View.js';
import previewView from './previewView.js';

import icons from 'url:../../img/icons.svg'; // parcel to replace icons with parcel icons, then put in the src of the images html

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _openModalBtn = document.querySelector('.nav__btn--add-recipe');
  _uploadBtn = document.querySelector('.upload__btn');
  _closeModalBtn = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded.';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  _generateMarkup() {}

  _toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._openModalBtn.addEventListener('click', this._toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    [this._closeModalBtn, this._overlay].forEach(element =>
      element.addEventListener('click', this._toggleWindow.bind(this))
    );
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
