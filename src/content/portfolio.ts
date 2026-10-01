export const PERSON = {
  name: "Sudipta Mondal Suvo",
  shortName: "Sudipta",
  title: "Data Scientist & ML Engineer",
  location: "Dhaka, Bangladesh",
  statement: "Building intelligent systems from data, models, and ideas.",
  about: [
    "I work at the intersection of data science, machine learning, and software engineering — turning messy information into systems that can be trusted in the real world.",
    "The through-line is craft: careful data work, rigorous experiments, and the engineering required to make a model useful once it leaves a notebook.",
    "I am drawn to problems where research has to become infrastructure — retrieval pipelines, computer vision in context, and generative systems that remain grounded in sources.",
  ],
  journey: [
    "Computer Science foundations",
    "Machine learning practice",
    "Deep learning research",
    "AI engineering",
    "Generative systems",
  ],
} as const;

export const EDUCATION = [
  {
    id: "bsc",
    level: "BSc",
    title: "Computer Science & Engineering",
    school: "Daffodil International University",
    note: "Thesis: Advancing Precision in Potato Leaf Disease Classification Using Deep Learning Approach",
  },
  {
    id: "hsc",
    level: "HSC",
    title: "Higher Secondary Certificate",
    school: "Narail Govt Victoria College",
    note: null,
  },
  {
    id: "ssc",
    level: "SSC",
    title: "Secondary School Certificate",
    school: "Narail Govt High School",
    note: null,
  },
] as const;

export const SKILLS = {
  Programming: ["Python", "SQL", "TypeScript", "JavaScript"],
  "Data Science": ["Pandas", "NumPy", "Scikit-learn", "Tableau"],
  "Deep Learning": ["PyTorch", "TensorFlow", "Keras"],
  "AI / LLM": [
    "Hugging Face",
    "LangChain",
    "LlamaIndex",
    "RAG",
    "QLoRA",
    "Embeddings",
    "Reranking",
    "LLM inference",
  ],
  Engineering: [
    "Git",
    "Docker",
    "Linux",
    "PostgreSQL",
    "Redis",
    "Qdrant",
    "REST APIs",
  ],
} as const;

export type ProjectId =
  | "agnxai"
  | "hospital"
  | "minabazar"
  | "realestate"
  | "fer"
  | "chatbot"
  | "trading"
  | "potato";

export type Project = {
  id: ProjectId;
  kicker: string;
  title: string;
  statement: string;
  body: string;
  tags: string[];
  facts: { label: string; value: string }[];
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "agnxai",
    kicker: "Spatial systems",
    title: "AGNXAI",
    statement: "A modular spatial AI workspace.",
    body: "AGNXAI is a spatial AI workspace concept: pages, documents, and modular components organized as nodes in an explorable information architecture. The work sits at the intersection of AI interaction, workspace design, and spatial computing.",
    tags: ["Spatial computing", "AI workspace", "Information architecture"],
    facts: [
      { label: "Form", value: "Modular workspace" },
      { label: "Focus", value: "AI + spatial structure" },
    ],
    href: "https://agnxai.com",
  },
  {
    id: "hospital",
    kicker: "Applied systems",
    title: "Unified Hospital Platform",
    statement: "AI becomes useful when it is integrated into reliable systems.",
    body: "A healthcare information system conceived as tenant-aware infrastructure: knowledge documents, semantic search, retrieval, multilingual content, and an auditable question-answering path. Representations here are fictional and demo-safe — no private medical data is shown.",
    tags: ["RAG", "Semantic search", "PostgreSQL", "Qdrant"],
    facts: [
      { label: "Pattern", value: "Retrieval + Q&A" },
      { label: "Constraint", value: "Tenant separation, audit trail" },
    ],
  },
  {
    id: "potato",
    kicker: "Research",
    title: "Potato Leaf Disease Classification",
    statement: "Advancing precision in agricultural computer vision.",
    body: "Undergraduate thesis work on potato leaf disease classification with deep learning. Three disease classes were studied; DenseNet201 was the best reported model at 97.84% accuracy. Built with TensorFlow, Keras, and Google Colab.",
    tags: ["Computer vision", "DenseNet201", "TensorFlow", "Keras"],
    facts: [
      { label: "Classes", value: "3" },
      { label: "Best model", value: "DenseNet201" },
      { label: "Reported accuracy", value: "97.84%" },
    ],
  },
  {
    id: "minabazar",
    kicker: "Data science",
    title: "Minabazar Churn & Segmentation",
    statement: "From customer records to actionable groups.",
    body: "Analytics work on customer data covering segmentation and churn prediction — feature-minded modeling rather than a dashboard for its own sake.",
    tags: ["Pandas", "Scikit-learn", "Segmentation"],
    facts: [
      { label: "Problems", value: "Churn, segmentation" },
      { label: "Stack", value: "Python, Scikit-learn" },
    ],
  },
  {
    id: "realestate",
    kicker: "Predictive modeling",
    title: "Dhaka Real Estate Prediction",
    statement: "Structured property data, estimated with care.",
    body: "A predictive modeling study on Dhaka property listings: structured features, classical machine learning, and price estimation as a data problem rather than a black box.",
    tags: ["Regression", "Feature engineering", "Python"],
    facts: [{ label: "Domain", value: "Dhaka housing" }],
  },
  {
    id: "fer",
    kicker: "Computer vision",
    title: "FER2013 Facial Emotion Recognition",
    statement: "Classification on a well-known facial expression benchmark.",
    body: "Facial emotion recognition on the FER2013 dataset using a ResNet18-based approach. The work is presented as a vision experiment — training, evaluation, and model outputs — without unverified headline metrics.",
    tags: ["ResNet18", "PyTorch", "FER2013"],
    facts: [{ label: "Architecture", value: "ResNet18" }],
  },
  {
    id: "chatbot",
    kicker: "Retrieval",
    title: "Offline Scraped-Website Chatbot",
    statement: "Website → scrape → index → retrieve → respond.",
    body: "An offline assistant over scraped site content: ingestion, indexing, retrieval, and grounded responses. A practical RAG loop without requiring a live crawl at inference time.",
    tags: ["RAG", "Embeddings", "LangChain"],
    facts: [{ label: "Loop", value: "Scrape · index · retrieve" }],
  },
  {
    id: "trading",
    kicker: "Fine-tuning",
    title: "Trading Signal Dataset",
    statement: "Financial time series, labeled and adapted.",
    body: "Dataset and fine-tuning work on financial time series with Buy/Sell labels — validation discipline and GPU experimentation, without claimed production trading performance.",
    tags: ["Fine-tuning", "QLoRA", "Time series"],
    facts: [{ label: "Labels", value: "Buy / Sell" }],
  },
];

export const SECTIONS = [
  {
    id: "hero",
    index: "01",
    kicker: "Workspace",
    title: "Sudipta Mondal Suvo",
    subtitle: "Data Scientist & ML Engineer",
    body: "Building intelligent systems from data, models, and ideas.",
  },
  {
    id: "data",
    index: "02",
    kicker: "Data science",
    title: "From raw information to meaningful patterns.",
    subtitle: "Python · SQL · Pandas · Scikit-learn · Tableau",
    body: "Analysis, predictive modeling, segmentation, and feature work — the discipline of making data speak clearly.",
  },
  {
    id: "ml",
    index: "03",
    kicker: "Machine learning",
    title: "Experiments become systems when they are engineered carefully.",
    subtitle: "PyTorch · TensorFlow · Keras",
    body: "Training curves, architectures, and evaluation — a laboratory for turning hypotheses into models.",
  },
  {
    id: "research",
    index: "04",
    kicker: "Research",
    title: "Precision in the field.",
    subtitle: "Potato leaf disease classification",
    body: "DenseNet201, three classes, 97.84% reported accuracy. Computer vision with an agricultural purpose.",
  },
  {
    id: "llm",
    index: "05",
    kicker: "Generative AI",
    title: "Grounded generation.",
    subtitle: "Document → embedding → retrieval → rerank → context → LLM",
    body: "RAG, vector search, BM25, reranking, LangChain, LlamaIndex, Hugging Face, Groq, QLoRA — a controlled technical laboratory.",
  },
  {
    id: "projects",
    index: "06",
    kicker: "Systems",
    title: "Work that leaves the notebook.",
    subtitle: "AGNXAI · Hospital platform · applied ML",
    body: "Spatial workspaces, healthcare retrieval, churn, housing models, vision, and fine-tuning — systems over demos.",
  },
  {
    id: "about",
    index: "07",
    kicker: "About",
    title: "The person behind the work.",
    subtitle: "Dhaka · curiosity · craft",
    body: "Continuous learning, experimental discipline, and a preference for useful intelligence over spectacle.",
  },
  {
    id: "contact",
    index: "08",
    kicker: "Contact",
    title: "Let’s build something intelligent.",
    subtitle: "Dhaka, Bangladesh",
    body: "Conversations about applied ML, retrieval systems, and computer vision are welcome.",
  },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
