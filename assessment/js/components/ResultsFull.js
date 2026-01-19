import { getTipsForCategory } from '../data/tips.js';
import { getBooksForCategory } from '../data/books.js';

export class ResultsFull {
  constructor() {
    this.element = null;
  }

  getCategoryStatus(average) {
    if (average < 2.5) {
      return { status: 'needs-attention', label: 'Precisa de atenção', icon: '!' };
    } else if (average < 3.5) {
      return { status: 'developing', label: 'Em desenvolvimento', icon: '~' };
    } else if (average < 4.5) {
      return { status: 'strong', label: 'Ponto forte', icon: '+' };
    } else {
      return { status: 'excellent', label: 'Excelente', icon: '*' };
    }
  }

  renderCategoryBreakdown(categoryScores) {
    return Object.entries(categoryScores)
      .sort((a, b) => a[1].average - b[1].average)
      .map(([id, data]) => {
        const status = this.getCategoryStatus(data.average);
        const percentage = (data.average / 5) * 100;

        return `
          <div class="category-breakdown ${status.status}">
            <div class="category-header">
              <span class="category-name">${data.name}</span>
              <span class="category-score">${data.average.toFixed(1)}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="category-status">${status.label}</span>
          </div>
        `;
      })
      .join('');
  }

  renderTips(categoryScores) {
    const weakCategories = Object.entries(categoryScores)
      .filter(([_, data]) => data.average < 4)
      .sort((a, b) => a[1].average - b[1].average)
      .slice(0, 3);

    if (weakCategories.length === 0) {
      return `
        <div class="tips-section">
          <h3>Dicas de Aprimoramento</h3>
          <p class="no-tips">Parabéns! Você demonstra forte competência em todas as áreas. Continue praticando e compartilhando seu conhecimento!</p>
        </div>
      `;
    }

    return `
      <div class="tips-section">
        <h3>Dicas Personalizadas de Melhoria</h3>
        ${weakCategories.map(([id, data]) => {
          const tips = getTipsForCategory(id, data.average);
          return `
            <div class="tip-category">
              <h4>${data.name}</h4>
              <ul class="tips-list">
                ${tips.slice(0, 3).map(tip => `<li>${tip}</li>`).join('')}
              </ul>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderBooks(categoryScores) {
    // Find the weakest category (lowest average score)
    const sortedCategories = Object.entries(categoryScores)
      .sort((a, b) => a[1].average - b[1].average);

    if (sortedCategories.length === 0) {
      return '';
    }

    const [weakestCategoryId, weakestCategoryData] = sortedCategories[0];
    const books = getBooksForCategory(weakestCategoryId);

    if (!books || books.length === 0) {
      return '';
    }

    // Get the first book from the weakest category
    const recommendedBook = books[0];

    return `
      <div class="books-section">
        <h3>Leitura Recomendada</h3>
        <p class="book-context">Baseado na sua maior oportunidade de melhoria em <strong>${weakestCategoryData.name}</strong>:</p>
        <div class="book-card book-card-featured">
          <div class="book-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <h4 class="book-title">${recommendedBook.title}</h4>
          <p class="book-author">${recommendedBook.author}</p>
          <p class="book-description">${recommendedBook.description}</p>
        </div>
      </div>
    `;
  }

  render(averageScore, categoryScores) {
    const container = document.createElement('div');
    container.className = 'results-full';

    container.innerHTML = `
      <div class="full-results-header">
        <h2>Análise Completa</h2>
        <p>Veja seu desempenho detalhado em cada categoria</p>
      </div>

      <div class="categories-breakdown">
        <h3>Desempenho por Categoria</h3>
        ${this.renderCategoryBreakdown(categoryScores)}
      </div>

      ${this.renderTips(categoryScores)}

      ${this.renderBooks(categoryScores)}

      <div class="cta-section">
        <p>Quer acelerar seu desenvolvimento profissional?</p>
        <a href="https://wa.link/tis8y8" class="cta-button">
          <img src="../uatzap.png" alt="WhatsApp" class="cta-icon" />
          Fale comigo sobre mentoria
        </a>
      </div>
    `;

    this.element = container;
    return container;
  }
}
