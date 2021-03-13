import icons from 'url:../../img/icons.svg'; // parcel to replace icons with parcel icons, then put in the src of the images html

export default class View {
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markUp = `
     <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message = this._errorMessage) {
    const markUp = `
  <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  renderMessage(message = this._message) {
    const markUp = `
  <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-alert-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
