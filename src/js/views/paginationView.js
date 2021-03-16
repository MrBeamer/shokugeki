import View from './View.js';
import icons from 'url:../../img/icons.svg'; // parcel to replace icons with parcel icons, then put in the src of the images html

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numbPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    if (currentPage === 1 && numbPages > 1) {
      return this._generateMarkupPreviewRight();
    }

    if (currentPage === numbPages && numbPages > 1) {
      return this._generateMarkupPreviewLeft();
    }

    if (currentPage < numbPages) {
      const part1 = this._generateMarkupPreviewRight();
      const part2 = this._generateMarkupPreviewLeft();
      return part1 + part2;
    }
  }
  _generateMarkupPreviewLeft(recipe) {
    return `
      <button data-goto="${
        this._data.page - 1
      }"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
          </button`;
  }
  _generateMarkupPreviewRight(recipe) {
    return `
    <button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
          <span>Page ${this._data.page + 1}</span>
          <svg class="search__icon">
            <use href="src/img/${icons}#icon-arrow-right"></use>
          </svg>
        </button>`;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline');
      if (!button) return;
      const goToPage = Number(button.dataset.goto);
      if (button.classList.contains('pagination__btn--next')) {
        handler(goToPage);
      }
      if (button.classList.contains('pagination__btn--prev')) {
        handler(goToPage);
      }
    });
  }
}
export default new PaginationView();
