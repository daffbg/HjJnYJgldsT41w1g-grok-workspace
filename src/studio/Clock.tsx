import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useStudio } from "@/store/studio";
import type { ScreenKit } from "@/lib/textures";

function readTime(mode: "system" | "manual", hour: number, minute: number) {
  if (mode === "manual") {
    return { h: hour % 12, m: minute, s: 0 };
  }
  const d = new Date();
  return {
    h: d.getHours() % 12,
    m: d.getMinutes(),
    s: d.getSeconds() + d.getMilliseconds() / 1000,
  };
}

export function AnalogClock({
  kit,
  position,
  rotation,
  scale = 1,
}: {
  kit: ScreenKit;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  const hour = useRef<Group>(null);
  const minute = useRef<Group>(null);
  const second = useRef<Group>(null);

  useFrame(() => {
    const st = useStudio.getState();
    const t = readTime(st.clockMode, st.manualHour, st.manualMinute);
    const minutes = t.m + t.s / 60;
    const hours = t.h + minutes / 60;
    if (hour.current) hour.current.rotation.z = -(hours / 12) * Math.PI * 2;
    if (minute.current) minute.current.rotation.z = -(minutes / 60) * Math.PI * 2;
    if (second.current) second.current.rotation.z = -(t.s / 60) * Math.PI * 2;
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.04]} castShadow>
        <cylinderGeometry args={[0.28, 0.3, 0.08, 32]} />
        <meshStandardMaterial color="#1c1b18" roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <circleGeometry args={[0.25, 48]} />
        <meshStandardMaterial map={kit.clock} roughness={0.55} metalness={0} />
      </mesh>
      <group ref={hour}>
        <mesh position={[0, 0.055, 0.03]}>
          <boxGeometry args={[0.018, 0.11, 0.008]} />
          <meshStandardMaterial color="#1a1814" roughness={0.4} />
        </mesh>
      </group>
      <group ref={minute}>
        <mesh position={[0, 0.08, 0.035]}>
          <boxGeometry args={[0.012, 0.16, 0.006]} />
          <meshStandardMaterial color="#1a1814" roughness={0.4} />
        </mesh>
      </group>
      <group ref={second}>
        <mesh position={[0, 0.09, 0.04]}>
          <boxGeometry args={[0.005, 0.18, 0.004]} />
          <meshStandardMaterial color="#5c4030" roughness={0.5} />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.045]}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshStandardMaterial color="#1a1814" />
      </mesh>
    </group>
  );
}
