import { useEffect, useMemo, type ReactNode } from "react";
import * as THREE from "three";
import { useStudio } from "@/store/studio";
import type { ProjectId } from "@/content/portfolio";
import type { ScreenKit } from "@/lib/textures";
import { AnalogClock } from "@/studio/Clock";
import {
  Books,
  Chair,
  Cup,
  Desk,
  Frame,
  Headphones,
  Keyboard,
  Lamp,
  Laptop,
  Monitor,
  Notebook,
  Pedestal,
  Plant,
  Rug,
} from "@/studio/furniture";
import { ROOM_Z } from "@/studio/path";

function NeuralField({ position }: { position: [number, number, number] }) {
  const layers = [5, 7, 7, 4];
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    layers.forEach((n, li) => {
      for (let i = 0; i < n; i++) pts.push(new THREE.Vector3((li - 1.5) * 0.55, 0.35 + i * 0.22, 0));
    });
    return pts;
  }, []);

  const lineGeo = useMemo(() => {
    const pos: number[] = [];
    let start = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const aCount = layers[l];
      const bCount = layers[l + 1];
      for (let i = 0; i < aCount; i++) {
        for (let j = 0; j < bCount; j++) {
          const a = nodes[start + i];
          const b = nodes[start + aCount + j];
          pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
      start += aCount;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, [nodes]);

  useEffect(() => () => lineGeo.dispose(), [lineGeo]);

  return (
    <group position={position}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#cfc6b4" transparent opacity={0.28} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p.toArray()}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshStandardMaterial color="#efe8dc" emissive="#cfc6b4" emissiveIntensity={0.25} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function RagPipeline({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 7 }, (_, i) => (
        <group key={i} position={[(i - 3) * 0.85, 1.2, 0]}>
          <mesh>
            <boxGeometry args={[0.62, 0.42, 0.12]} />
            <meshStandardMaterial color="#1f1d1a" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.065]}>
            <planeGeometry args={[0.56, 0.36]} />
            <meshBasicMaterial color={i === 5 ? "#d8d2c6" : "#3a3630"} />
          </mesh>
          {i < 6 ? (
            <mesh position={[0.42, 0, 0]}>
              <boxGeometry args={[0.22, 0.02, 0.02]} />
              <meshStandardMaterial color="#cfc6b4" emissive="#cfc6b4" emissiveIntensity={0.2} />
            </mesh>
          ) : null}
        </group>
      ))}
    </group>
  );
}

function MiniHospital({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[0.5, 0.56, 0.32]} />
        <meshStandardMaterial color="#d8d2c6" roughness={0.7} />
      </mesh>
      <mesh position={[0.22, 0.18, 0.08]} castShadow>
        <boxGeometry args={[0.22, 0.36, 0.22]} />
        <meshStandardMaterial color="#c4baa6" roughness={0.7} />
      </mesh>
      {[-0.14, 0, 0.14].map((y) =>
        [-0.12, 0.12].map((x) => (
          <mesh key={`${x}${y}`} position={[x, 0.22 + y, 0.165]}>
            <boxGeometry args={[0.07, 0.06, 0.01]} />
            <meshStandardMaterial color="#6a7a86" emissive="#8aa0b0" emissiveIntensity={0.3} />
          </mesh>
        )),
      )}
    </group>
  );
}

function SpatialNodes({ position }: { position: [number, number, number] }) {
  const pts = useMemo(
    () =>
      [
        [-0.28, 0.2, 0.1],
        [0.22, 0.34, -0.12],
        [0.05, 0.5, 0.18],
        [-0.1, 0.28, -0.22],
        [0.32, 0.18, 0.16],
      ] as [number, number, number][],
    [],
  );
  return (
    <group position={position}>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.16, 0.02, 0.22]} />
          <meshStandardMaterial color="#efe8dc" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Bars({ position, values }: { position: [number, number, number]; values: number[] }) {
  return (
    <group position={position}>
      {values.map((v, i) => (
        <mesh key={i} position={[(i - values.length / 2) * 0.1, v / 2, 0]}>
          <boxGeometry args={[0.07, v, 0.07]} />
          <meshStandardMaterial color="#cfc6b4" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Exhibit({
  position,
  args,
  id,
  children,
}: {
  position: [number, number, number];
  args: [number, number, number];
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
      <mesh castShadow>
        <boxGeometry args={args} />
        <meshStandardMaterial color="#1c1b18" roughness={0.45} />
      </mesh>
      {children}
    </group>
  );
}

export function Rooms({ kit }: { kit: ScreenKit }) {
  const dense = useStudio((s) => s.quality) !== "low";

  return (
    <group>
      <group position={[0, 0, ROOM_Z.workspace]}>
        <Rug position={[0, 0.01, 0.4]} color="#3a322c" args={[4.4, 3.6]} />
        <Desk position={[-0.4, 0, -0.2]} />
        <Chair position={[-0.35, 0, 0.72]} rotation={Math.PI} />
        <Monitor position={[-0.95, 1.22, -0.48]} rotation={[0, 0.18, 0]} map={kit.code} id="code" />
        <Monitor position={[-0.18, 1.28, -0.52]} rotation={[0, 0, 0]} map={kit.chart} w={0.9} h={0.48} id="chart" />
        <Monitor
          position={[0.62, 1.18, -0.42]}
          rotation={[0, -0.22, 0]}
          map={kit.dash}
          w={0.58}
          h={0.36}
          id="dash"
        />
        <Laptop position={[0.55, 0.76, 0.05]} rotation={-0.3} map={kit.net} />
        <Keyboard position={[-0.35, 0.76, 0.08]} />
        <Cup position={[0.42, 0.79, 0.22]} />
        <Headphones position={[-1.12, 0.79, 0.12]} />
        {dense ? <Notebook position={[0.18, 0.755, 0.22]} kit={kit} /> : null}
        <Lamp position={[-1.22, 0.74, 0.18]} />
        <Plant position={[2.6, 0, 1.6]} scale={1.15} />
        <Plant position={[-5.2, 0, 2.2]} scale={0.9} />
        <Books position={[-5.55, 1.4, -1.6]} count={dense ? 14 : 8} axis="z" />
        <Books position={[-5.55, 1.7, -1.6]} count={dense ? 12 : 6} axis="z" />
        <mesh position={[-5.7, 1.55, -1.2]}>
          <boxGeometry args={[0.28, 1.6, 1.8]} />
          <meshStandardMaterial color="#3a322c" roughness={0.7} />
        </mesh>
        <AnalogClock kit={kit} position={[-5.95, 2.35, 1.15]} rotation={[0, Math.PI / 2, 0]} scale={1.35} />
        <Frame
          position={[-5.95, 1.7, 2.6]}
          rotation={[0, Math.PI / 2, 0]}
          map={kit.leaf[0]}
          w={0.42}
          h={0.55}
        />
      </group>

      <group position={[0, 0, ROOM_Z.data]}>
        <Rug position={[0, 0.01, 0]} color="#2e3438" args={[5, 4]} />
        <mesh position={[0, 1.2, -2.4]}>
          <boxGeometry args={[3.6, 1.6, 0.08]} />
          <meshStandardMaterial color="#161512" />
        </mesh>
        <mesh position={[0, 1.2, -2.35]}>
          <planeGeometry args={[3.4, 1.42]} />
          <meshBasicMaterial map={kit.dash} toneMapped={false} />
        </mesh>
        <Exhibit position={[-2.2, 0.9, 0.4]} args={[1.1, 1.2, 0.7]} id="minabazar">
          <mesh position={[0, 0.62, 0.36]}>
            <planeGeometry args={[1, 0.6]} />
            <meshBasicMaterial map={kit.dash} toneMapped={false} />
          </mesh>
        </Exhibit>
        <Exhibit position={[2.2, 0.9, 0.4]} args={[1.1, 1.2, 0.7]} id="realestate">
          <Bars position={[0, 0.05, 0.4]} values={[0.22, 0.4, 0.33, 0.55, 0.28, 0.48]} />
        </Exhibit>
        <Plant position={[5.1, 0, 1.8]} />
        {dense ? <Books position={[-5.5, 0.9, 0]} count={10} axis="z" /> : null}
      </group>

      <group position={[0, 0, ROOM_Z.ml]}>
        <Rug position={[0, 0.01, 0]} color="#2a2c32" args={[5.2, 4.2]} />
        <NeuralField position={[0, 0.9, 0]} />
        <mesh position={[0, 0.4, 0]} receiveShadow>
          <boxGeometry args={[2.4, 0.08, 1.2]} />
          <meshStandardMaterial color="#1c1b18" roughness={0.4} />
        </mesh>
        <Monitor position={[-2.6, 1.3, -1.8]} map={kit.net} w={1.1} h={0.62} id="net" />
        <Monitor position={[2.4, 1.25, -1.6]} rotation={[0, -0.3, 0]} map={kit.chart} w={0.9} h={0.5} id="mlchart" />
        {dense ? (
          <mesh position={[-5.95, 1.8, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[2.4, 1.4]} />
            <meshStandardMaterial map={kit.net} roughness={0.7} />
          </mesh>
        ) : null}
      </group>

      <group position={[0, 0, ROOM_Z.research]}>
        <Rug position={[0, 0.01, 0]} color="#34382e" args={[5, 4]} />
        <Frame position={[-2.2, 1.55, -2.2]} map={kit.leaf[0]} />
        <Frame position={[0, 1.55, -2.2]} map={kit.leaf[1]} />
        <Frame position={[2.2, 1.55, -2.2]} map={kit.leaf[2]} />
        <Exhibit position={[0, 1.05, 0.6]} args={[1.8, 0.08, 0.9]} id="potato">
          <Monitor position={[0, 0.4, -0.4]} map={kit.chart} w={0.8} h={0.46} id="potato" />
        </Exhibit>
        <Plant position={[5, 0, 1.5]} scale={1.2} />
        <Plant position={[-5.1, 0, 1.6]} scale={1} />
        {dense ? (
          <group position={[-5.9, 1.6, 0]} rotation={[0, Math.PI / 2, 0]}>
            <Frame position={[0, 0.4, 0]} map={kit.leaf[1]} w={0.4} h={0.52} />
            <Frame position={[0.7, 0.2, 0]} map={kit.leaf[2]} w={0.34} h={0.44} />
          </group>
        ) : null}
      </group>

      <group position={[0, 0, ROOM_Z.llm]}>
        <Rug position={[0, 0.01, 0]} color="#2c3036" args={[6, 4]} />
        <RagPipeline position={[0, 0, 0]} />
        <mesh position={[0, 0.02, 1.8]}>
          <boxGeometry args={[6.2, 0.04, 0.9]} />
          <meshStandardMaterial color="#1c1b18" />
        </mesh>
        <mesh position={[0, 1.4, 1.82]}>
          <planeGeometry args={[3.2, 0.9]} />
          <meshBasicMaterial map={kit.rag} toneMapped={false} />
        </mesh>
        <Laptop position={[-2.4, 0.06, 1.7]} map={kit.code} />
        <Exhibit position={[3.2, 0.9, 0.2]} args={[0.9, 1.2, 0.5]} id="chatbot" />
      </group>

      <group position={[0, 0, ROOM_Z.projects]}>
        <Rug position={[0, 0.01, 0]} color="#2e2c28" args={[7, 8]} />
        <Pedestal position={[-2.4, 0, 2.2]} id="agnxai">
          <SpatialNodes position={[0, 0.95, 0]} />
        </Pedestal>
        <Pedestal position={[0, 0, 2.2]} id="hospital">
          <MiniHospital position={[0, 0.95, 0]} />
        </Pedestal>
        <Pedestal position={[2.4, 0, 2.2]} id="minabazar">
          <Bars position={[0, 0.95, 0]} values={[0.18, 0.32, 0.24, 0.4, 0.22]} />
        </Pedestal>
        <Pedestal position={[-2.4, 0, -1.6]} id="realestate">
          <mesh position={[0, 1.12, 0]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial color="#d8d2c6" />
          </mesh>
          <mesh position={[0, 1.32, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[0.22, 0.16, 4]} />
            <meshStandardMaterial color="#8a5a44" />
          </mesh>
        </Pedestal>
        <Pedestal position={[0, 0, -1.6]} id="fer">
          <mesh position={[0, 1.18, 0]}>
            <circleGeometry args={[0.16, 16]} />
            <meshStandardMaterial color="#cfc6b4" />
          </mesh>
        </Pedestal>
        <Pedestal position={[2.4, 0, -1.6]} id="trading">
          <Bars position={[0, 0.95, 0]} values={[0.12, 0.28, 0.18, 0.36, 0.22, 0.3]} />
        </Pedestal>
        <mesh position={[0, 2.2, -3.45]}>
          <boxGeometry args={[2.55, 1.22, 0.04]} />
          <meshStandardMaterial color="#161512" />
        </mesh>
        <mesh position={[0, 2.2, -3.4]}>
          <planeGeometry args={[2.4, 1.1]} />
          <meshBasicMaterial map={kit.spatial} toneMapped={false} />
        </mesh>
      </group>

      <group position={[0, 0, ROOM_Z.about]}>
        <Rug position={[0, 0.01, 0.2]} color="#3a322c" args={[4.4, 3.2]} />
        <mesh position={[-2.2, 0.4, 0.4]} castShadow>
          <boxGeometry args={[1.4, 0.42, 0.55]} />
          <meshStandardMaterial color="#4a3426" roughness={0.5} />
        </mesh>
        <Plant position={[-5.1, 0, 1.4]} />
        <Lamp position={[-1.5, 0.42, 0.5]} />
        <Books position={[2.8, 0.9, -1.4]} count={dense ? 16 : 8} />
        <mesh position={[3.1, 1.5, -1.5]}>
          <boxGeometry args={[0.28, 1.8, 2.2]} />
          <meshStandardMaterial color="#3a322c" />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-5.95, 1.2 + i * 0.7, -0.4 + i * 0.05]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[1.1, 0.5, 0.04]} />
            <meshStandardMaterial color="#efe8dc" roughness={0.8} />
          </mesh>
        ))}
        <Chair position={[-1.9, 0, 1.15]} rotation={0.4} />
      </group>

      <group position={[0, 0, ROOM_Z.contact]}>
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[2.4, 48]} />
          <meshStandardMaterial color="#e7e0d4" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.4, -2.4]}>
          <boxGeometry args={[0.02, 2.2, 0.02]} />
          <meshStandardMaterial color="#1c1b18" />
        </mesh>
        <Plant position={[2.6, 0, 1.2]} scale={0.8} />
      </group>
    </group>
  );
}
