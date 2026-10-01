import * as THREE from "three";

function seedRand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2d context");
  return { c, ctx };
}

function toTex(c: HTMLCanvasElement, repeat = 1) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat, repeat);
  t.needsUpdate = true;
  return t;
}

export function woodTexture() {
  const { c, ctx } = makeCanvas(512, 512);
  const rnd = seedRand(42);
  ctx.fillStyle = "#3a2a1c";
  ctx.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y++) {
    const n = Math.sin(y * 0.08 + rnd() * 0.4) * 6;
    const shade = 38 + Math.floor(rnd() * 22) + Math.sin(y * 0.03) * 8;
    ctx.fillStyle = `rgb(${shade + 18},${shade - 2},${shade - 18})`;
    ctx.fillRect(0, y, 512, 1);
    ctx.strokeStyle = `rgba(20,12,8,${0.08 + rnd() * 0.12})`;
    ctx.beginPath();
    ctx.moveTo(0, y + n);
    ctx.bezierCurveTo(180, y + n * 0.4, 340, y - n, 512, y + n * 0.2);
    ctx.stroke();
  }
  return toTex(c, 8);
}

export function plasterTexture() {
  const { c, ctx } = makeCanvas(256, 256);
  const rnd = seedRand(9);
  ctx.fillStyle = "#d8d0c4";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 1800; i++) {
    const x = rnd() * 256;
    const y = rnd() * 256;
    const v = 200 + rnd() * 28;
    ctx.fillStyle = `rgba(${v},${v - 8},${v - 16},${0.18})`;
    ctx.fillRect(x, y, 2, 2);
  }
  return toTex(c, 4);
}

export function concreteTexture() {
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

export function skyTexture() {
  const { c, ctx } = makeCanvas(8, 512);
  const g = ctx.createLinearGradient(0, 0, 0, 512);
  g.addColorStop(0, "#c9c2b4");
  g.addColorStop(0.42, "#9aa7b0");
  g.addColorStop(0.72, "#6d7986");
  g.addColorStop(1, "#3e4550");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 8, 512);
  return toTex(c, 1);
}

function panel(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#161512";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#1e1c18";
  ctx.fillRect(0, 0, w, 28);
  ctx.fillStyle = "#8a8478";
  ctx.font = "11px ui-monospace, SFMono-Regular, Menlo, monospace";
}

export function codeScreenTexture() {
  const { c, ctx } = makeCanvas(768, 480);
  panel(ctx, 768, 480);
  ctx.fillStyle = "#b7b1a6";
  ctx.fillText("train.py  —  densenet201  ·  colab", 16, 18);
  const lines: [string, string][] = [
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
    ["# ", "best reported accuracy: 97.84%"],
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

export function chartScreenTexture() {
  const { c, ctx } = makeCanvas(768, 480);
  panel(ctx, 768, 480);
  ctx.fillStyle = "#b7b1a6";
  ctx.fillText("experiment  ·  training curves", 16, 18);
  ctx.fillStyle = "#d8d2c6";
  ctx.font = "13px ui-monospace, Menlo, monospace";
  ctx.fillText("acc", 24, 54);
  ctx.fillText("loss", 24, 260);
  const acc = [0.42, 0.61, 0.74, 0.82, 0.88, 0.91, 0.94, 0.958, 0.971, 0.9784];
  const loss = [1.4, 0.92, 0.61, 0.44, 0.32, 0.24, 0.19, 0.15, 0.12, 0.09];
  function plot(data: number[], y0: number, h: number, color: string, max: number) {
    ctx.strokeStyle = "#2c2a26";
    ctx.strokeRect(70, y0, 660, h);
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = 70 + (i / (data.length - 1)) * 660;
      const y = y0 + h - (v / max) * h;
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

export function dashboardTexture() {
  const { c, ctx } = makeCanvas(768, 480);
  panel(ctx, 768, 480);
  ctx.fillStyle = "#b7b1a6";
  ctx.fillText("data lab  ·  cohort explorer", 16, 18);
  const cards = [
    ["rows", "128,430"],
    ["features", "47"],
    ["segments", "6"],
    ["churn risk", "11.4%"],
  ];
  cards.forEach((card, i) => {
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
  const bars = [0.82, 0.64, 0.51, 0.44, 0.31, 0.22];
  bars.forEach((b, i) => {
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

export function netScreenTexture() {
  const { c, ctx } = makeCanvas(768, 480);
  panel(ctx, 768, 480);
  ctx.fillStyle = "#b7b1a6";
  ctx.fillText("architecture  ·  densenet block", 16, 18);
  const layers = [5, 7, 7, 4];
  const xs = [90, 280, 470, 660];
  const nodes: { x: number; y: number }[][] = layers.map((n, li) => {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push({ x: xs[li], y: 80 + i * (340 / n) + 24 });
    }
    return arr;
  });
  ctx.strokeStyle = "rgba(200,190,170,0.22)";
  ctx.lineWidth = 1;
  for (let l = 0; l < nodes.length - 1; l++) {
    for (const a of nodes[l]) {
      for (const b of nodes[l + 1]) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.fillStyle = "#d8d0c2";
  for (const layer of nodes) {
    for (const p of layer) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.fillStyle = "#8a8478";
  ctx.font = "11px ui-monospace, Menlo, monospace";
  ["input", "dense", "dense", "softmax"].forEach((t, i) => ctx.fillText(t, xs[i] - 16, 456));
  return toTex(c, 1);
}

export function leafPlateTexture(kind: 0 | 1 | 2) {
  const { c, ctx } = makeCanvas(512, 640);
  ctx.fillStyle = "#efe8dc";
  ctx.fillRect(0, 0, 512, 640);
  ctx.strokeStyle = "#1c1a16";
  ctx.strokeRect(18, 18, 476, 604);
  ctx.fillStyle = "#3d3a34";
  ctx.font = "13px 'Times New Roman', serif";
  const titles = ["Solanum tuberosum — healthy", "Early blight — Alternaria", "Late blight — Phytophthora"];
  ctx.fillText(titles[kind], 36, 48);
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
      ctx.ellipse((rnd() - 0.5) * 160, (rnd() - 0.5) * 240, 8 + rnd() * 16, 6 + rnd() * 10, rnd(), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  ctx.fillStyle = "#6e6a62";
  ctx.font = "12px 'Times New Roman', serif";
  ctx.fillText("Botanical reference for classification work.", 36, 600);
  return toTex(c, 1);
}

export function ragScreenTexture() {
  const { c, ctx } = makeCanvas(1024, 320);
  panel(ctx, 1024, 320);
  ctx.fillStyle = "#b7b1a6";
  ctx.fillText("retrieval pipeline", 16, 18);
  const steps = ["Document", "Embedding", "Retrieve", "Rerank", "Context", "LLM", "Answer"];
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

export function spatialScreenTexture() {
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
    [120, 140, "docs"],
    [310, 210, "embed"],
    [480, 150, "space"],
    [250, 320, "agent"],
    [540, 330, "page"],
    [640, 220, "query"],
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

export function hospitalScreenTexture() {
  const { c, ctx } = makeCanvas(768, 480);
  panel(ctx, 768, 480);
  ctx.fillStyle = "#b7b1a6";
  ctx.fillText("hospital platform  ·  demo-safe", 16, 18);
  const rows = ["Tenant A  ·  knowledge base", "Semantic search", "Retrieval pipeline", "Multilingual Q&A", "Audit trail"];
  rows.forEach((r, i) => {
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

export function clockFaceTexture() {
  const { c, ctx } = makeCanvas(512, 512);
  ctx.fillStyle = "#efe8dc";
  ctx.beginPath();
  ctx.arc(256, 256, 248, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#2a2722";
  ctx.lineWidth = 6;
  ctx.stroke();
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
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

export type ScreenKit = {
  code: THREE.CanvasTexture;
  chart: THREE.CanvasTexture;
  dash: THREE.CanvasTexture;
  net: THREE.CanvasTexture;
  rag: THREE.CanvasTexture;
  spatial: THREE.CanvasTexture;
  hospital: THREE.CanvasTexture;
  leaf: [THREE.CanvasTexture, THREE.CanvasTexture, THREE.CanvasTexture];
  wood: THREE.CanvasTexture;
  plaster: THREE.CanvasTexture;
  concrete: THREE.CanvasTexture;
  sky: THREE.CanvasTexture;
  clock: THREE.CanvasTexture;
};

export function createScreenKit(): ScreenKit {
  return {
    code: codeScreenTexture(),
    chart: chartScreenTexture(),
    dash: dashboardTexture(),
    net: netScreenTexture(),
    rag: ragScreenTexture(),
    spatial: spatialScreenTexture(),
    hospital: hospitalScreenTexture(),
    leaf: [leafPlateTexture(0), leafPlateTexture(1), leafPlateTexture(2)],
    wood: woodTexture(),
    plaster: plasterTexture(),
    concrete: concreteTexture(),
    sky: skyTexture(),
    clock: clockFaceTexture(),
  };
}

export function disposeKit(kit: ScreenKit) {
  const all: THREE.Texture[] = [
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
    kit.clock,
  ];
  for (const t of all) t.dispose();
}
