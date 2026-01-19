import { categories } from './data/questions.js';
import { QuestionCard } from './components/QuestionCard.js';
import { ResultsBasic } from './components/ResultsBasic.js';
import { ResultsFull } from './components/ResultsFull.js';
import { EmailForm } from './components/EmailForm.js';

class AssessmentApp {
  constructor() {
    this.answers = {};
    this.questionCards = [];
    this.resultsBasic = null;
    this.resultsFull = null;
    this.emailForm = null;
    this.categoryScores = {};

    // Wizard state
    this.currentQuestionIndex = 0;
    this.flattenedQuestions = [];

    this.init();
  }

  init() {
    this.flattenQuestions();
    this.renderWizard();
    this.initParticles();
  }

  flattenQuestions() {
    this.flattenedQuestions = [];
    categories.forEach(category => {
      category.questions.forEach(question => {
        this.flattenedQuestions.push({
          ...question,
          categoryId: category.id,
          categoryName: category.name,
          categoryIcon: category.icon
        });
      });
    });
  }

  renderWizard() {
    const formContainer = document.getElementById('assessment-form');
    if (!formContainer) return;

    formContainer.innerHTML = '';

    // Progress bar
    const progressSection = document.createElement('div');
    progressSection.className = 'progress-section';
    progressSection.innerHTML = `
      <div class="progress-info">
        <span class="progress-counter" id="progressCounter">1 de ${this.flattenedQuestions.length}</span>
      </div>
      <div class="progress-slider">
        <div class="progress-slider-fill" id="progressSliderFill" style="width: ${(1 / this.flattenedQuestions.length) * 100}%"></div>
      </div>
    `;
    formContainer.appendChild(progressSection);

    // Question wizard container
    const wizardContainer = document.createElement('div');
    wizardContainer.className = 'question-wizard';
    wizardContainer.id = 'questionWizard';
    formContainer.appendChild(wizardContainer);

    // Navigation buttons
    const navSection = document.createElement('div');
    navSection.className = 'nav-buttons';
    navSection.innerHTML = `
      <button type="button" class="nav-button nav-prev" id="prevBtn" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Anterior
      </button>
      <button type="button" class="nav-button nav-next" id="nextBtn" disabled>
        Próxima
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    `;
    formContainer.appendChild(navSection);

    // Submit button (hidden initially)
    const submitSection = document.createElement('div');
    submitSection.className = 'submit-section hidden';
    submitSection.id = 'submitSection';
    submitSection.innerHTML = `
      <button type="submit" class="submit-button" id="submitBtn">
        Ver meu resultado
      </button>
    `;
    formContainer.appendChild(submitSection);

    this.renderCurrentQuestion();
    this.setupNavigation();
  }

  renderCurrentQuestion() {
    const wizardContainer = document.getElementById('questionWizard');
    if (!wizardContainer) return;

    const question = this.flattenedQuestions[this.currentQuestionIndex];

    wizardContainer.innerHTML = '';
    wizardContainer.className = 'question-wizard question-enter';

    // Category label
    const categoryLabel = document.createElement('div');
    categoryLabel.className = 'wizard-category-label';
    categoryLabel.innerHTML = `
      <span class="wizard-category-icon">${question.categoryIcon}</span>
      <span class="wizard-category-name">${question.categoryName}</span>
    `;
    wizardContainer.appendChild(categoryLabel);

    // Question card
    const card = new QuestionCard(question, (questionId, value) => {
      this.answers[questionId] = value;
      this.updateNavState();
      this.autoAdvance();
    }, this.answers[question.id]);

    wizardContainer.appendChild(card.render());

    // Trigger animation
    requestAnimationFrame(() => {
      wizardContainer.classList.remove('question-enter');
    });

    this.updateProgress();
    this.updateNavState();
  }

  autoAdvance() {
    // Auto-advance after a short delay when a question is answered
    if (this.currentQuestionIndex < this.flattenedQuestions.length - 1) {
      setTimeout(() => {
        this.goToNext();
      }, 300);
    } else {
      // Last question - show submit button
      this.showSubmitButton();
    }
  }

  setupNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn?.addEventListener('click', () => this.goToPrev());
    nextBtn?.addEventListener('click', () => this.goToNext());
    submitBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      this.calculateResults();
    });
  }

  goToNext() {
    if (this.currentQuestionIndex < this.flattenedQuestions.length - 1) {
      this.currentQuestionIndex++;
      this.renderCurrentQuestion();
    }
    if (this.currentQuestionIndex === this.flattenedQuestions.length - 1 && this.isCurrentQuestionAnswered()) {
      this.showSubmitButton();
    }
  }

  goToPrev() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.renderCurrentQuestion();
      this.hideSubmitButton();
    }
  }

  isCurrentQuestionAnswered() {
    const question = this.flattenedQuestions[this.currentQuestionIndex];
    return this.answers[question.id] !== undefined;
  }

  isAllQuestionsAnswered() {
    return Object.keys(this.answers).length === this.flattenedQuestions.length;
  }

  updateNavState() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
      prevBtn.disabled = this.currentQuestionIndex === 0;
    }

    if (nextBtn) {
      const isLastQuestion = this.currentQuestionIndex === this.flattenedQuestions.length - 1;
      nextBtn.disabled = !this.isCurrentQuestionAnswered() || isLastQuestion;
    }
  }

  updateProgress() {
    const progressCounter = document.getElementById('progressCounter');
    const progressFill = document.getElementById('progressSliderFill');
    const totalQuestions = this.flattenedQuestions.length;
    const currentNum = this.currentQuestionIndex + 1;

    if (progressCounter) {
      progressCounter.textContent = `${currentNum} de ${totalQuestions}`;
    }

    if (progressFill) {
      const percentage = (currentNum / totalQuestions) * 100;
      progressFill.style.width = `${percentage}%`;
    }
  }

  showSubmitButton() {
    const submitSection = document.getElementById('submitSection');
    const navButtons = document.querySelector('.nav-buttons');
    const submitBtn = document.getElementById('submitBtn');

    if (submitSection) {
      submitSection.classList.remove('hidden');
      if (navButtons) {
        navButtons.classList.add('with-submit');
      }

      const allAnswered = this.isAllQuestionsAnswered();
      if (submitBtn) {
        submitBtn.disabled = !allAnswered;
      }

      // Show remaining questions message if not all answered
      let messageEl = submitSection.querySelector('.remaining-message');
      if (!allAnswered) {
        const remaining = this.flattenedQuestions.length - Object.keys(this.answers).length;
        if (!messageEl) {
          messageEl = document.createElement('p');
          messageEl.className = 'remaining-message';
          submitSection.appendChild(messageEl);
        }
        messageEl.textContent = `Responda as ${remaining} pergunta${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''} para ver seu resultado`;
      } else if (messageEl) {
        messageEl.remove();
      }
    }
  }

  hideSubmitButton() {
    const submitSection = document.getElementById('submitSection');
    const navButtons = document.querySelector('.nav-buttons');

    if (submitSection) {
      submitSection.classList.add('hidden');
    }
    if (navButtons) {
      navButtons.classList.remove('with-submit');
    }
  }

  calculateResults() {
    // Calculate scores per category
    this.categoryScores = {};

    categories.forEach(category => {
      const categoryAnswers = category.questions
        .map(q => this.answers[q.id])
        .filter(a => a !== undefined);

      const sum = categoryAnswers.reduce((acc, val) => acc + val, 0);
      const average = categoryAnswers.length > 0 ? sum / categoryAnswers.length : 0;

      this.categoryScores[category.id] = {
        name: category.name,
        sum,
        count: categoryAnswers.length,
        average
      };
    });

    // Calculate overall average
    const allAnswers = Object.values(this.answers);
    const totalSum = allAnswers.reduce((acc, val) => acc + val, 0);
    const overallAverage = allAnswers.length > 0 ? totalSum / allAnswers.length : 0;

    this.showBasicResults(overallAverage);
  }

  showBasicResults(averageScore) {
    // Hide the form
    const formContainer = document.getElementById('assessment-form');
    if (formContainer) {
      formContainer.style.display = 'none';
    }

    // Show basic results
    const resultsContainer = document.getElementById('results-basic');
    if (resultsContainer) {
      this.resultsBasic = new ResultsBasic(() => this.showEmailForm());
      resultsContainer.innerHTML = '';
      resultsContainer.appendChild(this.resultsBasic.render(averageScore, this.categoryScores));
      resultsContainer.style.display = 'block';

      // Scroll to results
      resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Prepare email form
    const emailContainer = document.getElementById('email-form');
    if (emailContainer) {
      this.emailForm = new EmailForm((email, name) => {
        this.showFullResults(averageScore);
      });
      emailContainer.innerHTML = '';
      emailContainer.appendChild(this.emailForm.render());
    }
  }

  showEmailForm() {
    if (this.emailForm) {
      this.emailForm.show();
    }
  }

  showFullResults(averageScore) {
    // Hide basic results
    const basicContainer = document.getElementById('results-basic');
    if (basicContainer) {
      basicContainer.style.display = 'none';
    }

    // Show full results
    const fullContainer = document.getElementById('results-full');
    if (fullContainer) {
      this.resultsFull = new ResultsFull();
      fullContainer.innerHTML = '';
      fullContainer.appendChild(this.resultsFull.render(averageScore, this.categoryScores));
      fullContainer.style.display = 'block';

      // Scroll to full results
      fullContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 151 };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor(isGolden = false) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.isGolden = isGolden;
        this.size = isGolden ? 3.5 : Math.random() * 2 + 1;
        this.density = Math.random() * 30 + 1;
        this.baseAlpha = isGolden ? 0.7 : Math.random() * 0.5 + 0.1;
        this.alpha = this.baseAlpha;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.003 + 0.001;
        this.floatRadius = Math.random() * 12 + 4;
        this.color = isGolden ? { r: 255, g: 200, b: 50 } : { r: 37, g: 211, b: 102 };
        this.shimmerAngle = 0;
      }

      draw() {
        const { r, g, b } = this.color;

        let glowMultiplier = 1;
        if (this.isGolden) {
          this.shimmerAngle += 0.025;
          glowMultiplier = 1 + Math.sin(this.shimmerAngle) * 0.6;
        }

        let glowRadius = this.isGolden ? this.size * 4 * glowMultiplier : this.size * 3;
        let glowAlpha = this.isGolden ? this.baseAlpha * 0.4 * glowMultiplier : this.baseAlpha * 0.5;

        let gradient = ctx.createRadialGradient(
          this.x, this.y, this.size * 0.5,
          this.x, this.y, glowRadius
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowAlpha})`);
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${glowAlpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        this.angle += this.speed;
        let floatX = Math.cos(this.angle) * this.floatRadius;
        let floatY = Math.sin(this.angle * 0.7) * this.floatRadius;

        if (mouse.x && mouse.y) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density;
          let directionY = forceDirectionY * force * this.density;

          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            let targetX = this.baseX + floatX;
            let targetY = this.baseY + floatY;
            this.x += (targetX - this.x) * 0.05;
            this.y += (targetY - this.y) * 0.05;
          }
        } else {
          let targetX = this.baseX + floatX;
          let targetY = this.baseY + floatY;
          this.x += (targetX - this.x) * 0.02;
          this.y += (targetY - this.y) * 0.02;
        }
      }
    }

    function init() {
      particles = [];
      let numberOfParticles = (canvas.width * canvas.height) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
      particles.push(new Particle(true));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.draw();
        p.update();
      });
      connectParticles();
      requestAnimationFrame(animate);
    }

    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.strokeStyle = `rgba(37, 211, 102, ${0.1 - distance / 1000})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    init();
    animate();
    window.addEventListener('resize', init);
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AssessmentApp();
});
