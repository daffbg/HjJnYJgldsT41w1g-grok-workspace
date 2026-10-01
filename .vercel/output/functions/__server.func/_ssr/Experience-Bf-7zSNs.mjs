import { i as __toESM } from "../_runtime.mjs";
import { _ as require_react, c as Float32BufferAttribute, d as RepeatWrapping, f as SRGBColorSpace, g as require_jsx_runtime, i as useThree, l as Fog, m as Vector3, n as Canvas, o as BufferGeometry, p as Spherical, r as useFrame, s as CanvasTexture, t as ContactShadows, u as MathUtils } from "../_libs/@react-three/drei+[...].mjs";
import { a as useStudio, i as PROJECTS, n as ROOM_Z, o as qualitySettings, r as samplePath } from "./routes-44FK73W1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Experience-Bf-7zSNs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function seedRand(seed) {
	let s = seed >>> 0;
	return () => {
		s = s * 1664525 + 1013904223 >>> 0;
		return s / 4294967296;
	};
}
function makeCanvas(w, h) {
	const c = document.createElement("canvas");
	c.width = w;
	c.height = h;
	const ctx = c.getContext("2d");
	if (!ctx) throw new Error("2d context");
	return {
		c,
		ctx
	};
}
function toTex(c, repeat = 1) {
	const t = new CanvasTexture(c);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 8;
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(repeat, repeat);
	t.needsUpdate = true;
	return t;
}
function woodTexture() {
	const { c, ctx } = makeCanvas(512, 512);
	const rnd = seedRand(42);
	ctx.fillStyle = "#3a2a1c";
	ctx.fillRect(0, 0, 512, 512);
	for (let y = 0; y < 512; y++) {
		const n = Math.sin(y * .08 + rnd() * .4) * 6;
		const shade = 38 + Math.floor(rnd() * 22) + Math.sin(y * .03) * 8;
		ctx.fillStyle = `rgb(${shade + 18},${shade - 2},${shade - 18})`;
		ctx.fillRect(0, y, 512, 1);
		ctx.strokeStyle = `rgba(20,12,8,${.08 + rnd() * .12})`;
		ctx.beginPath();
		ctx.moveTo(0, y + n);
		ctx.bezierCurveTo(180, y + n * .4, 340, y - n, 512, y + n * .2);
		ctx.stroke();
	}
	return toTex(c, 8);
}
function plasterTexture() {
	const { c, ctx } = makeCanvas(256, 256);
	const rnd = seedRand(9);
	ctx.fillStyle = "#d8d0c4";
	ctx.fillRect(0, 0, 256, 256);
	for (let i = 0; i < 1800; i++) {
		const x = rnd() * 256;
		const y = rnd() * 256;
		const v = 200 + rnd() * 28;
		ctx.fillStyle = `rgba(${v},${v - 8},${v - 16},0.18)`;
		ctx.fillRect(x, y, 2, 2);
	}
	return toTex(c, 4);
}
function concreteTexture() {
	const { c, ctx } = makeCanvas(256, 256);
	const rnd = seedRand(21);
	ctx.fillStyle = "#8a847c";
	ctx.fillRect(0, 0, 256, 256);
	for (let i = 0; i < 2200; i++) {
		const v = 110 + rnd() * 50;
		ctx.fillStyle = `rgba(${v},${v - 4},${v - 10},0.35)`;
		ctx.fillRect(rnd() * 256, rnd() * 256, rnd() * 3, rnd() * 3);
	}
	return toTex(c, 2);
}
function skyTexture() {
	const { c, ctx } = makeCanvas(8, 512);
	const g = ctx.createLinearGradient(0, 0, 0, 512);
	g.addColorStop(0, "#c9c2b4");
	g.addColorStop(.42, "#9aa7b0");
	g.addColorStop(.72, "#6d7986");
	g.addColorStop(1, "#3e4550");
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, 8, 512);
	return toTex(c, 1);
}
function panel(ctx, w, h) {
	ctx.fillStyle = "#161512";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#1e1c18";
	ctx.fillRect(0, 0, w, 28);
	ctx.fillStyle = "#8a8478";
	ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
}
function codeScreenTexture() {
	const { c, ctx } = makeCanvas(768, 480);
	panel(ctx, 768, 480);
	ctx.fillStyle = "#b7b1a6";
	ctx.fillText("train.py  —  densenet201  ·  colab", 16, 18);
	const lines = [
		["# ", "thesis: potato leaf disease classification"],
		["import ", "tensorflow as tf"],
		["from ", "tensorflow.keras.applications import DenseNet201"],
		["", ""],
		["base ", "= DenseNet201(weights='imagenet', include_top=False)"],
		["x ", "= tf.keras.layers.GlobalAveragePooling2D()(base.output)"],
		["out ", "= tf.keras.layers.Dense(3, activation='softmax')(x)"],
		["model ", "= tf.keras.Model(base.input, out)"],
		["", ""],
		["model.compile(", "optimizer='adam',"],
		["    ", "loss='categorical_crossentropy',"],
		["    ", "metrics=['accuracy'])"],
		["", ""],
		["history ", "= model.fit(train_ds, validation_data=val_ds, epochs=40)"],
		["# ", "best reported accuracy: 97.84%"]
	];
	let y = 52;
	ctx.font = "15px ui-monospace, Menlo, monospace";
	for (const [kw, rest] of lines) {
		ctx.fillStyle = "#7d9a7a";
		ctx.fillText(kw, 22, y);
		ctx.fillStyle = "#d8d2c6";
		ctx.fillText(rest, 22 + ctx.measureText(kw).width, y);
		y += 26;
	}
	return toTex(c, 1);
}
function chartScreenTexture() {
	const { c, ctx } = makeCanvas(768, 480);
	panel(ctx, 768, 480);
	ctx.fillStyle = "#b7b1a6";
	ctx.fillText("experiment  ·  training curves", 16, 18);
	ctx.fillStyle = "#d8d2c6";
	ctx.font = "13px ui-monospace, Menlo, monospace";
	ctx.fillText("acc", 24, 54);
	ctx.fillText("loss", 24, 260);
	const acc = [
		.42,
		.61,
		.74,
		.82,
		.88,
		.91,
		.94,
		.958,
		.971,
		.9784
	];
	const loss = [
		1.4,
		.92,
		.61,
		.44,
		.32,
		.24,
		.19,
		.15,
		.12,
		.09
	];
	function plot(data, y0, h, color, max) {
		ctx.strokeStyle = "#2c2a26";
		ctx.strokeRect(70, y0, 660, h);
		ctx.beginPath();
		data.forEach((v, i) => {
			const x = 70 + i / (data.length - 1) * 660;
			const y = y0 + h - v / max * h;
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		});
		ctx.strokeStyle = color;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
	plot(acc, 64, 160, "#cfc6b4", 1);
	plot(loss, 272, 160, "#8fa08c", 1.5);
	ctx.fillStyle = "#9a9388";
	ctx.font = "12px ui-monospace, Menlo, monospace";
	ctx.fillText("DenseNet201  val acc  0.9784", 70, 454);
	return toTex(c, 1);
}
function dashboardTexture() {
	const { c, ctx } = makeCanvas(768, 480);
	panel(ctx, 768, 480);
	ctx.fillStyle = "#b7b1a6";
	ctx.fillText("data lab  ·  cohort explorer", 16, 18);
	[
		["rows", "128,430"],
		["features", "47"],
		["segments", "6"],
		["churn risk", "11.4%"]
	].forEach((card, i) => {
		const x = 24 + i * 186;
		ctx.fillStyle = "#211f1b";
		ctx.fillRect(x, 48, 174, 86);
		ctx.fillStyle = "#8a8478";
		ctx.font = "12px ui-monospace, Menlo, monospace";
		ctx.fillText(card[0], x + 14, 72);
		ctx.fillStyle = "#eee8dc";
		ctx.font = "26px 'Times New Roman', serif";
		ctx.fillText(card[1], x + 14, 110);
	});
	[
		.82,
		.64,
		.51,
		.44,
		.31,
		.22
	].forEach((b, i) => {
		const x = 48 + i * 118;
		ctx.fillStyle = "#2a2722";
		ctx.fillRect(x, 168, 88, 260);
		ctx.fillStyle = "#c4baa6";
		ctx.fillRect(x, 168 + 260 * (1 - b), 88, 260 * b);
		ctx.fillStyle = "#8a8478";
		ctx.font = "11px ui-monospace, Menlo, monospace";
		ctx.fillText(`S${i + 1}`, x + 32, 446);
	});
	return toTex(c, 1);
}
function netScreenTexture() {
	const { c, ctx } = makeCanvas(768, 480);
	panel(ctx, 768, 480);
	ctx.fillStyle = "#b7b1a6";
	ctx.fillText("architecture  ·  densenet block", 16, 18);
	const layers = [
		5,
		7,
		7,
		4
	];
	const xs = [
		90,
		280,
		470,
		660
	];
	const nodes = layers.map((n, li) => {
		const arr = [];
		for (let i = 0; i < n; i++) arr.push({
			x: xs[li],
			y: 80 + i * (340 / n) + 24
		});
		return arr;
	});
	ctx.strokeStyle = "rgba(200,190,170,0.22)";
	ctx.lineWidth = 1;
	for (let l = 0; l < nodes.length - 1; l++) for (const a of nodes[l]) for (const b of nodes[l + 1]) {
		ctx.beginPath();
		ctx.moveTo(a.x, a.y);
		ctx.lineTo(b.x, b.y);
		ctx.stroke();
	}
	ctx.fillStyle = "#d8d0c2";
	for (const layer of nodes) for (const p of layer) {
		ctx.beginPath();
		ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.fillStyle = "#8a8478";
	ctx.font = "11px ui-monospace, Menlo, monospace";
	[
		"input",
		"dense",
		"dense",
		"softmax"
	].forEach((t, i) => ctx.fillText(t, xs[i] - 16, 456));
	return toTex(c, 1);
}
function leafPlateTexture(kind) {
	const { c, ctx } = makeCanvas(512, 640);
	ctx.fillStyle = "#efe8dc";
	ctx.fillRect(0, 0, 512, 640);
	ctx.strokeStyle = "#1c1a16";
	ctx.strokeRect(18, 18, 476, 604);
	ctx.fillStyle = "#3d3a34";
	ctx.font = "13px 'Times New Roman', serif";
	ctx.fillText([
		"Solanum tuberosum — healthy",
		"Early blight — Alternaria",
		"Late blight — Phytophthora"
	][kind], 36, 48);
	ctx.fillStyle = "#6e6a62";
	ctx.font = "11px ui-monospace, Menlo, monospace";
	ctx.fillText("PLATE  0" + (kind + 1) + "   ·   field study", 36, 70);
	ctx.save();
	ctx.translate(256, 340);
	ctx.beginPath();
	ctx.moveTo(0, -180);
	ctx.bezierCurveTo(90, -140, 140, -20, 90, 140);
	ctx.bezierCurveTo(40, 200, -40, 200, -90, 140);
	ctx.bezierCurveTo(-140, -20, -90, -140, 0, -180);
	ctx.closePath();
	ctx.fillStyle = kind === 0 ? "#6f8a62" : kind === 1 ? "#7a7a48" : "#5d6b4e";
	ctx.fill();
	ctx.strokeStyle = "#2a3224";
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(0, -170);
	ctx.quadraticCurveTo(8, 0, 0, 170);
	ctx.stroke();
	const rnd = seedRand(kind + 3);
	if (kind !== 0) {
		const spots = kind === 1 ? 18 : 26;
		for (let i = 0; i < spots; i++) {
			ctx.beginPath();
			ctx.fillStyle = kind === 1 ? "rgba(90,60,20,0.55)" : "rgba(70,40,50,0.5)";
			ctx.ellipse((rnd() - .5) * 160, (rnd() - .5) * 240, 8 + rnd() * 16, 6 + rnd() * 10, rnd(), 0, Math.PI * 2);
			ctx.fill();
		}
	}
	ctx.restore();
	ctx.fillStyle = "#6e6a62";
	ctx.font = "12px 'Times New Roman', serif";
	ctx.fillText("Botanical reference for classification work.", 36, 600);
	return toTex(c, 1);
}
function ragScreenTexture() {
	const { c, ctx } = makeCanvas(1024, 320);
	panel(ctx, 1024, 320);
	ctx.fillStyle = "#b7b1a6";
	ctx.fillText("retrieval pipeline", 16, 18);
	const steps = [
		"Document",
		"Embedding",
		"Retrieve",
		"Rerank",
		"Context",
		"LLM",
		"Answer"
	];
	steps.forEach((s, i) => {
		const x = 28 + i * 142;
		ctx.fillStyle = "#24211c";
		ctx.fillRect(x, 110, 118, 88);
		ctx.strokeStyle = "#c4baa6";
		ctx.strokeRect(x, 110, 118, 88);
		ctx.fillStyle = "#eee8dc";
		ctx.font = "13px ui-monospace, Menlo, monospace";
		ctx.fillText(s, x + 14, 162);
		if (i < steps.length - 1) {
			ctx.fillStyle = "#8a8478";
			ctx.fillText("→", x + 122, 162);
		}
	});
	ctx.fillStyle = "#8a8478";
	ctx.font = "12px ui-monospace, Menlo, monospace";
	ctx.fillText("BM25  ·  dense  ·  Qdrant  ·  LangChain  ·  LlamaIndex", 28, 280);
	return toTex(c, 1);
}
function spatialScreenTexture() {
	const { c, ctx } = makeCanvas(768, 480);
	panel(ctx, 768, 480);
	ctx.fillStyle = "#b7b1a6";
	ctx.fillText("AGNXAI  ·  spatial workspace", 16, 18);
	ctx.strokeStyle = "#2c2a26";
	for (let i = 0; i < 8; i++) {
		ctx.beginPath();
		ctx.moveTo(40, 60 + i * 48);
		ctx.lineTo(728, 60 + i * 48);
		ctx.moveTo(40 + i * 98, 60);
		ctx.lineTo(40 + i * 98, 444);
		ctx.stroke();
	}
	const nodes = [
		[
			120,
			140,
			"docs"
		],
		[
			310,
			210,
			"embed"
		],
		[
			480,
			150,
			"space"
		],
		[
			250,
			320,
			"agent"
		],
		[
			540,
			330,
			"page"
		],
		[
			640,
			220,
			"query"
		]
	];
	ctx.strokeStyle = "rgba(220,210,190,0.4)";
	ctx.beginPath();
	ctx.moveTo(120, 140);
	ctx.lineTo(310, 210);
	ctx.lineTo(480, 150);
	ctx.lineTo(640, 220);
	ctx.moveTo(310, 210);
	ctx.lineTo(250, 320);
	ctx.lineTo(540, 330);
	ctx.stroke();
	nodes.forEach(([x, y, label]) => {
		ctx.fillStyle = "#eee8dc";
		ctx.beginPath();
		ctx.arc(Number(x), Number(y), 9, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#cfc6b4";
		ctx.font = "12px ui-monospace, Menlo, monospace";
		ctx.fillText(String(label), Number(x) + 14, Number(y) + 4);
	});
	return toTex(c, 1);
}
function hospitalScreenTexture() {
	const { c, ctx } = makeCanvas(768, 480);
	panel(ctx, 768, 480);
	ctx.fillStyle = "#b7b1a6";
	ctx.fillText("hospital platform  ·  demo-safe", 16, 18);
	[
		"Tenant A  ·  knowledge base",
		"Semantic search",
		"Retrieval pipeline",
		"Multilingual Q&A",
		"Audit trail"
	].forEach((r, i) => {
		ctx.fillStyle = i === 2 ? "#2a2722" : "#1d1b18";
		ctx.fillRect(24, 56 + i * 72, 720, 62);
		ctx.fillStyle = "#d8d2c6";
		ctx.font = "16px 'Times New Roman', serif";
		ctx.fillText(r, 48, 94 + i * 72);
		ctx.fillStyle = "#8a8478";
		ctx.font = "11px ui-monospace, Menlo, monospace";
		ctx.fillText("ok", 690, 94 + i * 72);
	});
	return toTex(c, 1);
}
function clockFaceTexture() {
	const { c, ctx } = makeCanvas(512, 512);
	ctx.fillStyle = "#efe8dc";
	ctx.beginPath();
	ctx.arc(256, 256, 248, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#2a2722";
	ctx.lineWidth = 6;
	ctx.stroke();
	for (let i = 0; i < 60; i++) {
		const a = i / 60 * Math.PI * 2 - Math.PI / 2;
		const major = i % 5 === 0;
		const r0 = major ? 198 : 214;
		const r1 = 232;
		ctx.beginPath();
		ctx.strokeStyle = "#1c1a16";
		ctx.lineWidth = major ? 4 : 1.2;
		ctx.moveTo(256 + Math.cos(a) * r0, 256 + Math.sin(a) * r0);
		ctx.lineTo(256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1);
		ctx.stroke();
	}
	return toTex(c, 1);
}
function createScreenKit() {
	return {
		code: codeScreenTexture(),
		chart: chartScreenTexture(),
		dash: dashboardTexture(),
		net: netScreenTexture(),
		rag: ragScreenTexture(),
		spatial: spatialScreenTexture(),
		hospital: hospitalScreenTexture(),
		leaf: [
			leafPlateTexture(0),
			leafPlateTexture(1),
			leafPlateTexture(2)
		],
		wood: woodTexture(),
		plaster: plasterTexture(),
		concrete: concreteTexture(),
		sky: skyTexture(),
		clock: clockFaceTexture()
	};
}
function disposeKit(kit) {
	const all = [
		kit.code,
		kit.chart,
		kit.dash,
		kit.net,
		kit.rag,
		kit.spatial,
		kit.hospital,
		...kit.leaf,
		kit.wood,
		kit.plaster,
		kit.concrete,
		kit.sky,
		kit.clock
	];
	for (const t of all) t.dispose();
}
var WALL = "#e4dcd0";
var TRIM = "#2a2722";
var CEIL = "#efe8dc";
function Wall({ position, args, color = WALL, kit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		receiveShadow: true,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			map: kit.plaster,
			roughness: .88,
			metalness: 0
		})]
	});
}
function Partition({ z, kit }) {
	const openingW = 4.2;
	const side = 8.2 / 2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
			kit,
			position: [
				-4.15,
				2,
				z
			],
			args: [
				side,
				4,
				.22
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
			kit,
			position: [
				4.15,
				2,
				z
			],
			args: [
				side,
				4,
				.22
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
			kit,
			position: [
				0,
				3.55,
				z
			],
			args: [
				openingW,
				.9,
				.22
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.12,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				4.28,
				.08,
				.28
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: TRIM,
				roughness: .5
			})]
		})
	] });
}
function Architecture({ kit }) {
	const length = 114;
	const zMid = -46;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				0,
				zMid
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [12.6, length] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4a3a2a",
				map: kit.wood,
				roughness: .62,
				metalness: .04
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				4.05,
				zMid
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [12.6, length] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: CEIL,
				roughness: .9
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
			kit,
			position: [
				-6.2,
				2,
				zMid
			],
			args: [
				.22,
				4,
				length
			]
		}),
		Array.from({ length: 18 }, (_, i) => {
			const z = 8 - i * 6.4;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
					kit,
					position: [
						6.2,
						2,
						z
					],
					args: [
						.22,
						4,
						.55
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						6.22,
						1.85,
						z - 3.1
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [5.7, 2.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#9eb0bc",
						transparent: true,
						opacity: .14,
						roughness: .05,
						metalness: .15
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						7.4,
						2.1,
						z - 3.1
					],
					rotation: [
						0,
						-Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [5.8, 4.2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: kit.sky,
						toneMapped: false
					})]
				})
			] }, i);
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
			kit,
			position: [
				0,
				2,
				10.9
			],
			args: [
				12.6,
				4,
				.28
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wall, {
			kit,
			position: [
				0,
				2,
				-103
			],
			args: [
				12.6,
				4,
				.28
			]
		}),
		[
			-7,
			-21,
			-35,
			-49,
			-63,
			-81,
			-91
		].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Partition, {
			z,
			kit
		}, z)),
		Array.from({ length: 16 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.92,
				6 - i * 7
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				12.4,
				.12,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#c4b8a8",
				roughness: .7
			})]
		}, i)),
		Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				3.98,
				4 - i * 8.5
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				6.4,
				.04,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f4efe4",
				emissive: "#f0ead8",
				emissiveIntensity: .9
			})]
		}, `l${i}`)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6.05,
				.08,
				zMid
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.06,
				.16,
				length
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: TRIM })]
		})
	] });
}
var look = new Vector3();
var desired = new Vector3();
var offset = new Vector3();
var sph = new Spherical();
function CameraRig() {
	const { camera, gl } = useThree();
	const sphRef = (0, import_react.useRef)({
		theta: 0,
		phi: 0,
		radius: 0
	});
	const drag = (0, import_react.useRef)({
		down: false,
		x: 0,
		y: 0
	});
	const resetToken = useStudio((s) => s.resetToken);
	const reduced = useStudio((s) => s.reducedMotion);
	const mobile = useStudio((s) => s.mobile);
	(0, import_react.useEffect)(() => {
		sphRef.current = {
			theta: 0,
			phi: 0,
			radius: 0
		};
	}, [resetToken]);
	(0, import_react.useEffect)(() => {
		const el = gl.domElement;
		const onDown = (e) => {
			if (e.button !== 0) return;
			drag.current = {
				down: true,
				x: e.clientX,
				y: e.clientY
			};
		};
		const onUp = () => {
			drag.current.down = false;
		};
		const onMove = (e) => {
			if (!drag.current.down || mobile) return;
			const dx = e.clientX - drag.current.x;
			const dy = e.clientY - drag.current.y;
			drag.current.x = e.clientX;
			drag.current.y = e.clientY;
			sphRef.current.theta -= dx * .005;
			sphRef.current.phi = MathUtils.clamp(sphRef.current.phi + dy * .004, -.45, .45);
		};
		const onWheel = (e) => {
			if (e.ctrlKey || e.metaKey) {
				e.preventDefault();
				sphRef.current.radius = MathUtils.clamp(sphRef.current.radius + e.deltaY * .002, -1.6, 2.4);
			}
		};
		el.addEventListener("pointerdown", onDown);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointermove", onMove);
		el.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			el.removeEventListener("pointerdown", onDown);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointermove", onMove);
			el.removeEventListener("wheel", onWheel);
		};
	}, [gl, mobile]);
	useFrame((_, delta) => {
		const d = Math.min(delta, .1);
		const scroll = useStudio.getState().scroll;
		const { position, target, fov } = samplePath(scroll);
		const o = sphRef.current;
		if (!drag.current.down) {
			const k = 1 - Math.exp(-d * 1.8);
			o.theta += (0 - o.theta) * k * .35;
			o.phi += (0 - o.phi) * k * .35;
		}
		sph.set(1, Math.PI / 2 + o.phi, o.theta);
		offset.setFromSpherical(sph).multiplyScalar(.85 + o.radius);
		desired.copy(position).add(offset);
		const lerp = reduced ? 1 : 1 - Math.exp(-d * (drag.current.down ? 10 : 2.4));
		camera.position.lerp(desired, lerp);
		look.copy(target);
		camera.lookAt(look);
		const cam = camera;
		cam.fov += (fov - cam.fov) * (reduced ? 1 : 1 - Math.exp(-d * 2));
		cam.updateProjectionMatrix();
		useStudio.getState().set({ camZ: camera.position.z });
	});
	return null;
}
function Lighting() {
	const neutral = useStudio((s) => s.neutral);
	const quality = useStudio((s) => s.quality);
	const shadows = quality !== "low";
	const warm = !neutral;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", {
			color: warm ? "#d7cbb8" : "#e6e4de",
			groundColor: warm ? "#3a322c" : "#6a6760",
			intensity: warm ? .42 : .58
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			intensity: warm ? .14 : .3,
			color: warm ? "#f0e6d4" : "#f4f1ea"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			position: [
				9.5,
				7.5,
				4
			],
			intensity: warm ? 1.35 : 1.05,
			color: warm ? "#f3e2c4" : "#f2f0ea",
			castShadow: shadows,
			"shadow-mapSize-width": quality === "high" ? 2048 : 1024,
			"shadow-mapSize-height": quality === "high" ? 2048 : 1024,
			"shadow-camera-near": 1,
			"shadow-camera-far": 40,
			"shadow-camera-left": -10,
			"shadow-camera-right": 10,
			"shadow-camera-top": 12,
			"shadow-camera-bottom": -12,
			"shadow-bias": -2e-4
		}),
		quality !== "low" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("spotLight", {
				position: [
					-1.2,
					3.4,
					1.2
				],
				intensity: warm ? 2.6 : 1.4,
				angle: .55,
				penumbra: .7,
				distance: 9,
				color: warm ? "#ffd7a8" : "#fff6e8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					2.4,
					2.4,
					-14
				],
				intensity: .9,
				distance: 10,
				color: "#dce6ee"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					2.2,
					-42
				],
				intensity: .85,
				distance: 10,
				color: "#d7e0c8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					2.5,
					-70
				],
				intensity: 1.05,
				distance: 14,
				color: "#efe8dc"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					0,
					2.4,
					-96
				],
				intensity: 1.1,
				distance: 10,
				color: "#f4efe4"
			})
		] }) : null
	] });
}
function readTime(mode, hour, minute) {
	if (mode === "manual") return {
		h: hour % 12,
		m: minute,
		s: 0
	};
	const d = /* @__PURE__ */ new Date();
	return {
		h: d.getHours() % 12,
		m: d.getMinutes(),
		s: d.getSeconds() + d.getMilliseconds() / 1e3
	};
}
function AnalogClock({ kit, position, rotation, scale = 1 }) {
	const hour = (0, import_react.useRef)(null);
	const minute = (0, import_react.useRef)(null);
	const second = (0, import_react.useRef)(null);
	useFrame(() => {
		const st = useStudio.getState();
		const t = readTime(st.clockMode, st.manualHour, st.manualMinute);
		const minutes = t.m + t.s / 60;
		const hours = t.h + minutes / 60;
		if (hour.current) hour.current.rotation.z = -(hours / 12) * Math.PI * 2;
		if (minute.current) minute.current.rotation.z = -(minutes / 60) * Math.PI * 2;
		if (second.current) second.current.rotation.z = -(t.s / 60) * Math.PI * 2;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation,
		scale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					0,
					-.04
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.28,
					.3,
					.08,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1c1b18",
					roughness: .35,
					metalness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					.012
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.25, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: kit.clock,
					roughness: .55,
					metalness: 0
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: hour,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.055,
						.03
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.018,
						.11,
						.008
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1a1814",
						roughness: .4
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: minute,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.08,
						.035
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.012,
						.16,
						.006
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1a1814",
						roughness: .4
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: second,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.09,
						.04
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.005,
						.18,
						.004
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#5c4030",
						roughness: .5
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					.045
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.014,
					12,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a1814" })]
			})
		]
	});
}
function isProjectId(id) {
	return !!id && PROJECTS.some((p) => p.id === id);
}
function Desk({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.72,
				0
			],
			castShadow: true,
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.9,
				.05,
				.78
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4a3426",
				roughness: .45,
				metalness: .05
			})]
		}), [-.84, .84].map((x) => [-.3, .3].map((z) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				.36,
				z
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.06,
				.72,
				.06
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2e241c",
				roughness: .6
			})]
		}, `${x}${z}`)))]
	});
}
function Chair({ position, rotation = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation: [
			0,
			rotation,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.48,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.48,
					.06,
					.48
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2a2722",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.86,
					-.2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.48,
					.56,
					.06
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2a2722",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.24,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.04,
					.04,
					.42,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1a1916",
					metalness: .6,
					roughness: .3
				})]
			}),
			[
				0,
				1,
				2,
				3,
				4
			].map((i) => {
				const a = i / 5 * Math.PI * 2;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						Math.cos(a) * .22,
						.05,
						Math.sin(a) * .22
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.04,
						8,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1a1916",
						metalness: .5,
						roughness: .35
					})]
				}, i);
			})
		]
	});
}
function Monitor({ position, rotation = [
	0,
	0,
	0
], map, w = .72, h = .44, id }) {
	const [hot, setHot] = (0, import_react.useState)(false);
	const mat = (0, import_react.useRef)(null);
	useFrame((_, delta) => {
		if (!mat.current) return;
		const target = hot ? 1 : .92;
		mat.current.opacity += (target - mat.current.opacity) * Math.min(1, delta * 6);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation,
		onPointerOver: (e) => {
			e.stopPropagation();
			setHot(true);
			if (id) useStudio.getState().set({ hovered: id });
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			setHot(false);
			useStudio.getState().set({ hovered: null });
			document.body.style.cursor = "auto";
		},
		onClick: (e) => {
			e.stopPropagation();
			if (isProjectId(id)) useStudio.getState().set({ activeProject: id });
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					-.02
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					w + .04,
					h + .04,
					.03
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#161512",
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, h] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				ref: mat,
				map,
				toneMapped: false,
				transparent: true,
				opacity: 1
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-h / 2 - .12,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.02,
					.02,
					.2,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a1916" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-h / 2 - .22,
					.02
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.02,
					.12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1a1916" })]
			})
		]
	});
}
function Laptop({ position, rotation = 0, map }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation: [
			0,
			rotation,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.01,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.32,
				.012,
				.22
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1b18",
				roughness: .3,
				metalness: .4
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				.11,
				-.1
			],
			rotation: [
				-.55,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.32,
				.2,
				.01
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1c1b18" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					0,
					.008
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.3, .18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map,
					toneMapped: false
				})]
			})]
		})]
	});
}
function Keyboard({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			.36,
			.02,
			.12
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#1f1d1a",
			roughness: .55
		})]
	});
}
function Plant({ position, scale = 1 }) {
	const leaves = (0, import_react.useMemo)(() => {
		return Array.from({ length: 7 }, (_, i) => {
			const a = i / 7 * Math.PI * 2;
			return {
				p: [
					Math.cos(a) * .12,
					.38 + i % 3 * .08,
					Math.sin(a) * .12
				],
				r: [
					.6,
					a,
					.2
				]
			};
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		scale,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.12,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.1,
				.12,
				.24,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4a3a2c",
				roughness: .8
			})]
		}), leaves.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: l.p,
			rotation: l.r,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.11,
				8,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: i % 2 ? "#4f6148" : "#3e513c",
				roughness: .7
			})]
		}, i))]
	});
}
function Books({ position, count = 10, axis = "x" }) {
	const colors = [
		"#4a3228",
		"#2f3a34",
		"#5a4634",
		"#2a2c32",
		"#6a4e3a",
		"#3a4038"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position,
		children: Array.from({ length: count }, (_, i) => {
			const h = .18 + i % 4 * .03;
			const thick = .028 + i % 3 * .006;
			const pos = axis === "x" ? [
				i * .04,
				h / 2,
				0
			] : [
				0,
				h / 2,
				i * .04
			];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: pos,
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: axis === "x" ? [
					thick,
					h,
					.14
				] : [
					.14,
					h,
					thick
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: colors[i % colors.length],
					roughness: .85
				})]
			}, i);
		})
	});
}
function Lamp({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.18,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.08,
					.12,
					.04,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1c1b18",
					metalness: .5,
					roughness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.42,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.012,
					.012,
					.48,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2a2722",
					metalness: .4,
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.12,
					.68,
					0
				],
				rotation: [
					0,
					0,
					-.7
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.09,
					.14,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cfc6b4",
					emissive: "#c4b496",
					emissiveIntensity: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
				position: [
					.16,
					.6,
					0
				],
				intensity: .55,
				distance: 4,
				color: "#f0d8b0"
			})
		]
	});
}
function Pedestal({ position, id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		onPointerOver: (e) => {
			e.stopPropagation();
			useStudio.getState().set({ hovered: id });
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			useStudio.getState().set({ hovered: null });
			document.body.style.cursor = "auto";
		},
		onClick: (e) => {
			e.stopPropagation();
			useStudio.getState().set({ activeProject: id });
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.45,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.7,
					.9,
					.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2c2a26",
					roughness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.91,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.78,
					.04,
					.78
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3a3630",
					roughness: .45
				})]
			}),
			children
		]
	});
}
function Frame({ position, rotation, map, w = .55, h = .72 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
			w + .05,
			h + .05,
			.03
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#1c1b18",
			roughness: .5
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				0,
				.018
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [w, h] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map,
				roughness: .8
			})]
		})]
	});
}
function Rug({ position, color, args }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		rotation: [
			-Math.PI / 2,
			0,
			0
		],
		receiveShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .95
		})]
	});
}
function Cup({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.035,
				.03,
				.07,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#efe8dc",
				roughness: .6
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.045,
				0,
				0
			],
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.022,
				.006,
				8,
				12,
				Math.PI
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#efe8dc",
				roughness: .6
			})]
		})]
	});
}
function Headphones({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		rotation: [
			.2,
			.4,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				0,
				0,
				Math.PI / 2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.07,
				.01,
				8,
				16,
				Math.PI
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1b18",
				roughness: .4
			})]
		}), [-1, 1].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				s * .07,
				0,
				0
			],
			rotation: [
				0,
				0,
				s * .2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.035,
				.035,
				.03,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2a2722",
				roughness: .5
			})]
		}, s))]
	});
}
function Notebook({ position, kit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position,
		rotation: [
			-Math.PI / 2,
			0,
			.3
		],
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.16, .22] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#efe8dc",
			map: kit.leaf[0],
			roughness: .85
		})]
	});
}
function NeuralField({ position }) {
	const layers = [
		5,
		7,
		7,
		4
	];
	const nodes = (0, import_react.useMemo)(() => {
		const pts = [];
		layers.forEach((n, li) => {
			for (let i = 0; i < n; i++) pts.push(new Vector3((li - 1.5) * .55, .35 + i * .22, 0));
		});
		return pts;
	}, []);
	const lineGeo = (0, import_react.useMemo)(() => {
		const pos = [];
		let start = 0;
		for (let l = 0; l < layers.length - 1; l++) {
			const aCount = layers[l];
			const bCount = layers[l + 1];
			for (let i = 0; i < aCount; i++) for (let j = 0; j < bCount; j++) {
				const a = nodes[start + i];
				const b = nodes[start + aCount + j];
				pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
			}
			start += aCount;
		}
		const g = new BufferGeometry();
		g.setAttribute("position", new Float32BufferAttribute(pos, 3));
		return g;
	}, [nodes]);
	(0, import_react.useEffect)(() => () => lineGeo.dispose(), [lineGeo]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineSegments", {
			geometry: lineGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("lineBasicMaterial", {
				color: "#cfc6b4",
				transparent: true,
				opacity: .28
			})
		}), nodes.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: p.toArray(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.045,
				10,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#efe8dc",
				emissive: "#cfc6b4",
				emissiveIntensity: .25,
				roughness: .3
			})]
		}, i))]
	});
}
function RagPipeline({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position,
		children: Array.from({ length: 7 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				(i - 3) * .85,
				1.2,
				0
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.62,
					.42,
					.12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1f1d1a",
					roughness: .4
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.065
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.56, .36] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: i === 5 ? "#d8d2c6" : "#3a3630" })]
				}),
				i < 6 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.42,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.22,
						.02,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cfc6b4",
						emissive: "#cfc6b4",
						emissiveIntensity: .2
					})]
				}) : null
			]
		}, i))
	});
}
function MiniHospital({ position }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.5,
					.56,
					.32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#d8d2c6",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.22,
					.18,
					.08
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.36,
					.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#c4baa6",
					roughness: .7
				})]
			}),
			[
				-.14,
				0,
				.14
			].map((y) => [-.12, .12].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.22 + y,
					.165
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.07,
					.06,
					.01
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6a7a86",
					emissive: "#8aa0b0",
					emissiveIntensity: .3
				})]
			}, `${x}${y}`)))
		]
	});
}
function SpatialNodes({ position }) {
	const pts = (0, import_react.useMemo)(() => [
		[
			-.28,
			.2,
			.1
		],
		[
			.22,
			.34,
			-.12
		],
		[
			.05,
			.5,
			.18
		],
		[
			-.1,
			.28,
			-.22
		],
		[
			.32,
			.18,
			.16
		]
	], []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position,
		children: pts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: p,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.16,
				.02,
				.22
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#efe8dc",
				roughness: .4
			})]
		}, i))
	});
}
function Bars({ position, values }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position,
		children: values.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				(i - values.length / 2) * .1,
				v / 2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.07,
				v,
				.07
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#cfc6b4",
				roughness: .5
			})]
		}, i))
	});
}
function Exhibit({ position, args, id, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position,
		onPointerOver: (e) => {
			e.stopPropagation();
			useStudio.getState().set({ hovered: id });
			document.body.style.cursor = "pointer";
		},
		onPointerOut: () => {
			useStudio.getState().set({ hovered: null });
			document.body.style.cursor = "auto";
		},
		onClick: (e) => {
			e.stopPropagation();
			useStudio.getState().set({ activeProject: id });
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1c1b18",
				roughness: .45
			})]
		}), children]
	});
}
function Rooms({ kit }) {
	const dense = useStudio((s) => s.quality) !== "low";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.workspace
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rug, {
					position: [
						0,
						.01,
						.4
					],
					color: "#3a322c",
					args: [4.4, 3.6]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, { position: [
					-.4,
					0,
					-.2
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chair, {
					position: [
						-.35,
						0,
						.72
					],
					rotation: Math.PI
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
					position: [
						-.95,
						1.22,
						-.48
					],
					rotation: [
						0,
						.18,
						0
					],
					map: kit.code,
					id: "code"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
					position: [
						-.18,
						1.28,
						-.52
					],
					rotation: [
						0,
						0,
						0
					],
					map: kit.chart,
					w: .9,
					h: .48,
					id: "chart"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
					position: [
						.62,
						1.18,
						-.42
					],
					rotation: [
						0,
						-.22,
						0
					],
					map: kit.dash,
					w: .58,
					h: .36,
					id: "dash"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, {
					position: [
						.55,
						.76,
						.05
					],
					rotation: -.3,
					map: kit.net
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { position: [
					-.35,
					.76,
					.08
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cup, { position: [
					.42,
					.79,
					.22
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { position: [
					-1.12,
					.79,
					.12
				] }),
				dense ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notebook, {
					position: [
						.18,
						.755,
						.22
					],
					kit
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { position: [
					-1.22,
					.74,
					.18
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, {
					position: [
						2.6,
						0,
						1.6
					],
					scale: 1.15
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, {
					position: [
						-5.2,
						0,
						2.2
					],
					scale: .9
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Books, {
					position: [
						-5.55,
						1.4,
						-1.6
					],
					count: dense ? 14 : 8,
					axis: "z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Books, {
					position: [
						-5.55,
						1.7,
						-1.6
					],
					count: dense ? 12 : 6,
					axis: "z"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-5.7,
						1.55,
						-1.2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.28,
						1.6,
						1.8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#3a322c",
						roughness: .7
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalogClock, {
					kit,
					position: [
						-5.95,
						2.35,
						1.15
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					scale: 1.35
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
					position: [
						-5.95,
						1.7,
						2.6
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					map: kit.leaf[0],
					w: .42,
					h: .55
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.data
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rug, {
					position: [
						0,
						.01,
						0
					],
					color: "#2e3438",
					args: [5, 4]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.2,
						-2.4
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						3.6,
						1.6,
						.08
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#161512" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.2,
						-2.35
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.4, 1.42] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: kit.dash,
						toneMapped: false
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exhibit, {
					position: [
						-2.2,
						.9,
						.4
					],
					args: [
						1.1,
						1.2,
						.7
					],
					id: "minabazar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.62,
							.36
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1, .6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: kit.dash,
							toneMapped: false
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exhibit, {
					position: [
						2.2,
						.9,
						.4
					],
					args: [
						1.1,
						1.2,
						.7
					],
					id: "realestate",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
						position: [
							0,
							.05,
							.4
						],
						values: [
							.22,
							.4,
							.33,
							.55,
							.28,
							.48
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, { position: [
					5.1,
					0,
					1.8
				] }),
				dense ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Books, {
					position: [
						-5.5,
						.9,
						0
					],
					count: 10,
					axis: "z"
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.ml
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rug, {
					position: [
						0,
						.01,
						0
					],
					color: "#2a2c32",
					args: [5.2, 4.2]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeuralField, { position: [
					0,
					.9,
					0
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.4,
						0
					],
					receiveShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.4,
						.08,
						1.2
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1c1b18",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
					position: [
						-2.6,
						1.3,
						-1.8
					],
					map: kit.net,
					w: 1.1,
					h: .62,
					id: "net"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
					position: [
						2.4,
						1.25,
						-1.6
					],
					rotation: [
						0,
						-.3,
						0
					],
					map: kit.chart,
					w: .9,
					h: .5,
					id: "mlchart"
				}),
				dense ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-5.95,
						1.8,
						0
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.4, 1.4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: kit.net,
						roughness: .7
					})]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.research
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rug, {
					position: [
						0,
						.01,
						0
					],
					color: "#34382e",
					args: [5, 4]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
					position: [
						-2.2,
						1.55,
						-2.2
					],
					map: kit.leaf[0]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
					position: [
						0,
						1.55,
						-2.2
					],
					map: kit.leaf[1]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
					position: [
						2.2,
						1.55,
						-2.2
					],
					map: kit.leaf[2]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exhibit, {
					position: [
						0,
						1.05,
						.6
					],
					args: [
						1.8,
						.08,
						.9
					],
					id: "potato",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, {
						position: [
							0,
							.4,
							-.4
						],
						map: kit.chart,
						w: .8,
						h: .46,
						id: "potato"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, {
					position: [
						5,
						0,
						1.5
					],
					scale: 1.2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, {
					position: [
						-5.1,
						0,
						1.6
					],
					scale: 1
				}),
				dense ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						-5.9,
						1.6,
						0
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						position: [
							0,
							.4,
							0
						],
						map: kit.leaf[1],
						w: .4,
						h: .52
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						position: [
							.7,
							.2,
							0
						],
						map: kit.leaf[2],
						w: .34,
						h: .44
					})]
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.llm
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rug, {
					position: [
						0,
						.01,
						0
					],
					color: "#2c3036",
					args: [6, 4]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RagPipeline, { position: [
					0,
					0,
					0
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.02,
						1.8
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						6.2,
						.04,
						.9
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1c1b18" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.4,
						1.82
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.2, .9] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: kit.rag,
						toneMapped: false
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Laptop, {
					position: [
						-2.4,
						.06,
						1.7
					],
					map: kit.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exhibit, {
					position: [
						3.2,
						.9,
						.2
					],
					args: [
						.9,
						1.2,
						.5
					],
					id: "chatbot"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.projects
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rug, {
					position: [
						0,
						.01,
						0
					],
					color: "#2e2c28",
					args: [7, 8]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pedestal, {
					position: [
						-2.4,
						0,
						2.2
					],
					id: "agnxai",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpatialNodes, { position: [
						0,
						.95,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pedestal, {
					position: [
						0,
						0,
						2.2
					],
					id: "hospital",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniHospital, { position: [
						0,
						.95,
						0
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pedestal, {
					position: [
						2.4,
						0,
						2.2
					],
					id: "minabazar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
						position: [
							0,
							.95,
							0
						],
						values: [
							.18,
							.32,
							.24,
							.4,
							.22
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Pedestal, {
					position: [
						-2.4,
						0,
						-1.6
					],
					id: "realestate",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.12,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.28,
							.28,
							.28
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#d8d2c6" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.32,
							0
						],
						rotation: [
							0,
							Math.PI / 4,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
							.22,
							.16,
							4
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#8a5a44" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pedestal, {
					position: [
						0,
						0,
						-1.6
					],
					id: "fer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.18,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.16, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#cfc6b4" })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pedestal, {
					position: [
						2.4,
						0,
						-1.6
					],
					id: "trading",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bars, {
						position: [
							0,
							.95,
							0
						],
						values: [
							.12,
							.28,
							.18,
							.36,
							.22,
							.3
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						2.2,
						-3.45
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.55,
						1.22,
						.04
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#161512" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						2.2,
						-3.4
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.4, 1.1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: kit.spatial,
						toneMapped: false
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.about
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rug, {
					position: [
						0,
						.01,
						.2
					],
					color: "#3a322c",
					args: [4.4, 3.2]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-2.2,
						.4,
						.4
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.4,
						.42,
						.55
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#4a3426",
						roughness: .5
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, { position: [
					-5.1,
					0,
					1.4
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { position: [
					-1.5,
					.42,
					.5
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Books, {
					position: [
						2.8,
						.9,
						-1.4
					],
					count: dense ? 16 : 8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						3.1,
						1.5,
						-1.5
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.28,
						1.8,
						2.2
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#3a322c" })]
				}),
				[
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-5.95,
						1.2 + i * .7,
						-.4 + i * .05
					],
					rotation: [
						0,
						Math.PI / 2,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.1,
						.5,
						.04
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#efe8dc",
						roughness: .8
					})]
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chair, {
					position: [
						-1.9,
						0,
						1.15
					],
					rotation: .4
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				0,
				0,
				ROOM_Z.contact
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.01,
						0
					],
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					receiveShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [2.4, 48] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e7e0d4",
						roughness: .9
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.4,
						-2.4
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.02,
						2.2,
						.02
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", { color: "#1c1b18" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plant, {
					position: [
						2.6,
						0,
						1.2
					],
					scale: .8
				})
			]
		})
	] });
}
function FogAndTone() {
	const { scene, gl } = useThree();
	const neutral = useStudio((s) => s.neutral);
	(0, import_react.useEffect)(() => {
		gl.toneMapping = 4;
		gl.toneMappingExposure = neutral ? 1.18 : 1.05;
		gl.outputColorSpace = SRGBColorSpace;
		scene.fog = new Fog(neutral ? "#cfc8bc" : "#1a1612", 12, 42);
		gl.setClearColor(neutral ? "#cfc8bc" : "#1a1612");
	}, [
		gl,
		scene,
		neutral
	]);
	return null;
}
function ReadyFlag() {
	const { gl } = useThree();
	(0, import_react.useEffect)(() => {
		useStudio.getState().set({
			ready: true,
			loadProgress: 1
		});
		const onLost = (e) => {
			e.preventDefault();
			useStudio.getState().set({
				webgl: false,
				readable: true
			});
		};
		gl.domElement.addEventListener("webglcontextlost", onLost, false);
		return () => gl.domElement.removeEventListener("webglcontextlost", onLost);
	}, [gl]);
	return null;
}
function World() {
	const kit = (0, import_react.useMemo)(() => {
		const k = createScreenKit();
		k.wood.repeat.set(14, 90);
		k.plaster.repeat.set(6, 4);
		return k;
	}, []);
	const quality = useStudio((s) => s.quality);
	(0, import_react.useEffect)(() => {
		return () => disposeKit(kit);
	}, [kit]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadyFlag, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FogAndTone, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraRig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lighting, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Architecture, { kit }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rooms, { kit }),
		quality !== "low" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactShadows, {
			position: [
				0,
				.015,
				-40
			],
			opacity: .35,
			scale: 90,
			blur: 2.4,
			far: 8,
			color: "#1a1612"
		}) : null
	] });
}
function Experience() {
	const quality = useStudio((s) => s.quality);
	const q = qualitySettings(quality);
	const [dpr, setDpr] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		setDpr(q.dpr);
	}, [q.dpr]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
		className: "studio-canvas",
		shadows: q.shadows,
		dpr,
		gl: {
			antialias: q.antialias,
			powerPreference: "high-performance",
			alpha: false,
			stencil: false,
			depth: true
		},
		camera: {
			fov: 34,
			near: .08,
			far: 90,
			position: [
				1.7,
				1.38,
				2.35
			]
		},
		onCreated: ({ gl }) => {
			gl.domElement.style.touchAction = "none";
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
			fallback: null,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(World, {})
		})
	});
}
//#endregion
export { Experience };
