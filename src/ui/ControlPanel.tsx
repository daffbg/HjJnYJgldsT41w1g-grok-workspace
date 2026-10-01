import { BookOpen, RotateCcw, Settings2, Volume2, VolumeX, X } from "lucide-react";
import { setAmbient } from "@/lib/ambient";
import { cn } from "@/lib/cn";
import { useStudio } from "@/store/studio";

export function ControlPanel() {
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

  return (
    <div className="control-wrap">
      <div className="control-actions">
        <button
          type="button"
          className="icon-btn"
          aria-label={open ? "Close controls" : "Open controls"}
          aria-expanded={open}
          onClick={() => set({ controlsOpen: !open })}
        >
          {open ? <X size={18} strokeWidth={1.6} /> : <Settings2 size={18} strokeWidth={1.6} />}
        </button>
      </div>
      <div className={cn("control-panel", open && "is-open")}>
        <p className="control-title">Studio</p>
        <div className="control-row">
          <span>Neutral mode</span>
          <button
            type="button"
            role="switch"
            aria-checked={neutral}
            className={cn("switch", neutral && "is-on")}
            onClick={() => set({ neutral: !neutral })}
          />
        </div>
        <div className="control-row">
          <span>Clock</span>
          <button
            type="button"
            className="text-btn"
            onClick={() => set({ clockMode: clockMode === "system" ? "manual" : "system" })}
          >
            {clockMode === "system" ? "System time" : "Manual"}
          </button>
        </div>
        {clockMode === "manual" ? (
          <div className="control-sliders">
            <label>
              Hour
              <input
                type="range"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => set({ manualHour: Number(e.target.value) })}
              />
              <span className="tabular">{String(hour).padStart(2, "0")}</span>
            </label>
            <label>
              Minute
              <input
                type="range"
                min={0}
                max={59}
                value={minute}
                onChange={(e) => set({ manualMinute: Number(e.target.value) })}
              />
              <span className="tabular">{String(minute).padStart(2, "0")}</span>
            </label>
          </div>
        ) : null}
        <div className="control-row">
          <span>Quality</span>
          <button type="button" className="text-btn" onClick={cycleQuality}>
            {quality}
          </button>
        </div>
        <div className="control-row">
          <span>Sound</span>
          <button
            type="button"
            className="icon-btn tight"
            aria-label={sound ? "Mute" : "Unmute"}
            onClick={() => {
              const next = !sound;
              set({ sound: next });
              void setAmbient(next);
            }}
          >
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
        <div className="control-row">
          <span>Camera</span>
          <button type="button" className="text-btn" onClick={resetCamera}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
        <div className="control-row">
          <span>Readable</span>
          <button
            type="button"
            className="text-btn"
            onClick={() => set({ readable: !readable, controlsOpen: false })}
          >
            <BookOpen size={14} /> {readable ? "Studio" : "Page"}
          </button>
        </div>
      </div>
    </div>
  );
}
