import { useEffect, useMemo } from "react";
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
    gl.toneMappingExposure = neutral ? 1.22 : 1.16;
    gl.outputColorSpace = THREE.SRGBColorSpace;
    scene.fog = new THREE.Fog(neutral ? "#d8d2c6" : "#2a241e", 22, 58);
    gl.setClearColor(neutral ? "#d8d2c6" : "#2a241e");
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
    </>
  );
}
