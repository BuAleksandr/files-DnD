export default class AppSection {
  constructor(sectionId) {
    this.section = document.getElementById(sectionId);
    this.cardList = this.section.querySelector('.app__card-list');
    this.openFormBtn = this.section.querySelector('.app__add-card-btn');

    this.addCardForm = this.section.querySelector('.app__form');
    this.addCardTextarea = this.addCardForm.querySelector('.form__textarea');
    this.closeFormBtn = this.addCardForm.querySelector('.close-btn');

    this.section.addEventListener('click', (e) => {
      if (e.target === this.openFormBtn || e.target === this.closeFormBtn) {
        this.toggleForm();
        if (!e.currentTarget.classList.contains('hidden')) {
          this.addCardForm.reset();
          this.addCardTextarea.focus();
        }
      }
    });

    this.addCardForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.addCardTextarea.value !== '') {
        this.addCard(this.addCardTextarea.value);
        e.currentTarget.reset();
        this.toggleForm();
      } else {
        throw new Error('Empty value');
      }
    });
  }

  static renderCard(value) {
    const card = document.createElement('li');
    card.classList.add('app__card');
    card.textContent = `${value}`;

    const closeBtn = document.createElement('a');
    closeBtn.href = '#';
    closeBtn.classList.add('close-btn', 'card__close-btn');
    card.appendChild(closeBtn);

    card.addEventListener('mouseover', () => {
      closeBtn.style.opacity = '1';
    });
    card.addEventListener('mouseout', () => {
      closeBtn.style.opacity = '0';
    });
    closeBtn.addEventListener('click', () => {
      card.remove();
    });
    return card;
  }

  addCard(value) {
    this.cardList.appendChild(this.constructor.renderCard(value));
  }

  toggleForm() {
    this.openFormBtn.classList.toggle('hidden');
    this.addCardForm.classList.toggle('hidden');
  }
}
