export const categories = [
  {
    id: 'dev-architecture',
    name: 'Desenvolvimento & Arquitetura',
    icon: '01',
    questions: [
      {
        id: 1,
        text: 'Eu sou capaz de desenvolver um cadastro pela web que possui um ou mais relacionamentos de muitos para um entre as entidades'
      },
      {
        id: 2,
        text: 'Eu sou capaz de desenvolver um cadastro pela web que possui um ou mais relacionamentos de muitos para muitos entre as entidades'
      },
      {
        id: 3,
        text: 'Eu sou capaz de utilizar técnicas de desenvolvimento que deixam o código mais flexível quando necessário. Ex: Polimorfismo, Inversão de dependência etc.'
      },
      {
        id: 4,
        text: 'Eu sou capaz de utilizar uma arquitetura em camadas como Clean Arch analisando no detalhe os requisitos necessários'
      },
      {
        id: 5,
        text: 'Eu sou capaz de distribuir a complexidade do sistemas pelas unidades(arquivos, funções, classes) de maneira sistemática'
      },
      {
        id: 6,
        text: 'Eu sou capaz de identificar pontos necessários de refatoração de qualquer código que seja apresentado para mim'
      }
    ]
  },
  {
    id: 'tests',
    name: 'Testes',
    icon: '02',
    questions: [
      {
        id: 7,
        text: 'Eu sou capaz de identificar quais são os testes necessários para qualquer código que seja apresentado para mim'
      },
      {
        id: 8,
        text: 'Eu sou capaz de imaginar quais testes são necessários só de ver a descrição de uma funcionalidade'
      },
      {
        id: 9,
        text: 'Eu sou capaz de utilizar técnicas de testes que vão além da básica de cobertura de linhas'
      },
      {
        id: 10,
        text: 'Eu sou capaz de utilizar uma biblioteca de mock para facilitar a escrita de testes de integração com sistemas externos'
      }
    ]
  },
  {
    id: 'integrations',
    name: 'Integrações & Resiliência',
    icon: '03',
    questions: [
      {
        id: 11,
        text: 'Eu sou capaz de realizar integrações entre sistemas de maneira assíncrona via http'
      },
      {
        id: 12,
        text: 'Eu sou capaz de realizar integrações entre sistemas de maneira assíncrona via sistemas de mensageria'
      },
      {
        id: 13,
        text: 'Eu sou capaz de escrever sistemas que tratem a resiliência como cidadã de primeiro nível'
      }
    ]
  },
  {
    id: 'strategic-thinking',
    name: 'Pensamento Estratégico & Tomada de Decisão',
    icon: '04',
    questions: [
      {
        id: 14,
        text: 'Eu sou capaz de julgar o nível de flexibilidade necessário para uma implementação dada as variáveis que são apresentadas para mim pelas pessoas que representam ou são as donas do produto'
      },
      {
        id: 15,
        text: 'Eu sou capaz de pensar sistemicamente, antecipando impactos das decisões técnicas em equipes, produtos e longo prazo'
      },
      {
        id: 16,
        text: 'Eu sou capaz de tomar decisões mesmo sob incerteza, assumindo responsabilidade pelos resultados'
      },
      {
        id: 17,
        text: 'Eu sou capaz de transformar requisitos vagos em problemas bem definidos, fazendo perguntas estruturadas'
      }
    ]
  },
  {
    id: 'communication',
    name: 'Comunicação & Documentação',
    icon: '05',
    questions: [
      {
        id: 18,
        text: 'Eu sou capaz de explicar trade-offs técnicos (custo x benefício x risco) de forma objetiva'
      },
      {
        id: 19,
        text: 'Eu sou capaz de comunicar decisões técnicas de forma clara, tanto para pessoas técnicas quanto não técnicas'
      },
      {
        id: 20,
        text: 'Eu sou capaz de fazer documentações técnicas que sejam compreensíveis'
      },
      {
        id: 21,
        text: 'Eu sou capaz de negociar prioridades com PMs, designers e stakeholders sem gerar conflitos desnecessários'
      }
    ]
  },
  {
    id: 'feedback-leadership',
    name: 'Feedback & Liderança',
    icon: '06',
    questions: [
      {
        id: 22,
        text: 'Eu sou capaz de dar feedback construtivo, específico e orientado a comportamento, não a julgamento pessoal'
      },
      {
        id: 23,
        text: 'Eu sou capaz de receber feedback sem frustração, usando-o para melhorar decisões e comportamentos'
      },
      {
        id: 24,
        text: 'Eu sou capaz de mentorar desenvolvedores menos experientes, ajudando-os a crescer sem microgerenciar'
      }
    ]
  },
  {
    id: 'productivity',
    name: 'Produtividade & Gestão',
    icon: '07',
    questions: [
      {
        id: 25,
        text: 'Eu sou capaz de gerenciar meu próprio tempo e foco, evitando sobrecarga, interrupções desnecessárias, e também a procrastinação'
      },
      {
        id: 26,
        text: 'Eu sou capaz de conduzir reuniões produtivas, começando e terminando com objetivos claros'
      }
    ]
  }
];

export const ratingLabels = {
  1: 'Discordo totalmente',
  2: 'Discordo parcialmente',
  3: 'Neutro',
  4: 'Concordo parcialmente',
  5: 'Concordo totalmente'
};
