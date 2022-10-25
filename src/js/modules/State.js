export default class State {
  constructor() {
    this.appStateTemplate = [
      {
        name: 'todo',
        items: [],
      },
      {
        name: 'inprogress',
        items: [],
      },
      {
        name: 'done',
        items: [],
      },
    ];

    this.appState = this.appStateTemplate;
    this.cardLists = [...document.querySelectorAll('.app__card-list')];

    this.init();

    window.addEventListener('unload', () => {
      this.setState();
    });
  }

  setState() {
    this.appState = this.appStateTemplate;
    this.cardLists.forEach((list) => {
      this.appState.forEach((section) => {
        if (section.name === list.closest('.app__section').id) {
          console.log(section);
          if (list.children.length > 0) {
            [...list.querySelectorAll('.app__card')].forEach((card) => {
              section.items.push({ text: `${card.textContent}` });
            });
          }
        }
      });
    });

    localStorage.setItem('appState', JSON.stringify(this.appState));
  }

  getState() {
    if (localStorage.getItem('appState') !== null) {
      const storage = JSON.parse(localStorage.getItem('appState'));
      this.appState = [...storage];
    }
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

  addCard(list, value) {
    list.appendChild(this.constructor.renderCard(value));
  }

  init() {
    this.getState();
    this.appState.forEach((section) => {
      this.cardLists.forEach((list) => {
        if (section.name === list.closest('.app__section').id) {
          section.items.forEach((item) => {
            this.addCard(list, `${item.text}`);
          });
        }
      });
    });
  }
}
