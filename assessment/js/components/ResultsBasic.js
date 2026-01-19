export class ResultsBasic {
  constructor(onShowMore) {
    this.onShowMore = onShowMore;
    this.element = null;
  }

  calculateLevel(average) {
    if (average < 2.5) {
      return { level: 'Junior', description: 'Foco nos fundamentos', color: '#3b82f6' };
    } else if (average < 3.5) {
      return { level: 'Pleno', description: 'Desenvolvendo expertise', color: '#22c55e' };
    } else if (average < 4.5) {
      return { level: 'Senior', description: 'Profissional forte', color: '#f59e0b' };
    } else {
      return { level: 'Especialista', description: 'Nível expert', color: '#a855f7' };
    }
  }

  getStrengths(categoryScores) {
    return Object.entries(categoryScores)
      .filter(([_, data]) => data.average >= 3.5)
      .sort((a, b) => b[1].average - a[1].average)
      .slice(0, 3)
      .map(([_, data]) => data.name);
  }

  getWeakCategories(categoryScores) {
    return Object.entries(categoryScores)
      .filter(([_, data]) => data.average < 3.5)
      .length;
  }

  render(averageScore, categoryScores) {
    const container = document.createElement('div');
    container.className = 'results-basic';

    const levelInfo = this.calculateLevel(averageScore);
    const strengths = this.getStrengths(categoryScores);
    const weakCount = this.getWeakCategories(categoryScores);

    container.innerHTML = `
      <div class="results-header">
        <h2>Seu Resultado</h2>
      </div>

      <div class="level-badge" style="--level-color: ${levelInfo.color}">
        <span class="level-name">${levelInfo.level}</span>
        <span class="level-description">${levelInfo.description}</span>
      </div>

      <div class="score-display">
        <span class="score-value">${averageScore.toFixed(1)}</span>
        <span class="score-label">/ 5.0</span>
      </div>

      ${strengths.length > 0 ? `
        <div class="strengths-section">
          <h3>Seus pontos fortes</h3>
          <ul class="strengths-list">
            ${strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${weakCount > 0 ? `
        <div class="teaser-section">
          <div class="teaser-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          </div>
          <p>Você tem oportunidades de melhoria em <strong>${weakCount} ${weakCount === 1 ? 'categoria' : 'categorias'}</strong></p>
        </div>
      ` : ''}

      <div class="locked-preview">
        <div class="locked-content">
          <div class="blur-overlay">
            <p>Dicas personalizadas de melhoria</p>
            <p>Recomendações de livros por área</p>
            <p>Análise detalhada por categoria</p>
          </div>
          <div class="lock-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>
      </div>

      <button type="button" class="show-more-button">
        Ver mais detalhes
      </button>
    `;

    const showMoreBtn = container.querySelector('.show-more-button');
    showMoreBtn.addEventListener('click', () => {
      if (this.onShowMore) {
        this.onShowMore();
      }
    });

    this.element = container;
    return container;
  }
}
