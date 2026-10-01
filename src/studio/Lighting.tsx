import { useStudio } from "@/store/studio";

export function Lighting() {
  const neutral = useStudio((s) => s.neutral);
  const quality = useStudio((s) => s.quality);
  const shadows = quality !== "low";
  const warm = !neutral;

  return (
    <>
      <hemisphereLight
        color={warm ? "#d7cbb8" : "#e6e4de"}
        groundColor={warm ? "#3a322c" : "#6a6760"}
        intensity={warm ? 0.58 : 0.72}
      />
      <ambientLight intensity={warm ? 0.22 : 0.38} color={warm ? "#f0e6d4" : "#f4f1ea"} />
      <directionalLight
        position={[9.5, 7.5, 4]}
        intensity={warm ? 1.35 : 1.05}
        color={warm ? "#f3e2c4" : "#f2f0ea"}
        castShadow={shadows}
        shadow-mapSize-width={quality === "high" ? 2048 : 1024}
        shadow-mapSize-height={quality === "high" ? 2048 : 1024}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0002}
      />
      {quality !== "low" ? (
        <>
          <spotLight
            position={[-0.4, 3.25, 0.55]}
            intensity={warm ? 5.2 : 2.4}
            angle={0.6}
            penumbra={0.72}
            distance={10}
            color={warm ? "#ffd7a8" : "#fff6e8"}
          />
          <spotLight
            position={[-1.2, 3.4, 1.2]}
            intensity={warm ? 1.8 : 1.1}
            angle={0.55}
            penumbra={0.7}
            distance={9}
            color={warm ? "#ffd7a8" : "#fff6e8"}
          />
          <pointLight position={[2.4, 2.4, -14]} intensity={0.9} distance={10} color="#dce6ee" />
          <pointLight position={[0, 2.2, -42]} intensity={0.85} distance={10} color="#d7e0c8" />
          <pointLight position={[0, 2.5, -70]} intensity={1.05} distance={14} color="#efe8dc" />
          <pointLight position={[0, 2.4, -96]} intensity={1.1} distance={10} color="#f4efe4" />
        </>
      ) : null}
    </>
  );
}
