import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel to replace icons with parcel icons, then put in the src of the images html
import previewView from './previewView.js';

class SearchResultView extends View {
  _parentElement = document.querySelector('.results');
  _data;
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new SearchResultView();
