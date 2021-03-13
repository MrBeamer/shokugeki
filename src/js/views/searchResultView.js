import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel to replace icons with parcel icons, then put in the src of the images html

class SearchResultView {
  #parentElement = document.querySelector('.results');
  #data;
  renderSearchResults(recipes) {
    this.#data = recipes;
    console.log(this.#data);
    recipes.forEach(recipe => {
      const markUp = this.#generateMarkup(recipe);
      this.#parentElement.insertAdjacentHTML('afterbegin', markUp);
    });
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  #generateMarkup(recipe) {
    return `  <li class="preview">
      <a class="preview__link preview__link--active" href="#23456">
        <figure class="preview__fig">
          <img src="${recipe.image}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title} ...</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }
}

export default new SearchResultView();
