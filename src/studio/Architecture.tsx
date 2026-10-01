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
  const openingW = 4.2;
  const side = 8.2 / 2;
  return (
    <group>
      <Wall kit={kit} position={[-4.15, 2, z]} args={[side, 4, 0.22]} />
      <Wall kit={kit} position={[4.15, 2, z]} args={[side, 4, 0.22]} />
      <Wall kit={kit} position={[0, 3.55, z]} args={[openingW, 0.9, 0.22]} />
      <mesh position={[0, 3.12, z]}>
        <boxGeometry args={[4.28, 0.08, 0.28]} />
        <meshStandardMaterial color={TRIM} roughness={0.5} />
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
        <meshStandardMaterial color="#4a3a2a" map={kit.wood} roughness={0.62} metalness={0.04} />
      </mesh>
      <mesh position={[0, 4.05, zMid]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12.6, length]} />
        <meshStandardMaterial color={CEIL} roughness={0.9} />
      </mesh>

      <Wall kit={kit} position={[-6.2, 2, zMid]} args={[0.22, 4, length]} />

      {Array.from({ length: 18 }, (_, i) => {
        const z = 8 - i * 6.4;
        return (
          <group key={i}>
            <Wall kit={kit} position={[6.2, 2, z]} args={[0.22, 4, 0.55]} />
            <mesh position={[6.22, 1.85, z - 3.1]}>
              <planeGeometry args={[5.7, 2.8]} />
              <meshStandardMaterial color="#9eb0bc" transparent opacity={0.14} roughness={0.05} metalness={0.15} />
            </mesh>
            <mesh position={[7.4, 2.1, z - 3.1]} rotation={[0, -Math.PI / 2, 0]}>
              <planeGeometry args={[5.8, 4.2]} />
              <meshBasicMaterial map={kit.sky} toneMapped={false} />
            </mesh>
          </group>
        );
      })}

      <Wall kit={kit} position={[0, 2, 10.9]} args={[12.6, 4, 0.28]} />
      <Wall kit={kit} position={[0, 2, -103]} args={[12.6, 4, 0.28]} />

      {[-7, -21, -35, -49, -63, -81, -91].map((z) => (
        <Partition key={z} z={z} kit={kit} />
      ))}

      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={i} position={[0, 3.92, 6 - i * 7]}>
          <boxGeometry args={[12.4, 0.12, 0.18]} />
          <meshStandardMaterial color="#c4b8a8" roughness={0.7} />
        </mesh>
      ))}

      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={`l${i}`} position={[0, 3.98, 4 - i * 8.5]}>
          <boxGeometry args={[6.4, 0.04, 0.12]} />
          <meshStandardMaterial color="#f4efe4" emissive="#f0ead8" emissiveIntensity={0.9} />
        </mesh>
      ))}

      <mesh position={[-6.05, 0.08, zMid]}>
        <boxGeometry args={[0.06, 0.16, length]} />
        <meshStandardMaterial color={TRIM} />
      </mesh>
    </group>
  );
}
