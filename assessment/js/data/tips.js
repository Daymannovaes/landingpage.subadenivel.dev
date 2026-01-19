export const tips = {
  'dev-architecture': {
    low: [
      'Comece estudando os fundamentos de modelagem de dados e relacionamentos entre entidades',
      'Pratique criando pequenos projetos CRUD que envolvam múltiplas tabelas relacionadas',
      'Estude os princípios SOLID, começando pelo Single Responsibility Principle',
      'Leia sobre padrões de projeto básicos como Factory e Strategy'
    ],
    medium: [
      'Aprofunde-se em Clean Architecture e Domain-Driven Design',
      'Pratique refatoração em projetos reais - identifique code smells e aplique correções',
      'Estude técnicas avançadas como Event Sourcing e CQRS',
      'Participe de code reviews ativamente, tanto dando quanto recebendo feedback'
    ],
    high: [
      'Compartilhe seu conhecimento através de tech talks ou artigos',
      'Mentore desenvolvedores menos experientes em boas práticas de arquitetura',
      'Explore arquiteturas emergentes e avalie sua aplicabilidade',
      'Contribua para projetos open source que demandem decisões arquiteturais'
    ]
  },
  'tests': {
    low: [
      'Comece escrevendo testes unitários simples para funções puras',
      'Aprenda sobre a pirâmide de testes e quando usar cada tipo',
      'Estude TDD com exemplos práticos simples',
      'Familiarize-se com frameworks de teste da sua stack (Jest, JUnit, pytest, etc.)'
    ],
    medium: [
      'Domine técnicas de mocking e stubbing para testes de integração',
      'Aprenda sobre mutation testing e como medir qualidade dos testes',
      'Pratique property-based testing para casos mais complexos',
      'Estude estratégias de teste para sistemas distribuídos'
    ],
    high: [
      'Implemente estratégias de teste em pipelines de CI/CD',
      'Defina padrões e guidelines de testes para seu time',
      'Explore técnicas avançadas como contract testing',
      'Ensine boas práticas de testes para outros desenvolvedores'
    ]
  },
  'integrations': {
    low: [
      'Estude os fundamentos de APIs REST e comunicação HTTP',
      'Aprenda sobre padrões de comunicação síncrona vs assíncrona',
      'Familiarize-se com conceitos básicos de filas de mensagens (RabbitMQ, SQS)',
      'Entenda os conceitos de retry e timeout em integrações'
    ],
    medium: [
      'Aprofunde-se em padrões como Circuit Breaker e Bulkhead',
      'Estude event-driven architecture e seus trade-offs',
      'Pratique implementar idempotência em operações críticas',
      'Aprenda sobre observabilidade: logs, métricas e tracing distribuído'
    ],
    high: [
      'Desenhe arquiteturas resilientes para sistemas de alta disponibilidade',
      'Implemente chaos engineering para testar resiliência',
      'Defina SLOs e SLIs para os sistemas que você mantém',
      'Compartilhe conhecimento sobre padrões de resiliência com o time'
    ]
  },
  'strategic-thinking': {
    low: [
      'Pratique documentar suas decisões técnicas e os motivos por trás delas',
      'Antes de implementar, liste prós e contras das abordagens possíveis',
      'Busque entender o contexto de negócio das features que desenvolve',
      'Faça perguntas sobre requisitos antes de começar a implementar'
    ],
    medium: [
      'Desenvolva o hábito de pensar em impactos de longo prazo',
      'Pratique fazer estimativas e depois compare com o resultado real',
      'Estude técnicas de análise de requisitos e discovery',
      'Participe ativamente de discussões de produto e arquitetura'
    ],
    high: [
      'Lidere discussões de arquitetura e decisões técnicas estratégicas',
      'Crie ADRs (Architecture Decision Records) para documentar decisões importantes',
      'Mentore outros desenvolvedores em pensamento estratégico',
      'Desenvolva visão sistêmica conectando decisões técnicas a objetivos de negócio'
    ]
  },
  'communication': {
    low: [
      'Pratique explicar conceitos técnicos usando analogias simples',
      'Documente seu código e decisões de forma clara e concisa',
      'Peça feedback sobre suas comunicações escritas',
      'Observe como comunicadores eficazes estruturam suas mensagens'
    ],
    medium: [
      'Aprenda a adaptar sua comunicação para diferentes audiências',
      'Pratique apresentar trade-offs de forma objetiva sem jargão excessivo',
      'Desenvolva habilidades de facilitação em discussões técnicas',
      'Crie documentações que sirvam como referência para o time'
    ],
    high: [
      'Treine outros em comunicação técnica efetiva',
      'Lidere reuniões e apresentações técnicas com stakeholders diversos',
      'Crie padrões de documentação para o time ou organização',
      'Seja a ponte entre times técnicos e áreas de negócio'
    ]
  },
  'feedback-leadership': {
    low: [
      'Pratique dar feedback específico focando em comportamentos observáveis',
      'Aprenda a receber feedback sem se defender imediatamente',
      'Estude técnicas como SBI (Situação-Comportamento-Impacto)',
      'Busque feedback regularmente sobre seu próprio trabalho'
    ],
    medium: [
      'Desenvolva o hábito de dar feedback regularmente, não só em avaliações formais',
      'Pratique pair programming como forma de mentoria',
      'Aprenda a calibrar a quantidade de direcionamento vs autonomia',
      'Estude diferentes estilos de liderança e quando aplicar cada um'
    ],
    high: [
      'Crie uma cultura de feedback contínuo no seu time',
      'Mentore múltiplos desenvolvedores simultaneamente',
      'Desenvolva programas de onboarding e desenvolvimento técnico',
      'Seja referência em liderança técnica na organização'
    ]
  },
  'productivity': {
    low: [
      'Experimente técnicas como Pomodoro para gerenciar foco',
      'Identifique seus horários de maior produtividade',
      'Aprenda a dizer não para interrupções não urgentes',
      'Use ferramentas para bloquear distrações durante trabalho focado'
    ],
    medium: [
      'Desenvolva sistemas pessoais de organização (GTD, Zettelkasten, etc.)',
      'Aprenda a priorizar tarefas usando frameworks como Eisenhower Matrix',
      'Pratique preparar agendas claras para reuniões que você lidera',
      'Automatize tarefas repetitivas sempre que possível'
    ],
    high: [
      'Ajude o time a melhorar produtividade coletiva',
      'Implemente práticas que reduzam reuniões desnecessárias',
      'Crie processos que maximizem tempo de trabalho profundo',
      'Seja exemplo de equilíbrio entre produtividade e sustentabilidade'
    ]
  }
};

export function getTipsForCategory(categoryId, score) {
  const categoryTips = tips[categoryId];
  if (!categoryTips) return [];

  if (score < 2.5) {
    return categoryTips.low;
  } else if (score < 4) {
    return categoryTips.medium;
  } else {
    return categoryTips.high;
  }
}
