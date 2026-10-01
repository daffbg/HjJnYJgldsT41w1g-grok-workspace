import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, g as require_jsx_runtime, m as Vector3 } from "../_libs/@react-three/drei+[...].mjs";
import { a as Settings2, n as VolumeX, o as RotateCcw, r as Volume2, s as BookOpen, t as X } from "../_libs/lucide-react.mjs";
import { t as Lenis } from "../_libs/lenis.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as gsapWithCSS } from "../_libs/gsap.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ClCWK3Dd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function detectDevice() {
	const ua = navigator.userAgent;
	const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua) || window.innerWidth < 768;
	const cores = navigator.hardwareConcurrency || 4;
	const mem = navigator.deviceMemory ?? 8;
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let quality = "high";
	if (mobile || cores <= 4 || mem <= 4) quality = "low";
	else if (cores <= 8 || mem <= 8) quality = "medium";
	return {
		mobile,
		quality,
		reducedMotion,
		cores,
		mem
	};
}
function detectWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return !!(canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
	} catch {
		return false;
	}
}
function qualitySettings(q) {
	return {
		dpr: q === "high" ? [1, 1.75] : q === "medium" ? [1, 1.25] : 1,
		shadows: q !== "low",
		shadowMap: q === "high" ? 2048 : 1024,
		contactShadows: q !== "low",
		pixelLights: q === "high" ? 6 : q === "medium" ? 4 : 3,
		detail: q,
		antialias: q !== "low"
	};
}
var QUALITIES = [
	"low",
	"medium",
	"high"
];
var useStudio = create((set, get) => ({
	webgl: true,
	ready: false,
	loadProgress: 0,
	reducedMotion: false,
	readable: false,
	quality: "medium",
	autoQuality: true,
	mobile: false,
	neutral: false,
	sound: false,
	clockMode: "system",
	manualHour: 9,
	manualMinute: 41,
	scroll: 0,
	section: 0,
	camZ: 5,
	hovered: null,
	activeProject: null,
	controlsOpen: false,
	resetToken: 0,
	set: (partial) => set(partial),
	setScroll: (scroll) => {
		const clamped = Math.min(1, Math.max(0, scroll));
		set({
			scroll: clamped,
			section: Math.min(7, Math.max(0, Math.round(clamped * 7)))
		});
	},
	cycleQuality: () => {
		set({
			quality: QUALITIES[(QUALITIES.indexOf(get().quality) + 1) % QUALITIES.length],
			autoQuality: false
		});
	},
	resetCamera: () => set({ resetToken: get().resetToken + 1 })
}));
var ctx = null;
var nodes = null;
function brownNoiseBuffer(ac) {
	const length = ac.sampleRate * 4;
	const buffer = ac.createBuffer(1, length, ac.sampleRate);
	const data = buffer.getChannelData(0);
	let last = 0;
	for (let i = 0; i < length; i++) {
		const white = Math.random() * 2 - 1;
		last = (last + .02 * white) / 1.02;
		data[i] = last * 3.5;
	}
	return buffer;
}
async function setAmbient(on) {
	if (!on) {
		if (nodes) {
			nodes.gain.gain.linearRampToValueAtTime(0, (ctx?.currentTime ?? 0) + .3);
			window.setTimeout(() => {
				nodes?.noise.stop();
				nodes = null;
			}, 350);
		}
		return;
	}
	const AC = window.AudioContext || window.webkitAudioContext;
	if (!AC) return;
	if (!ctx) ctx = new AC();
	if (ctx.state === "suspended") await ctx.resume();
	const gain = ctx.createGain();
	gain.gain.value = 0;
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = 280;
	const noise = ctx.createBufferSource();
	noise.buffer = brownNoiseBuffer(ctx);
	noise.loop = true;
	noise.connect(filter);
	filter.connect(gain);
	gain.connect(ctx.destination);
	noise.start();
	gain.gain.linearRampToValueAtTime(.035, ctx.currentTime + .8);
	nodes = {
		noise,
		gain,
		filter
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function ControlPanel() {
	const open = useStudio((s) => s.controlsOpen);
	const set = useStudio((s) => s.set);
	const neutral = useStudio((s) => s.neutral);
	const clockMode = useStudio((s) => s.clockMode);
	const hour = useStudio((s) => s.manualHour);
	const minute = useStudio((s) => s.manualMinute);
	const quality = useStudio((s) => s.quality);
	const sound = useStudio((s) => s.sound);
	const readable = useStudio((s) => s.readable);
	const cycleQuality = useStudio((s) => s.cycleQuality);
	const resetCamera = useStudio((s) => s.resetCamera);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "control-wrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "control-actions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "icon-btn",
				"aria-label": open ? "Close controls" : "Open controls",
				"aria-expanded": open,
				onClick: () => set({ controlsOpen: !open }),
				children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
					size: 18,
					strokeWidth: 1.6
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, {
					size: 18,
					strokeWidth: 1.6
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("control-panel", open && "is-open"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "control-title",
					children: "Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "control-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Neutral mode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "switch",
						"aria-checked": neutral,
						className: cn("switch", neutral && "is-on"),
						onClick: () => set({ neutral: !neutral })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "control-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clock" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-btn",
						onClick: () => set({ clockMode: clockMode === "system" ? "manual" : "system" }),
						children: clockMode === "system" ? "System time" : "Manual"
					})]
				}),
				clockMode === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "control-sliders",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
						"Hour",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 23,
							value: hour,
							onChange: (e) => set({ manualHour: Number(e.target.value) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular",
							children: String(hour).padStart(2, "0")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
						"Minute",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 59,
							value: minute,
							onChange: (e) => set({ manualMinute: Number(e.target.value) })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular",
							children: String(minute).padStart(2, "0")
						})
					] })]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "control-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quality" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-btn",
						onClick: cycleQuality,
						children: quality
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "control-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sound" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn tight",
						"aria-label": sound ? "Mute" : "Unmute",
						onClick: () => {
							const next = !sound;
							set({ sound: next });
							setAmbient(next);
						},
						children: sound ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { size: 16 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "control-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Camera" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-btn",
						onClick: resetCamera,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 14 }), " Reset"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "control-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Readable" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "text-btn",
						onClick: () => set({
							readable: !readable,
							controlsOpen: false
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { size: 14 }),
							" ",
							readable ? "Studio" : "Page"
						]
					})]
				})
			]
		})]
	});
}
var PERSON = {
	name: "Sudipta Mondal Suvo",
	shortName: "Sudipta",
	title: "Data Scientist & ML Engineer",
	location: "Dhaka, Bangladesh",
	statement: "Building intelligent systems from data, models, and ideas.",
	about: [
		"I work at the intersection of data science, machine learning, and software engineering — turning messy information into systems that can be trusted in the real world.",
		"The through-line is craft: careful data work, rigorous experiments, and the engineering required to make a model useful once it leaves a notebook.",
		"I am drawn to problems where research has to become infrastructure — retrieval pipelines, computer vision in context, and generative systems that remain grounded in sources."
	],
	journey: [
		"Computer Science foundations",
		"Machine learning practice",
		"Deep learning research",
		"AI engineering",
		"Generative systems"
	]
};
var EDUCATION = [
	{
		id: "bsc",
		level: "BSc",
		title: "Computer Science & Engineering",
		school: "Daffodil International University",
		note: "Thesis: Advancing Precision in Potato Leaf Disease Classification Using Deep Learning Approach"
	},
	{
		id: "hsc",
		level: "HSC",
		title: "Higher Secondary Certificate",
		school: "Narail Govt Victoria College",
		note: null
	},
	{
		id: "ssc",
		level: "SSC",
		title: "Secondary School Certificate",
		school: "Narail Govt High School",
		note: null
	}
];
var SKILLS = {
	Programming: [
		"Python",
		"SQL",
		"TypeScript",
		"JavaScript"
	],
	"Data Science": [
		"Pandas",
		"NumPy",
		"Scikit-learn",
		"Tableau"
	],
	"Deep Learning": [
		"PyTorch",
		"TensorFlow",
		"Keras"
	],
	"AI / LLM": [
		"Hugging Face",
		"LangChain",
		"LlamaIndex",
		"RAG",
		"QLoRA",
		"Embeddings",
		"Reranking",
		"LLM inference"
	],
	Engineering: [
		"Git",
		"Docker",
		"Linux",
		"PostgreSQL",
		"Redis",
		"Qdrant",
		"REST APIs"
	]
};
var PROJECTS = [
	{
		id: "agnxai",
		kicker: "Spatial systems",
		title: "AGNXAI",
		statement: "A modular spatial AI workspace.",
		body: "AGNXAI is a spatial AI workspace concept: pages, documents, and modular components organized as nodes in an explorable information architecture. The work sits at the intersection of AI interaction, workspace design, and spatial computing.",
		tags: [
			"Spatial computing",
			"AI workspace",
			"Information architecture"
		],
		facts: [{
			label: "Form",
			value: "Modular workspace"
		}, {
			label: "Focus",
			value: "AI + spatial structure"
		}],
		href: "https://agnxai.com"
	},
	{
		id: "hospital",
		kicker: "Applied systems",
		title: "Unified Hospital Platform",
		statement: "AI becomes useful when it is integrated into reliable systems.",
		body: "A healthcare information system conceived as tenant-aware infrastructure: knowledge documents, semantic search, retrieval, multilingual content, and an auditable question-answering path. Representations here are fictional and demo-safe — no private medical data is shown.",
		tags: [
			"RAG",
			"Semantic search",
			"PostgreSQL",
			"Qdrant"
		],
		facts: [{
			label: "Pattern",
			value: "Retrieval + Q&A"
		}, {
			label: "Constraint",
			value: "Tenant separation, audit trail"
		}]
	},
	{
		id: "potato",
		kicker: "Research",
		title: "Potato Leaf Disease Classification",
		statement: "Advancing precision in agricultural computer vision.",
		body: "Undergraduate thesis work on potato leaf disease classification with deep learning. Three disease classes were studied; DenseNet201 was the best reported model at 97.84% accuracy. Built with TensorFlow, Keras, and Google Colab.",
		tags: [
			"Computer vision",
			"DenseNet201",
			"TensorFlow",
			"Keras"
		],
		facts: [
			{
				label: "Classes",
				value: "3"
			},
			{
				label: "Best model",
				value: "DenseNet201"
			},
			{
				label: "Reported accuracy",
				value: "97.84%"
			}
		]
	},
	{
		id: "minabazar",
		kicker: "Data science",
		title: "Minabazar Churn & Segmentation",
		statement: "From customer records to actionable groups.",
		body: "Analytics work on customer data covering segmentation and churn prediction — feature-minded modeling rather than a dashboard for its own sake.",
		tags: [
			"Pandas",
			"Scikit-learn",
			"Segmentation"
		],
		facts: [{
			label: "Problems",
			value: "Churn, segmentation"
		}, {
			label: "Stack",
			value: "Python, Scikit-learn"
		}]
	},
	{
		id: "realestate",
		kicker: "Predictive modeling",
		title: "Dhaka Real Estate Prediction",
		statement: "Structured property data, estimated with care.",
		body: "A predictive modeling study on Dhaka property listings: structured features, classical machine learning, and price estimation as a data problem rather than a black box.",
		tags: [
			"Regression",
			"Feature engineering",
			"Python"
		],
		facts: [{
			label: "Domain",
			value: "Dhaka housing"
		}]
	},
	{
		id: "fer",
		kicker: "Computer vision",
		title: "FER2013 Facial Emotion Recognition",
		statement: "Classification on a well-known facial expression benchmark.",
		body: "Facial emotion recognition on the FER2013 dataset using a ResNet18-based approach. The work is presented as a vision experiment — training, evaluation, and model outputs — without unverified headline metrics.",
		tags: [
			"ResNet18",
			"PyTorch",
			"FER2013"
		],
		facts: [{
			label: "Architecture",
			value: "ResNet18"
		}]
	},
	{
		id: "chatbot",
		kicker: "Retrieval",
		title: "Offline Scraped-Website Chatbot",
		statement: "Website → scrape → index → retrieve → respond.",
		body: "An offline assistant over scraped site content: ingestion, indexing, retrieval, and grounded responses. A practical RAG loop without requiring a live crawl at inference time.",
		tags: [
			"RAG",
			"Embeddings",
			"LangChain"
		],
		facts: [{
			label: "Loop",
			value: "Scrape · index · retrieve"
		}]
	},
	{
		id: "trading",
		kicker: "Fine-tuning",
		title: "Trading Signal Dataset",
		statement: "Financial time series, labeled and adapted.",
		body: "Dataset and fine-tuning work on financial time series with Buy/Sell labels — validation discipline and GPU experimentation, without claimed production trading performance.",
		tags: [
			"Fine-tuning",
			"QLoRA",
			"Time series"
		],
		facts: [{
			label: "Labels",
			value: "Buy / Sell"
		}]
	}
];
var SECTIONS = [
	{
		id: "hero",
		index: "01",
		kicker: "Workspace",
		title: "Sudipta Mondal Suvo",
		subtitle: "Data Scientist & ML Engineer",
		body: "Building intelligent systems from data, models, and ideas."
	},
	{
		id: "data",
		index: "02",
		kicker: "Data science",
		title: "From raw information to meaningful patterns.",
		subtitle: "Python · SQL · Pandas · Scikit-learn · Tableau",
		body: "Analysis, predictive modeling, segmentation, and feature work — the discipline of making data speak clearly."
	},
	{
		id: "ml",
		index: "03",
		kicker: "Machine learning",
		title: "Experiments become systems when they are engineered carefully.",
		subtitle: "PyTorch · TensorFlow · Keras",
		body: "Training curves, architectures, and evaluation — a laboratory for turning hypotheses into models."
	},
	{
		id: "research",
		index: "04",
		kicker: "Research",
		title: "Precision in the field.",
		subtitle: "Potato leaf disease classification",
		body: "DenseNet201, three classes, 97.84% reported accuracy. Computer vision with an agricultural purpose."
	},
	{
		id: "llm",
		index: "05",
		kicker: "Generative AI",
		title: "Grounded generation.",
		subtitle: "Document → embedding → retrieval → rerank → context → LLM",
		body: "RAG, vector search, BM25, reranking, LangChain, LlamaIndex, Hugging Face, Groq, QLoRA — a controlled technical laboratory."
	},
	{
		id: "projects",
		index: "06",
		kicker: "Systems",
		title: "Work that leaves the notebook.",
		subtitle: "AGNXAI · Hospital platform · applied ML",
		body: "Spatial workspaces, healthcare retrieval, churn, housing models, vision, and fine-tuning — systems over demos."
	},
	{
		id: "about",
		index: "07",
		kicker: "About",
		title: "The person behind the work.",
		subtitle: "Dhaka · curiosity · craft",
		body: "Continuous learning, experimental discipline, and a preference for useful intelligence over spectacle."
	},
	{
		id: "contact",
		index: "08",
		kicker: "Contact",
		title: "Let’s build something intelligent.",
		subtitle: "Dhaka, Bangladesh",
		body: "Conversations about applied ML, retrieval systems, and computer vision are welcome."
	}
];
/** Cinematic path through the eight-bay studio. Scroll 0..1. */
var WAYPOINTS = [
	{
		p: [
			3.35,
			1.68,
			5.15
		],
		t: [
			-.35,
			1.02,
			-.4
		],
		fov: 38
	},
	{
		p: [
			1.25,
			1.32,
			2.05
		],
		t: [
			-.5,
			1,
			-.55
		],
		fov: 30
	},
	{
		p: [
			2.4,
			1.72,
			-8.6
		],
		t: [
			.15,
			1.18,
			-14.4
		],
		fov: 40
	},
	{
		p: [
			.05,
			1.42,
			-13.6
		],
		t: [
			.25,
			1.15,
			-18.2
		],
		fov: 34
	},
	{
		p: [
			2.15,
			1.82,
			-21.4
		],
		t: [
			.1,
			1.35,
			-27.6
		],
		fov: 42
	},
	{
		p: [
			-.15,
			1.48,
			-26.6
		],
		t: [
			.35,
			1.32,
			-31.2
		],
		fov: 33
	},
	{
		p: [
			2.05,
			1.58,
			-34.2
		],
		t: [
			.05,
			1.18,
			-40.4
		],
		fov: 38
	},
	{
		p: [
			.2,
			1.34,
			-39.4
		],
		t: [
			.1,
			1.12,
			-43.6
		],
		fov: 31
	},
	{
		p: [
			1.7,
			1.66,
			-47.2
		],
		t: [
			.05,
			1.28,
			-53
		],
		fov: 40
	},
	{
		p: [
			-.35,
			1.38,
			-52.2
		],
		t: [
			.2,
			1.18,
			-56.4
		],
		fov: 33
	},
	{
		p: [
			2.55,
			1.88,
			-61
		],
		t: [
			0,
			1.12,
			-70
		],
		fov: 44
	},
	{
		p: [
			.15,
			1.52,
			-69.4
		],
		t: [
			0,
			1.08,
			-76.2
		],
		fov: 36
	},
	{
		p: [
			1.55,
			1.48,
			-81.4
		],
		t: [
			-.45,
			1.18,
			-86.4
		],
		fov: 35
	},
	{
		p: [
			.05,
			1.62,
			-90.2
		],
		t: [
			0,
			1.32,
			-96
		],
		fov: 34
	},
	{
		p: [
			0,
			2.05,
			-93.6
		],
		t: [
			0,
			1.4,
			-99.2
		],
		fov: 40
	}
];
var _p = new Vector3();
var _t = new Vector3();
var _pA = new Vector3();
var _pB = new Vector3();
var _tA = new Vector3();
var _tB = new Vector3();
function samplePath(scroll) {
	const n = WAYPOINTS.length - 1;
	const x = Math.min(1, Math.max(0, scroll)) * n;
	const i = Math.min(n - 1, Math.floor(x));
	const f = x - i;
	const s = f * f * (3 - 2 * f);
	const a = WAYPOINTS[i];
	const b = WAYPOINTS[i + 1];
	_pA.set(...a.p);
	_pB.set(...b.p);
	_tA.set(...a.t);
	_tB.set(...b.t);
	_p.lerpVectors(_pA, _pB, s);
	_t.lerpVectors(_tA, _tB, s);
	return {
		position: _p,
		target: _t,
		fov: a.fov + (b.fov - a.fov) * s
	};
}
var ROOM_Z = {
	workspace: 0,
	data: -14,
	ml: -28,
	research: -42,
	llm: -56,
	projects: -70,
	about: -86,
	contact: -96
};
var SECTION_SCROLL = [
	0,
	.14,
	.28,
	.42,
	.56,
	.7,
	.84,
	1
];
function Nav() {
	const section = useStudio((s) => s.section);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "studio-nav",
		"aria-label": "Studio rooms",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: SECTIONS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: cn("nav-dot", i === section && "is-active"),
			onClick: () => {
				const y = SECTION_SCROLL[i] * (document.documentElement.scrollHeight - window.innerHeight);
				window.scrollTo({
					top: y,
					behavior: "smooth"
				});
			},
			"aria-current": i === section ? "true" : void 0,
			"aria-label": `${s.index} ${s.kicker}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "nav-index",
				children: s.index
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "nav-label",
				children: s.kicker
			})]
		}) }, s.id)) })
	});
}
function Overlay() {
	const section = useStudio((s) => s.section);
	const hovered = useStudio((s) => s.hovered);
	const ready = useStudio((s) => s.ready);
	const readable = useStudio((s) => s.readable);
	const webgl = useStudio((s) => s.webgl);
	const copyRef = (0, import_react.useRef)(null);
	const s = SECTIONS[section];
	const hoverProject = PROJECTS.find((p) => p.id === hovered);
	(0, import_react.useEffect)(() => {
		if (!copyRef.current) return;
		gsapWithCSS.fromTo(copyRef.current.children, {
			y: 16,
			opacity: 0
		}, {
			y: 0,
			opacity: 1,
			duration: .55,
			stagger: .06,
			ease: "power3.out"
		});
	}, [section]);
	if (readable || !webgl) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "studio-overlay",
		"aria-hidden": !ready,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overlay-copy",
				ref: copyRef,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "overlay-kicker",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.index }), s.kicker]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "overlay-title",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overlay-sub",
						children: s.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overlay-body",
						children: s.body
					})
				]
			}, s.id),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "overlay-hint",
				children: section === 0 ? "Scroll to walk the studio" : "Scroll"
			}),
			hoverProject && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "overlay-hover",
				children: [hoverProject.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open" })]
			})
		]
	});
}
function Preloader() {
	const ready = useStudio((s) => s.ready);
	const webgl = useStudio((s) => s.webgl);
	const readable = useStudio((s) => s.readable);
	const hide = ready || !webgl || readable;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `preloader ${hide ? "preloader-hide" : ""}`,
		"aria-hidden": hide,
		role: "status",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "preloader-kicker",
				children: "Entering the studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "preloader-name",
				children: PERSON.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "preloader-role",
				children: PERSON.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "preloader-bar" })
		]
	});
}
function ProjectPanel() {
	const id = useStudio((s) => s.activeProject);
	const set = useStudio((s) => s.set);
	const project = PROJECTS.find((p) => p.id === id);
	if (!project) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "project-backdrop",
		role: "presentation",
		onClick: () => set({ activeProject: null }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "project-panel",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "project-title",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overlay-kicker",
						children: project.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "project-title",
						children: project.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "icon-btn",
						"aria-label": "Close project",
						onClick: () => set({ activeProject: null }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "project-statement",
					children: project.statement
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "project-body",
					children: project.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "project-facts",
					children: project.facts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: f.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: f.value })] }, f.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "project-tags",
					children: project.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t))
				}),
				project.href && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "project-link",
					href: project.href,
					target: "_blank",
					rel: "noreferrer",
					children: ["Visit ", project.title]
				})
			]
		})
	});
}
function SemanticDocument({ visible }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const set = useStudio((s) => s.set);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: visible ? "readable" : "sr-only",
		id: "content",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "readable-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "overlay-kicker",
						children: "Dhaka, Bangladesh"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: PERSON.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "readable-title",
						children: PERSON.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "readable-lead",
						children: PERSON.statement
					}),
					!visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Immersive 3D studio portfolio covering data science, machine learning, computer vision, RAG systems, and applied AI engineering." }),
					visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-btn",
						onClick: () => set({ readable: false }),
						children: "Enter the studio"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "About" }),
				PERSON.about.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p }, p)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Journey: ", PERSON.journey.join(" → ")] })
			] }),
			SECTIONS.filter((s) => s.id !== "hero" && s.id !== "about" && s.id !== "contact").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: s.id,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						s.kicker,
						": ",
						s.title
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: s.subtitle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: s.body })
				]
			}, s.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "projects",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Selected work" }), PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: p.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.statement }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.body }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.tags.join(" · ") }),
					p.facts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						f.label,
						": ",
						f.value
					] }, f.label)),
					p.href && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: p.href,
						children: p.href
					}) })
				] }, p.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "education",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Education" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: EDUCATION.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						e.level,
						" — ",
						e.title
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" ", e.school] }),
					e.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: e.note })
				] }, e.id)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "skills",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Technical toolkit" }), Object.entries(SKILLS).map(([group, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: group }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: items.join(" · ") })] }, group))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "contact",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Let’s build something intelligent." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: PERSON.location }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Conversations about applied machine learning, retrieval systems, and computer vision are welcome. Personal channels are shared in professional correspondence." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Project: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://agnxai.com",
						children: "agnxai.com"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "contact-form",
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							const text = `From: ${fd.get("name")} <${fd.get("email")}>\n\n${fd.get("message")}`;
							navigator.clipboard.writeText(text).then(() => {
								setCopied(true);
								window.setTimeout(() => setCopied(false), 2400);
							});
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "name",
								required: true,
								autoComplete: "name"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "email",
								type: "email",
								required: true,
								autoComplete: "email"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								name: "message",
								rows: 4,
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "text-btn primary",
								children: copied ? "Copied" : "Copy message"
							})
						]
					})
				]
			})
		]
	});
}
function StudioApp() {
	const [Experience, setExperience] = (0, import_react.useState)(null);
	const webgl = useStudio((s) => s.webgl);
	const readable = useStudio((s) => s.readable);
	const ready = useStudio((s) => s.ready);
	const set = useStudio((s) => s.set);
	const setScroll = useStudio((s) => s.setScroll);
	const activeProject = useStudio((s) => s.activeProject);
	const lenisRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const { mobile, quality, reducedMotion } = detectDevice();
		const gl = detectWebGL();
		set({
			mobile,
			quality,
			reducedMotion,
			webgl: gl,
			readable: !gl
		});
		if (gl) import("./Experience-BFKEQCyz.mjs").then((m) => setExperience(() => m.Experience));
		else set({
			ready: true,
			loadProgress: 1
		});
		const failSafe = window.setTimeout(() => {
			if (!useStudio.getState().ready) useStudio.getState().set({ ready: true });
		}, 7e3);
		return () => window.clearTimeout(failSafe);
	}, [set]);
	(0, import_react.useEffect)(() => {
		const lenis = new Lenis({
			autoRaf: true,
			syncTouch: true,
			lerp: useStudio.getState().reducedMotion ? 1 : .09,
			respectReducedMotion: true
		});
		lenisRef.current = lenis;
		const onScroll = (instance) => {
			setScroll(instance.progress);
		};
		lenis.on("scroll", onScroll);
		return () => {
			lenis.off("scroll", onScroll);
			lenis.destroy();
			lenisRef.current = null;
		};
	}, [setScroll]);
	(0, import_react.useEffect)(() => {
		if (!lenisRef.current) return;
		if (activeProject || readable) lenisRef.current.stop();
		else lenisRef.current.start();
	}, [activeProject, readable]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") set({
				activeProject: null,
				controlsOpen: false
			});
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [set]);
	const showWorld = Boolean(webgl && !readable && Experience);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: "skip-link",
			href: "#content",
			onClick: () => set({ readable: true }),
			children: "Skip to content"
		}),
		showWorld && Experience ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}) : null,
		showWorld ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scroll-track",
			"aria-hidden": "true"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SemanticDocument, { visible: readable || !webgl }),
		!readable && webgl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlPanel, {})
		] }) : null,
		activeProject ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectPanel, {}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preloader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "vignette",
			"aria-hidden": "true"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grain",
			"aria-hidden": "true"
		}),
		ready && !readable && webgl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "brand-mark",
			children: ["Sudipta Mondal Suvo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Studio" })]
		}) : null
	] });
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioApp, {});
}
//#endregion
export { qualitySettings as a, useStudio as i, ROOM_Z as n, samplePath as r, routes_exports as t };
