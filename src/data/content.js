/**
 * Fonte única de conteúdo do portfólio, em PT e EN.
 *
 * Os textos seguem os currículos ATS (curriculo-lucas-melare-pt.pdf e
 * resume-lucas-melare-en.pdf, em /public): ao atualizar o currículo, atualize aqui
 * também para os dois ficarem coerentes.
 */

export const RESUME_PT = '/curriculo-lucas-melare-pt.pdf';
export const RESUME_EN = '/resume-lucas-melare-en.pdf';

export const LINKS = {
  linkedin: 'https://www.linkedin.com/in/lucasmelare/',
  github: 'https://github.com/melanolachef',
  email: 'lnmelare@gmail.com',
};

export const MENU_ITEMS = [
  { id: 'status', label: 'STATUS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'quests', label: 'QUESTS' },
  { id: 'system', label: 'SYSTEM' },
];

const pt = {
  htmlLang: 'pt-BR',
  title: { name: 'LUCAS', subtitle: 'PORTFÓLIO', prompt: 'PRESSIONE PARA COMEÇAR' },
  ui: {
    back: '◄ VOLTAR AO MENU',
    menuLabel: 'Menu principal',
    hint: 'Use ↑ ↓ para navegar e Enter para confirmar',
    soundOn: 'Som ligado',
    soundOff: 'Som desligado',
    langLabel: 'Mudar para inglês',
    ambienceOn: 'Ambiente da Dark Hour ligado',
    ambienceOff: 'Ambiente da Dark Hour desligado',
  },
  status: {
    name: 'LUCAS N. MELARÉ COELHO',
    class: 'Classe: Analista de Dados · Analytics Engineer · Analista de BI',
    location: 'Sorocaba, SP · Brasil',
    bio: 'Analista de dados com atuação diária em SQL avançado, Python e Power BI, responsável pela integridade e pela qualidade dos dados de uma plataforma de gestão de inspeções de turbinas eólicas. Experiência prática em ETL, modelagem de dados, automação de rotinas de banco e validação de qualidade de dados em produção.',
    guildLabel: 'GUILDA ATUAL',
    historyLabel: 'HISTÓRICO',
    academicsLabel: 'FORMAÇÃO',
    languagesLabel: 'IDIOMAS',
    guild: {
      org: 'ArthWind Technologies',
      role: 'Assistente de Análise e Automação de Dados II',
      period: 'abr 2026 – atual',
      note: 'Sorocaba, SP · Híbrido',
      bullets: [
        'Integridade e qualidade dos dados da plataforma Arthnex (inspeção de pás de turbinas eólicas), com correção de registros em SQL avançado.',
        'Scripts de migração e correção em produção sem indisponibilidade, e rotinas de manutenção automatizadas em TypeScript.',
        'Validação de qualidade de dados de novas features antes do release, com documentação dos achados.',
      ],
    },
    history: [
      { org: 'Rei dos Motores', role: 'Estagiário de TI', period: 'abr 2025 – mar 2026' },
      { org: 'Centro Universitário FACENS', role: 'Aluno Monitor de Estrutura de Dados', period: 'mar 2025 – set 2025' },
    ],
    academics: [
      { course: 'Pós-graduação em Data Analytics', org: 'FIAP', period: 'mar 2026 – fev 2027', state: 'EM ANDAMENTO' },
      { course: 'Análise e Desenvolvimento de Sistemas', org: 'FACENS', period: 'ago 2023 – dez 2025', state: 'CONCLUÍDO' },
    ],
    languages: 'Português (nativo) · Inglês (avançado)',
  },
  skills: {
    partyLabel: 'PARTY PRINCIPAL',
    arsenalLabel: 'ARSENAL',
    party: [
      { id: 'sql', name: 'SQL AVANÇADO', level: 48, hp: 92, sp: 85, tag: 'Joins · CTEs · Agregações' },
      { id: 'python', name: 'PYTHON / PANDAS', level: 44, hp: 88, sp: 80, tag: 'ETL · Análise exploratória' },
      { id: 'powerbi', name: 'POWER BI / DAX', level: 42, hp: 85, sp: 82, tag: 'Dashboards · KPIs' },
      { id: 'etl', name: 'ENGENHARIA ANALÍTICA', level: 40, hp: 82, sp: 78, tag: 'Medallion · Modelagem' },
      { id: 'ts', name: 'TYPESCRIPT / REACT', level: 38, hp: 78, sp: 70, tag: 'NestJS · Next.js · APIs' },
      { id: 'spark', name: 'PYSPARK / DATABRICKS', level: 34, hp: 70, sp: 75, tag: 'Delta Lake · Em evolução' },
    ],
    arsenal: [
      'AWS (S3, Glue, Athena)', 'MySQL', 'Delta Lake', 'NumPy', 'Streamlit',
      'Java 21 / Spring Boot', 'Git & GitHub', 'Firebase', 'Excel avançado',
      'Estatística e probabilidade', 'Claude Code', 'Documentação técnica',
    ],
  },
  quests: {
    statusLabels: { active: 'EM ANDAMENTO', cleared: 'CONCLUÍDA' },
    rewardLabel: 'RECOMPENSA / TECH',
    clientLabel: 'Cliente',
    list: [
      {
        id: 'arthnex',
        title: 'Arthnex · Data Quality',
        client: 'ArthWind Technologies',
        state: 'active',
        techs: 'SQL • TypeScript • NestJS',
        desc: 'Integridade e qualidade dos dados da plataforma de inspeção de pás de turbinas eólicas: investigação de inconsistências, correção de registros em produção e validação de qualidade antes de cada release.',
      },
      {
        id: 'medallion',
        title: 'Pipeline Medallion na AWS',
        client: 'Tech Challenge FIAP',
        state: 'cleared',
        techs: 'AWS Glue • S3 • Athena • SQL',
        desc: 'Pipeline raw → bronze → silver → gold sobre três edições da pesquisa State of Data Brazil, com modelagem das camadas e consultas analíticas em SQL.',
      },
      {
        id: 'esports',
        title: 'Pipeline Analítico de E-sports',
        client: 'Projeto open source',
        state: 'cleared',
        techs: 'Python • Riot API • Streamlit',
        desc: 'ETL end-to-end consumindo a Riot Games API (paginação e payloads JSON), tratamento em Python e cálculo de KPIs (win rate ponderado, KDA, CS/min, dano/min) em dashboard Streamlit.',
      },
      {
        id: 'cblol',
        title: 'Pipeline de Dados do CBLOL',
        client: 'Projeto pessoal',
        state: 'active',
        techs: 'PySpark • Delta Lake • Databricks',
        desc: 'Pipeline de dados do campeonato brasileiro de League of Legends em PySpark e Delta Lake, com camada analítica publicada em Power BI.',
      },
      {
        id: 'itam',
        title: 'Sistema ITAM',
        client: 'Rei dos Motores',
        state: 'cleared',
        techs: 'Java 21 • Spring Boot • MySQL',
        desc: 'Gestão de ativos de TI em produção, com indicadores em tempo real de equipamentos disponíveis, em uso e em manutenção, e controle de acesso por nível de permissão — substituindo o controle por planilhas.',
      },
      {
        id: 'automation',
        title: 'Automação de Documentos',
        client: 'Rei dos Motores',
        state: 'cleared',
        techs: 'Power BI • Apps Script • Forms',
        desc: 'Dashboards interativos em Power BI com DAX e dados em tempo real, e geração automática de documentos corporativos integrando Google Forms e Apps Script.',
      },
    ],
  },
  system: {
    saveDataPt: { label: 'SAVE DATA', sub: 'Baixar currículo (PT)' },
    saveDataEn: { label: 'SAVE DATA', sub: 'Download resume (EN)' },
    network: { label: 'NETWORK', sub: 'LinkedIn' },
    source: { label: 'SOURCE', sub: 'GitHub' },
    comms: { label: 'COMMS', sub: 'E-mail' },
  },
};

const en = {
  htmlLang: 'en',
  title: { name: 'LUCAS', subtitle: 'PORTFOLIO', prompt: 'PRESS TO START' },
  ui: {
    back: '◄ BACK TO MENU',
    menuLabel: 'Main menu',
    hint: 'Use ↑ ↓ to navigate and Enter to confirm',
    soundOn: 'Sound on',
    soundOff: 'Sound off',
    langLabel: 'Switch to Portuguese',
    ambienceOn: 'Dark Hour ambience on',
    ambienceOff: 'Dark Hour ambience off',
  },
  status: {
    name: 'LUCAS N. MELARÉ COELHO',
    class: 'Class: Data Analyst · Analytics Engineer · BI Analyst',
    location: 'Sorocaba, SP · Brazil',
    bio: 'Data analyst working daily with advanced SQL, Python and Power BI, accountable for data integrity and data quality on a wind turbine blade inspection platform. Hands-on with ETL, data modeling, database automation and production data quality validation.',
    guildLabel: 'CURRENT GUILD',
    historyLabel: 'PREVIOUS RUNS',
    academicsLabel: 'EDUCATION',
    languagesLabel: 'LANGUAGES',
    guild: {
      org: 'ArthWind Technologies',
      role: 'Data Analysis and Automation Assistant II',
      period: 'Apr 2026 – Present',
      note: 'Sorocaba, Brazil · Hybrid',
      bullets: [
        'Accountable for data integrity and quality on Arthnex (wind turbine blade inspection platform), correcting records with advanced SQL.',
        'Data migration and remediation scripts against production with no downtime, plus automated maintenance routines in TypeScript.',
        'Data quality validation on new features before release, with documented test findings.',
      ],
    },
    history: [
      { org: 'Rei dos Motores', role: 'IT Intern', period: 'Apr 2025 – Mar 2026' },
      { org: 'FACENS University Center', role: 'Teaching Assistant, Data Structures', period: 'Mar 2025 – Sep 2025' },
    ],
    academics: [
      { course: 'Postgraduate Certificate in Data Analytics', org: 'FIAP', period: 'Mar 2026 – Feb 2027', state: 'IN PROGRESS' },
      { course: 'B.Tech, Systems Analysis and Development', org: 'FACENS', period: 'Aug 2023 – Dec 2025', state: 'COMPLETED' },
    ],
    languages: 'Portuguese (native) · English (advanced)',
  },
  skills: {
    partyLabel: 'MAIN PARTY',
    arsenalLabel: 'ARSENAL',
    party: [
      { id: 'sql', name: 'ADVANCED SQL', level: 48, hp: 92, sp: 85, tag: 'Joins · CTEs · Aggregations' },
      { id: 'python', name: 'PYTHON / PANDAS', level: 44, hp: 88, sp: 80, tag: 'ETL · Exploratory analysis' },
      { id: 'powerbi', name: 'POWER BI / DAX', level: 42, hp: 85, sp: 82, tag: 'Dashboards · KPIs' },
      { id: 'etl', name: 'ANALYTICS ENGINEERING', level: 40, hp: 82, sp: 78, tag: 'Medallion · Data modeling' },
      { id: 'ts', name: 'TYPESCRIPT / REACT', level: 38, hp: 78, sp: 70, tag: 'NestJS · Next.js · APIs' },
      { id: 'spark', name: 'PYSPARK / DATABRICKS', level: 34, hp: 70, sp: 75, tag: 'Delta Lake · Levelling up' },
    ],
    arsenal: [
      'AWS (S3, Glue, Athena)', 'MySQL', 'Delta Lake', 'NumPy', 'Streamlit',
      'Java 21 / Spring Boot', 'Git & GitHub', 'Firebase', 'Advanced Excel',
      'Statistics and probability', 'Claude Code', 'Technical writing',
    ],
  },
  quests: {
    statusLabels: { active: 'IN PROGRESS', cleared: 'CLEARED' },
    rewardLabel: 'REWARD / TECH',
    clientLabel: 'Client',
    list: [
      {
        id: 'arthnex',
        title: 'Arthnex · Data Quality',
        client: 'ArthWind Technologies',
        state: 'active',
        techs: 'SQL • TypeScript • NestJS',
        desc: 'Data integrity and quality on the wind turbine blade inspection platform: investigating inconsistencies, correcting production records and validating data quality ahead of each release.',
      },
      {
        id: 'medallion',
        title: 'Medallion Pipeline on AWS',
        client: 'FIAP Tech Challenge',
        state: 'cleared',
        techs: 'AWS Glue • S3 • Athena • SQL',
        desc: 'Pipeline raw → bronze → silver → gold over three editions of the State of Data Brazil survey, owning layer modeling and analytical SQL queries.',
      },
      {
        id: 'esports',
        title: 'E-sports Analytics Pipeline',
        client: 'Open source project',
        state: 'cleared',
        techs: 'Python • Riot API • Streamlit',
        desc: 'End-to-end ETL consuming the Riot Games API (pagination, JSON payloads), data cleaning in Python and KPI computation (weighted win rate, KDA, CS/min, damage/min) in a Streamlit dashboard.',
      },
      {
        id: 'cblol',
        title: 'CBLOL Data Pipeline',
        client: 'Personal project',
        state: 'active',
        techs: 'PySpark • Delta Lake • Databricks',
        desc: 'Data pipeline for the Brazilian League of Legends championship built on PySpark and Delta Lake, with the analytical layer published in Power BI.',
      },
      {
        id: 'itam',
        title: 'ITAM System',
        client: 'Rei dos Motores',
        state: 'cleared',
        techs: 'Java 21 • Spring Boot • MySQL',
        desc: 'IT asset management shipped to production, with real-time indicators for available, in-use and under-maintenance equipment and permission-based access control — replacing spreadsheet tracking.',
      },
      {
        id: 'automation',
        title: 'Document Automation',
        client: 'Rei dos Motores',
        state: 'cleared',
        techs: 'Power BI • Apps Script • Forms',
        desc: 'Interactive Power BI dashboards with DAX and real-time data, plus automated corporate document generation integrating Google Forms and Apps Script.',
      },
    ],
  },
  system: {
    saveDataPt: { label: 'SAVE DATA', sub: 'Baixar currículo (PT)' },
    saveDataEn: { label: 'SAVE DATA', sub: 'Download resume (EN)' },
    network: { label: 'NETWORK', sub: 'LinkedIn' },
    source: { label: 'SOURCE', sub: 'GitHub' },
    comms: { label: 'COMMS', sub: 'E-mail' },
  },
};

export const CONTENT = { pt, en };
