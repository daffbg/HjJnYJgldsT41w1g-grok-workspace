import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStudio } from "@/store/studio";
import { samplePath } from "@/studio/path";

const look = new THREE.Vector3();
const desired = new THREE.Vector3();
const offset = new THREE.Vector3();
const sph = new THREE.Spherical();

export function CameraRig() {
  const { camera, gl } = useThree();
  const sphRef = useRef({ theta: 0, phi: 0, radius: 0 });
  const drag = useRef({ down: false, x: 0, y: 0 });
  const resetToken = useStudio((s) => s.resetToken);
  const reduced = useStudio((s) => s.reducedMotion);
  const mobile = useStudio((s) => s.mobile);

  useEffect(() => {
    sphRef.current = { theta: 0, phi: 0, radius: 0 };
  }, [resetToken]);

  useEffect(() => {
    const el = gl.domElement;
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag.current = { down: true, x: e.clientX, y: e.clientY };
    };
    const onUp = () => {
      drag.current.down = false;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current.down || mobile) return;
      const dx = e.clientX - drag.current.x;
      const dy = e.clientY - drag.current.y;
      drag.current.x = e.clientX;
      drag.current.y = e.clientY;
      sphRef.current.theta -= dx * 0.005;
      sphRef.current.phi = THREE.MathUtils.clamp(sphRef.current.phi + dy * 0.004, -0.45, 0.45);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        sphRef.current.radius = THREE.MathUtils.clamp(sphRef.current.radius + e.deltaY * 0.002, -1.6, 2.4);
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, [gl, mobile]);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    const scroll = useStudio.getState().scroll;
    const { position, target, fov } = samplePath(scroll);
    const o = sphRef.current;
    if (!drag.current.down) {
      const k = 1 - Math.exp(-d * 1.8);
      o.theta += (0 - o.theta) * k * 0.35;
      o.phi += (0 - o.phi) * k * 0.35;
    }
    sph.set(1, Math.PI / 2 + o.phi, o.theta);
    offset.setFromSpherical(sph).multiplyScalar(0.85 + o.radius);
    desired.copy(position).add(offset);
    const lerp = reduced ? 1 : 1 - Math.exp(-d * (drag.current.down ? 10 : 2.4));
    camera.position.lerp(desired, lerp);
    look.copy(target);
    camera.lookAt(look);
    const cam = camera as THREE.PerspectiveCamera;
    cam.fov += (fov - cam.fov) * (reduced ? 1 : 1 - Math.exp(-d * 2));
    cam.updateProjectionMatrix();
    useStudio.getState().set({ camZ: camera.position.z });
  });

  return null;
}
