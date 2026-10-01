import type { ScreenKit } from "@/lib/textures";

const WALL = "#e4dcd0";
const TRIM = "#2a2722";
const CEIL = "#efe8dc";

function Wall({
  position,
  args,
  color = WALL,
  kit,
}: {
  position: [number, number, number];
  args: [number, number, number];
  color?: string;
  kit: ScreenKit;
}) {
  return (
    <mesh position={position} receiveShadow castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} map={kit.plaster} roughness={0.88} metalness={0} />
    </mesh>
  );
}

function Partition({ z, kit }: { z: number; kit: ScreenKit }) {
  const openingW = 4.4;
  const side = (12.4 - openingW) / 2;
  const xOff = openingW / 2 + side / 2;
  return (
    <group>
      <Wall kit={kit} position={[-xOff, 2, z]} args={[side, 4, 0.22]} />
      <Wall kit={kit} position={[xOff, 2, z]} args={[side, 4, 0.22]} />
      <Wall kit={kit} position={[0, 3.55, z]} args={[openingW, 0.9, 0.22]} />
      <mesh position={[0, 3.12, z]}>
        <boxGeometry args={[openingW + 0.08, 0.08, 0.28]} />
        <meshStandardMaterial color={TRIM} roughness={0.5} />
      </mesh>
    </group>
  );
}

function Window({ z }: { z: number }) {
  return (
    <group position={[6.08, 1.9, z]}>
      <mesh rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.3, 2.0]} />
        <meshBasicMaterial color="#d7d0c4" toneMapped={false} />
      </mesh>
      <mesh position={[-0.02, 1.08, 0]}>
        <boxGeometry args={[0.1, 0.08, 2.46]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <mesh position={[-0.02, -1.08, 0]}>
        <boxGeometry args={[0.1, 0.08, 2.46]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <mesh position={[-0.02, 0, 1.18]}>
        <boxGeometry args={[0.1, 2.16, 0.08]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <mesh position={[-0.02, 0, -1.18]}>
        <boxGeometry args={[0.1, 2.16, 0.08]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
    </group>
  );
}

export function Architecture({ kit }: { kit: ScreenKit }) {
  const length = 114;
  const zMid = -46;
  return (
    <group>
      <mesh position={[0, 0, zMid]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12.6, length]} />
        <meshStandardMaterial color="#8a6d52" map={kit.wood} roughness={0.55} metalness={0.04} />
      </mesh>
      <mesh position={[0, 4.05, zMid]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12.6, length]} />
        <meshStandardMaterial color={CEIL} roughness={0.9} />
      </mesh>

      <Wall kit={kit} position={[-6.2, 2, zMid]} args={[0.22, 4, length]} />
      <Wall kit={kit} position={[6.2, 2, zMid]} args={[0.22, 4, length]} />

      {[-1.2, -14, -28, -42, -56, -70, -86, -96].map((z) => (
        <Window key={z} z={z} />
      ))}

      <Wall kit={kit} position={[0, 2, 10.9]} args={[12.6, 4, 0.28]} />
      <Wall kit={kit} position={[0, 2, -103]} args={[12.6, 4, 0.28]} />

      {[-7, -21, -35, -49, -63, -81, -91].map((z) => (
        <Partition key={z} z={z} kit={kit} />
      ))}

      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={i} position={[0, 3.92, 6 - i * 7]}>
          <boxGeometry args={[12.4, 0.12, 0.18]} />
          <meshStandardMaterial color="#d8cec0" roughness={0.7} />
        </mesh>
      ))}

      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={`l${i}`} position={[0, 3.96, 4 - i * 8.5]}>
          <boxGeometry args={[5.6, 0.05, 0.16]} />
          <meshStandardMaterial color="#fff6e8" emissive="#f2ead8" emissiveIntensity={1.4} />
        </mesh>
      ))}

      <mesh position={[-6.05, 0.08, zMid]}>
        <boxGeometry args={[0.06, 0.16, length]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
      <mesh position={[6.05, 0.08, zMid]}>
        <boxGeometry args={[0.06, 0.16, length]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
    </group>
  );
}
