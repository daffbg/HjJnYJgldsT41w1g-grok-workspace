let ctx: AudioContext | null = null;
let nodes: { noise: AudioBufferSourceNode; gain: GainNode; filter: BiquadFilterNode } | null = null;

function brownNoiseBuffer(ac: AudioContext) {
  const length = ac.sampleRate * 4;
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  return buffer;
}

export async function setAmbient(on: boolean) {
  if (!on) {
    if (nodes) {
      nodes.gain.gain.linearRampToValueAtTime(0, (ctx?.currentTime ?? 0) + 0.3);
      window.setTimeout(() => {
        nodes?.noise.stop();
        nodes = null;
      }, 350);
    }
    return;
  }
  const AC = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
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
  gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.8);
  nodes = { noise, gain, filter };
}
