import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { qualitySettings } from "@/lib/quality";
import { useStudio } from "@/store/studio";
import { World } from "@/studio/World";

export function Experience() {
  const quality = useStudio((s) => s.quality);
  const q = qualitySettings(quality);
  const [dpr, setDpr] = useState<number | [number, number]>(1);

  useEffect(() => {
    setDpr(q.dpr);
  }, [q.dpr]);

  return (
    <Canvas
      className="studio-canvas"
      shadows={q.shadows}
      dpr={dpr}
      gl={{
        antialias: q.antialias,
        powerPreference: "high-performance",
        alpha: false,
        stencil: false,
        depth: true,
      }}
      camera={{ fov: 34, near: 0.08, far: 90, position: [1.7, 1.38, 2.35] }}
      onCreated={({ gl }) => {
        gl.domElement.style.touchAction = "none";
      }}
    >
      <Suspense fallback={null}>
        <World />
      </Suspense>
    </Canvas>
  );
}
