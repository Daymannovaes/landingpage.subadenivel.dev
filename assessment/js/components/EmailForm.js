export class EmailForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
    this.element = null;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'email-form-container';

    container.innerHTML = `
      <div class="email-form-overlay"></div>
      <div class="email-form-modal">
        <button type="button" class="close-button" aria-label="Fechar">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div class="email-form-header">
          <div class="unlock-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
            </svg>
          </div>
          <h3>Desbloqueie sua análise completa</h3>
          <p>Receba dicas personalizadas, recomendações de livros e um plano de desenvolvimento.</p>
        </div>

        <form class="email-form" id="emailForm">
          <div class="form-group">
            <label for="name">Nome (opcional)</label>
            <input type="text" id="name" name="name" placeholder="Seu nome" />
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" placeholder="seu@email.com" required />
          </div>

          <button type="submit" class="submit-button">
            Desbloquear resultados
          </button>

          <p class="privacy-note">
            Seus dados estão seguros. Não enviamos spam.
          </p>
        </form>
      </div>
    `;

    const form = container.querySelector('#emailForm');
    const closeBtn = container.querySelector('.close-button');
    const overlay = container.querySelector('.email-form-overlay');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const email = formData.get('email');
      const name = formData.get('name') || '';

      if (email) {
        this.handleSubmit(email, name);
      }
    });

    closeBtn.addEventListener('click', () => this.close());
    overlay.addEventListener('click', () => this.close());

    this.element = container;
    return container;
  }

  handleSubmit(email, name) {
    // Store the email (could be sent to a backend in the future)
    localStorage.setItem('assessment_email', email);
    if (name) {
      localStorage.setItem('assessment_name', name);
    }

    if (this.onSubmit) {
      this.onSubmit(email, name);
    }

    this.close();
  }

  show() {
    if (this.element) {
      this.element.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.element) {
      this.element.classList.remove('visible');
      document.body.style.overflow = '';
    }
  }
}
