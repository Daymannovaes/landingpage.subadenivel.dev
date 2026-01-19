import { ratingLabels } from '../data/questions.js';

export class QuestionCard {
  constructor(question, onSelect, initialValue = null) {
    this.question = question;
    this.onSelect = onSelect;
    this.selectedValue = initialValue;
    this.element = null;
  }

  render() {
    const card = document.createElement('div');
    card.className = 'question-card';
    card.dataset.questionId = this.question.id;

    const questionText = document.createElement('p');
    questionText.className = 'question-text';
    questionText.textContent = this.question.text;
    card.appendChild(questionText);

    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating-container';

    for (let i = 1; i <= 5; i++) {
      const button = document.createElement('button');
      button.className = 'rating-button';
      if (this.selectedValue === i) {
        button.classList.add('active');
      }
      button.dataset.value = i;
      button.setAttribute('type', 'button');
      button.setAttribute('aria-label', ratingLabels[i]);
      button.setAttribute('title', ratingLabels[i]);

      const number = document.createElement('span');
      number.className = 'rating-number';
      number.textContent = i;
      button.appendChild(number);

      button.addEventListener('click', () => this.handleSelect(i, ratingContainer));
      ratingContainer.appendChild(button);
    }

    const labelsRow = document.createElement('div');
    labelsRow.className = 'rating-labels';
    labelsRow.innerHTML = `
      <span>Discordo</span>
      <span>Concordo</span>
    `;

    card.appendChild(ratingContainer);
    card.appendChild(labelsRow);

    this.element = card;
    return card;
  }

  handleSelect(value, container) {
    this.selectedValue = value;

    const buttons = container.querySelectorAll('.rating-button');
    buttons.forEach(btn => {
      btn.classList.remove('active');
      if (parseInt(btn.dataset.value) === value) {
        btn.classList.add('active');
      }
    });

    if (this.onSelect) {
      this.onSelect(this.question.id, value);
    }
  }

  getValue() {
    return this.selectedValue;
  }
}
