export type KnowledgeDoc = {
  id: string
  title: string
  author: string
  type: 'PFE' | 'PFC'
  year: number
  domain: string
  description: string
  technologies: string[]
}

export const knowledgeDocs: KnowledgeDoc[] = [
  {
    id: 'doc-docker-platform',
    title: "Déploiement d'une plateforme web avec Docker",
    author: 'Meriem B.',
    type: 'PFE',
    year: 2025,
    domain: 'DevOps / Web',
    description: "Conteneurisation complète d'une application de gestion documentaire, avec orchestration locale, base PostgreSQL persistante et pipeline d'intégration continue.",
    technologies: ['Docker', 'PostgreSQL', 'Nginx', 'Node.js', 'GitLab CI'],
  },
  {
    id: 'doc-cloud-native',
    title: 'Architecture Cloud Native pour applications métier',
    author: 'Ahmed K.',
    type: 'PFE',
    year: 2024,
    domain: 'DevOps',
    description: "Étude comparative des architectures monolithiques et microservices, puis migration progressive d'un module métier vers un cluster Kubernetes supervisé.",
    technologies: ['Kubernetes', 'Docker', 'PostgreSQL', 'Terraform', 'Grafana'],
  },
  {
    id: 'doc-stagelink',
    title: 'Développement d\'une plateforme intelligente de gestion des stages',
    author: 'Meriem B.',
    type: 'PFE',
    year: 2026,
    domain: 'Web / AI',
    description: "Conception et réalisation d'une plateforme de gestion des stages intégrant une base de connaissances documentaire et une recherche sémantique assistée.",
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'doc-ml-maintenance',
    title: 'Maintenance prédictive par apprentissage automatique',
    author: 'Yacine T.',
    type: 'PFE',
    year: 2025,
    domain: 'AI',
    description: "Détection d'anomalies sur des séries temporelles de capteurs industriels, avec comparaison de plusieurs modèles supervisés et suivi des expérimentations.",
    technologies: ['Python', 'scikit-learn', 'Pandas', 'Docker', 'MLflow'],
  },
  {
    id: 'doc-secure-api',
    title: 'Sécurisation des API internes et gestion des accès',
    author: 'Nadia L.',
    type: 'PFC',
    year: 2024,
    domain: 'Cybersecurity / Web',
    description: "Mise en place d'un fournisseur d'identité centralisé, politiques de rôles fines et audit des appels d'API sur un système interne existant.",
    technologies: ['OAuth2', 'Keycloak', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'doc-dicom',
    title: "Gestion et visualisation d'imagerie médicale DICOM",
    author: 'Sofiane R.',
    type: 'PFE',
    year: 2023,
    domain: 'Medical IT / Web',
    description: "Développement d'une visionneuse d'images médicales avec indexation des examens et gestion des droits d'accès des praticiens.",
    technologies: ['React', 'DICOM', 'Python', 'PostgreSQL'],
  },
  {
    id: 'doc-nlp-reports',
    title: 'Analyse sémantique des rapports de stage par NLP',
    author: 'Imane D.',
    type: 'PFC',
    year: 2025,
    domain: 'AI',
    description: "Extraction automatique de thématiques et de mots-clés à partir d'un corpus de rapports de stage, avec regroupement par similarité sémantique.",
    technologies: ['Python', 'spaCy', 'Embeddings', 'FastAPI'],
  },
  {
    id: 'doc-intranet',
    title: "Refonte d'un intranet documentaire d'entreprise",
    author: 'Karim Z.',
    type: 'PFC',
    year: 2023,
    domain: 'Web',
    description: 'Modernisation d\'un portail interne : ergonomie, moteur de recherche plein texte et gestion des versions de documents.',
    technologies: ['Vue.js', 'Node.js', 'MySQL', 'Nginx'],
  },
]

export const allTags = [
  'PFE', 'PFC', 'AI', 'Web', 'Cybersecurity', 'DevOps', 'Medical IT',
  'DICOM', 'Docker', 'Embeddings', 'FastAPI', 'GitLab CI', 'Grafana',
  'Keycloak', 'Kubernetes', 'MLflow', 'MySQL', 'Nginx', 'Node.js',
  'OAuth2', 'PostgreSQL', 'Python', 'React', 'Terraform', 'TypeScript',
  'Vue.js', 'scikit-learn', 'spaCy',
]

export type DocChapter = { title: string; summary: string }

export const stageLinkDocDetail = {
  chapters: [
    { title: 'Introduction', summary: 'Contexte du stage, problématique de la dispersion documentaire et présentation des objectifs du projet.' },
    { title: "État de l'art", summary: 'Panorama des solutions existantes de gestion de stages et de recherche documentaire.' },
    { title: 'Analyse des besoins', summary: 'Recueil des besoins des stagiaires, encadrants et administrateurs.' },
    { title: 'Conception du système', summary: 'Architecture technique, modèle de données et choix technologiques.' },
    { title: 'Implémentation', summary: 'Détail des modules développés côté frontend et backend.' },
    { title: 'Tests', summary: 'Stratégie de test et résultats obtenus.' },
    { title: 'Conclusion', summary: 'Bilan du projet et perspectives.' },
  ] as DocChapter[],
  summary: {
    executive: "Ce mémoire présente la conception d'une plateforme de gestion des stages combinant le suivi administratif des stagiaires et une base de connaissances construite à partir des rapports et mémoires déposés. L'auteure y démontre qu'une indexation sémantique du corpus réduit fortement le temps de recherche d'un projet antérieur comparable.",
    objectives: [
      'Centraliser le dépôt et le suivi des conventions de stage.',
      'Indexer les rapports et mémoires dans une base de connaissances interrogeable.',
      'Fournir une recherche par sujet, technologie et encadrant.',
      'Assurer la traçabilité des sources pour chaque réponse fournie.',
    ],
    results: [
      'La recherche sémantique retrouve 3 fois plus de projets pertinents que la recherche par mots-clés seule.',
      "La découpe des documents par chapitre améliore nettement la précision des extraits cités.",
      'Les encadrants privilégient une réponse courte accompagnée de sources vérifiables.',
    ],
    limits: [
      'Le corpus de test reste limité à 120 documents.',
      'Les documents scannés sans couche texte ne sont pas exploitables.',
      "L'évaluation de la qualité des réponses reste manuelle.",
    ],
    perspectives: [
      'Étendre l\'indexation aux annexes et au code source déposé.',
      'Ajouter une détection automatique des doublons de sujets.',
      "Mettre en place un tableau de bord d'analyse pour les encadrants.",
    ],
  },
}

// --- Réponses de démo pour le chat, indexées par mot-clé simple ---
export const demoChatAnswers: { keywords: string[]; answer: string; sources: { title: string; author: string; chapter: string; docId: string }[] }[] = [
  {
    keywords: ['docker'],
    answer: "D'après les documents indexés, 3 projets correspondent à votre question :\n\n1. « Déploiement d'une plateforme web avec Docker » — Meriem B., PFE 2025. Conteneurisation complète d'une application de gestion documentaire, avec orchestration locale, base PostgreSQL persistante et pipeline d'intégration continue.\n2. « Architecture Cloud Native pour applications métier » — Ahmed K., PFE 2024. Étude comparative des architectures monolithiques et microservices, puis migration progressive vers un cluster Kubernetes.\n3. « Développement d'une plateforme intelligente de gestion des stages » — Meriem B., PFE 2026.\n\nTechnologies récurrentes : Docker, PostgreSQL, Nginx, Node.js, GitLab CI, Kubernetes.",
    sources: [
      { title: "Déploiement d'une plateforme web avec Docker", author: 'Meriem B.', chapter: 'Conception du système', docId: 'doc-docker-platform' },
      { title: 'Architecture Cloud Native pour applications métier', author: 'Ahmed K.', chapter: 'Implémentation', docId: 'doc-cloud-native' },
      { title: "Développement d'une plateforme intelligente de gestion des stages", author: 'Meriem B.', chapter: "État de l'art", docId: 'doc-stagelink' },
    ],
  },
]

export const defaultChatAnswer = {
  answer: "Je n'ai pas trouvé de correspondance directe dans la base documentaire pour cette question. Voici toutefois les mémoires les plus proches du sujet, que vous pouvez consulter dans la bibliothèque de connaissances. Précisez une technologie (Docker, PostgreSQL, Kubernetes…) ou un domaine (IA, cybersécurité, DevOps) pour affiner la recherche.",
  sources: [
    { title: "Déploiement d'une plateforme web avec Docker", author: 'Meriem B.', chapter: "État de l'art", docId: 'doc-docker-platform' },
    { title: 'Architecture Cloud Native pour applications métier', author: 'Ahmed K.', chapter: "État de l'art", docId: 'doc-cloud-native' },
  ],
}