import { useEffect, useMemo } from "react";
import { ContactShadows } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createScreenKit, disposeKit } from "@/lib/textures";
import { useStudio } from "@/store/studio";
import { Architecture } from "@/studio/Architecture";
import { CameraRig } from "@/studio/CameraRig";
import { Lighting } from "@/studio/Lighting";
import { Rooms } from "@/studio/rooms";

function FogAndTone() {
  const { scene, gl } = useThree();
  const neutral = useStudio((s) => s.neutral);
  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = neutral ? 1.22 : 1.14;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    scene.fog = new THREE.Fog(neutral ? "#cfc8bc" : "#1a1612", 12, 42);
    gl.setClearColor(neutral ? "#cfc8bc" : "#1a1612");
  }, [gl, scene, neutral]);
  return null;
}

function ReadyFlag() {
  const { gl } = useThree();
  useEffect(() => {
    useStudio.getState().set({ ready: true, loadProgress: 1 });
    const onLost = (e: Event) => {
      e.preventDefault();
      useStudio.getState().set({ webgl: false, readable: true });
    };
    gl.domElement.addEventListener("webglcontextlost", onLost, false);
    return () => gl.domElement.removeEventListener("webglcontextlost", onLost);
  }, [gl]);
  return null;
}

export function World() {
  const kit = useMemo(() => {
    const k = createScreenKit();
    k.wood.repeat.set(14, 90);
    k.plaster.repeat.set(6, 4);
    return k;
  }, []);
  const quality = useStudio((s) => s.quality);

  useEffect(() => {
    return () => disposeKit(kit);
  }, [kit]);

  return (
    <>
      <ReadyFlag />
      <FogAndTone />
      <CameraRig />
      <Lighting />
      <Architecture kit={kit} />
      <Rooms kit={kit} />
      {quality !== "low" ? (
        <ContactShadows position={[0, 0.015, -40]} opacity={0.35} scale={90} blur={2.4} far={8} color="#1a1612" />
      ) : null}
    </>
  );
}
