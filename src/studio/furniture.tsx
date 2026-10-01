import { type ReactNode, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PROJECTS, type ProjectId } from "@/content/portfolio";
import { useStudio } from "@/store/studio";
import type { ScreenKit } from "@/lib/textures";

function isProjectId(id: string | undefined): id is ProjectId {
  return !!id && PROJECTS.some((p) => p.id === id);
}

export function Desk({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.05, 0.78]} />
        <meshStandardMaterial color="#4a3426" roughness={0.45} metalness={0.05} />
      </mesh>
      {[-0.84, 0.84].map((x) =>
        [-0.3, 0.3].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.36, z]} castShadow>
            <boxGeometry args={[0.06, 0.72, 0.06]} />
            <meshStandardMaterial color="#2e241c" roughness={0.6} />
          </mesh>
        )),
      )}
    </group>
  );
}

export function Chair({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.48, 0.06, 0.48]} />
        <meshStandardMaterial color="#2a2722" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.86, -0.2]} castShadow>
        <boxGeometry args={[0.48, 0.56, 0.06]} />
        <meshStandardMaterial color="#2a2722" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.42, 8]} />
        <meshStandardMaterial color="#1a1916" metalness={0.6} roughness={0.3} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.22, 0.05, Math.sin(a) * 0.22]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#1a1916" metalness={0.5} roughness={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Monitor({
  position,
  rotation = [0, 0, 0],
  map,
  w = 0.72,
  h = 0.44,
  id,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  map: THREE.Texture;
  w?: number;
  h?: number;
  id?: string;
}) {
  const [hot, setHot] = useState(false);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((_, delta) => {
    if (!mat.current) return;
    const target = hot ? 1 : 0.92;
    mat.current.opacity += (target - mat.current.opacity) * Math.min(1, delta * 6);
  });
  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHot(true);
        if (id) useStudio.getState().set({ hovered: id });
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHot(false);
        useStudio.getState().set({ hovered: null });
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (isProjectId(id)) useStudio.getState().set({ activeProject: id });
      }}
    >
      <mesh position={[0, 0, -0.02]} castShadow>
        <boxGeometry args={[w + 0.04, h + 0.04, 0.03]} />
        <meshStandardMaterial color="#161512" roughness={0.35} />
      </mesh>
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial ref={mat} map={map} toneMapped={false} transparent opacity={1} />
      </mesh>
      <mesh position={[0, -h / 2 - 0.12, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
        <meshStandardMaterial color="#1a1916" />
      </mesh>
      <mesh position={[0, -h / 2 - 0.22, 0.02]}>
        <boxGeometry args={[0.22, 0.02, 0.12]} />
        <meshStandardMaterial color="#1a1916" />
      </mesh>
    </group>
  );
}

export function Laptop({
  position,
  rotation = 0,
  map,
}: {
  position: [number, number, number];
  rotation?: number;
  map: THREE.Texture;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 0.01, 0]} castShadow>
        <boxGeometry args={[0.32, 0.012, 0.22]} />
        <meshStandardMaterial color="#1c1b18" roughness={0.3} metalness={0.4} />
      </mesh>
      <group position={[0, 0.11, -0.1]} rotation={[-0.55, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.32, 0.2, 0.01]} />
          <meshStandardMaterial color="#1c1b18" />
        </mesh>
        <mesh position={[0, 0, 0.008]}>
          <planeGeometry args={[0.3, 0.18]} />
          <meshBasicMaterial map={map} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

export function Keyboard({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[0.36, 0.02, 0.12]} />
      <meshStandardMaterial color="#1f1d1a" roughness={0.55} />
    </mesh>
  );
}

export function Plant({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const leaves = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const a = (i / 7) * Math.PI * 2;
      return {
        p: [Math.cos(a) * 0.12, 0.38 + (i % 3) * 0.08, Math.sin(a) * 0.12] as [number, number, number],
        r: [0.6, a, 0.2] as [number, number, number],
      };
    });
  }, []);
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.24, 10]} />
        <meshStandardMaterial color="#4a3a2c" roughness={0.8} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh key={i} position={l.p} rotation={l.r} castShadow>
          <sphereGeometry args={[0.11, 8, 6]} />
          <meshStandardMaterial color={i % 2 ? "#4f6148" : "#3e513c"} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

export function Books({
  position,
  count = 10,
  axis = "x",
}: {
  position: [number, number, number];
  count?: number;
  axis?: "x" | "z";
}) {
  const colors = ["#4a3228", "#2f3a34", "#5a4634", "#2a2c32", "#6a4e3a", "#3a4038"];
  return (
    <group position={position}>
      {Array.from({ length: count }, (_, i) => {
        const h = 0.18 + (i % 4) * 0.03;
        const thick = 0.028 + (i % 3) * 0.006;
        const pos: [number, number, number] = axis === "x" ? [i * 0.04, h / 2, 0] : [0, h / 2, i * 0.04];
        return (
          <mesh key={i} position={pos} castShadow>
            <boxGeometry args={axis === "x" ? [thick, h, 0.14] : [0.14, h, thick]} />
            <meshStandardMaterial color={colors[i % colors.length]} roughness={0.85} />
          </mesh>
        );
      })}
    </group>
  );
}

export function Lamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.04, 12]} />
        <meshStandardMaterial color="#1c1b18" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.48, 8]} />
        <meshStandardMaterial color="#2a2722" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0.12, 0.68, 0]} rotation={[0, 0, -0.7]}>
        <coneGeometry args={[0.09, 0.14, 12]} />
        <meshStandardMaterial color="#cfc6b4" emissive="#c4b496" emissiveIntensity={0.35} />
      </mesh>
      <pointLight position={[0.16, 0.6, 0]} intensity={0.55} distance={4} color="#f0d8b0" />
    </group>
  );
}

export function Pedestal({
  position,
  id,
  children,
}: {
  position: [number, number, number];
  id: ProjectId;
  children?: ReactNode;
}) {
  return (
    <group
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        useStudio.getState().set({ hovered: id });
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        useStudio.getState().set({ hovered: null });
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        useStudio.getState().set({ activeProject: id });
      }}
    >
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.9, 0.7]} />
        <meshStandardMaterial color="#2c2a26" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <boxGeometry args={[0.78, 0.04, 0.78]} />
        <meshStandardMaterial color="#3a3630" roughness={0.45} />
      </mesh>
      {children}
    </group>
  );
}

export function Frame({
  position,
  rotation,
  map,
  w = 0.55,
  h = 0.72,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  map: THREE.Texture;
  w?: number;
  h?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[w + 0.05, h + 0.05, 0.03]} />
        <meshStandardMaterial color="#1c1b18" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.018]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={map} roughness={0.8} />
      </mesh>
    </group>
  );
}

export function Rug({
  position,
  color,
  args,
}: {
  position: [number, number, number];
  color: string;
  args: [number, number];
}) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  );
}

export function Cup({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.035, 0.03, 0.07, 12]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.6} />
      </mesh>
      <mesh position={[0.045, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.022, 0.006, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#efe8dc" roughness={0.6} />
      </mesh>
    </group>
  );
}

export function Headphones({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0.2, 0.4, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.07, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1c1b18" roughness={0.4} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.07, 0, 0]} rotation={[0, 0, s * 0.2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 12]} />
          <meshStandardMaterial color="#2a2722" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export function Notebook({ position, kit }: { position: [number, number, number]; kit: ScreenKit }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0.3]} castShadow>
      <planeGeometry args={[0.16, 0.22]} />
      <meshStandardMaterial color="#efe8dc" map={kit.leaf[0]} roughness={0.85} />
    </mesh>
  );
}
