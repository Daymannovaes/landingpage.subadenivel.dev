export const books = {
  'dev-architecture': [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      description: 'Fundamentos essenciais para escrever código limpo e manutenível'
    },
    {
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      description: 'Princípios e padrões para criar arquiteturas de software flexíveis'
    },
    {
      title: 'Refactoring',
      author: 'Martin Fowler',
      description: 'Técnicas para melhorar o design de código existente'
    }
  ],
  'tests': [
    {
      title: 'Test Driven Development',
      author: 'Kent Beck',
      description: 'O guia definitivo para TDD pelo criador da metodologia'
    },
    {
      title: 'Unit Testing Principles, Practices, and Patterns',
      author: 'Vladimir Khorikov',
      description: 'Práticas modernas para testes efetivos e manuteníveis'
    }
  ],
  'integrations': [
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      description: 'Fundamentos de sistemas distribuídos e processamento de dados'
    },
    {
      title: 'Release It!',
      author: 'Michael Nygard',
      description: 'Padrões de design e deploy para sistemas resilientes em produção'
    }
  ],
  'strategic-thinking': [
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas & Andrew Hunt',
      description: 'Filosofia e práticas para se tornar um programador mais efetivo'
    },
    {
      title: 'Staff Engineer',
      author: 'Will Larson',
      description: 'Guia para liderança técnica além do cargo de gerência'
    }
  ],
  'communication': [
    {
      title: "The Staff Engineer's Path",
      author: 'Tanya Reilly',
      description: 'Navegando a carreira técnica com foco em impacto e comunicação'
    },
    {
      title: 'Crucial Conversations',
      author: 'Patterson, Grenny, McMillan & Switzler',
      description: 'Ferramentas para diálogos difíceis e de alto impacto'
    }
  ],
  'feedback-leadership': [
    {
      title: 'Radical Candor',
      author: 'Kim Scott',
      description: 'Como ser um líder que se importa pessoalmente e desafia diretamente'
    },
    {
      title: "The Manager's Path",
      author: 'Camille Fournier',
      description: 'Guia para liderança técnica em todas as fases da carreira'
    }
  ],
  'productivity': [
    {
      title: 'Deep Work',
      author: 'Cal Newport',
      description: 'Regras para foco em um mundo distraído'
    },
    {
      title: 'Getting Things Done',
      author: 'David Allen',
      description: 'O método clássico de produtividade pessoal'
    }
  ]
};

export function getBooksForCategory(categoryId) {
  return books[categoryId] || [];
}
