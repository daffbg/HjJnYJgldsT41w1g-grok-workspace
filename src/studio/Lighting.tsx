import { useStudio } from "@/store/studio";

export function Lighting() {
  const neutral = useStudio((s) => s.neutral);
  const quality = useStudio((s) => s.quality);
  const shadows = quality === "high";
  const warm = !neutral;

  return (
    <>
      <hemisphereLight
        color={warm ? "#f0e6d6" : "#eeece6"}
        groundColor={warm ? "#6a5a4c" : "#8a8680"}
        intensity={warm ? 0.85 : 1.05}
      />
      <ambientLight intensity={warm ? 0.42 : 0.55} color={warm ? "#f3eadc" : "#f5f2ea"} />
      <directionalLight
        position={[6.5, 6.2, 2]}
        intensity={warm ? 1.15 : 0.9}
        color={warm ? "#ffe6c2" : "#fff8ee"}
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={28}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.00025}
      />
      <spotLight
        position={[-0.4, 3.3, 0.6]}
        intensity={warm ? 8 : 4}
        angle={0.62}
        penumbra={0.75}
        distance={11}
        color={warm ? "#ffd7a8" : "#fff4e4"}
        castShadow={false}
      />
      <pointLight position={[2.8, 2.6, 1.2]} intensity={1.6} distance={12} color="#f0dcc0" />
      {quality !== "low" ? (
        <>
          <pointLight position={[2.2, 2.5, -14]} intensity={1.4} distance={12} color="#e8eef2" />
          <pointLight position={[0, 2.4, -28]} intensity={1.3} distance={12} color="#e4e8f0" />
          <pointLight position={[0, 2.4, -42]} intensity={1.2} distance={12} color="#e6ecd8" />
          <pointLight position={[0, 2.4, -56]} intensity={1.3} distance={12} color="#e4eaf2" />
          <pointLight position={[0, 2.5, -70]} intensity={1.5} distance={14} color="#f2eadc" />
          <pointLight position={[0, 2.4, -86]} intensity={1.2} distance={10} color="#f0dcc0" />
          <pointLight position={[0, 2.4, -96]} intensity={1.6} distance={12} color="#f6f0e6" />
        </>
      ) : null}
    </>
  );
}
