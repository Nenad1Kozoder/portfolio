// ThreeScene.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { deviceConfigs } from "@/data/devices";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

import styles from "./ThreeScene.module.scss";

export type DeviceType = "phone" | "tablet" | "desktop";

interface ThreeSceneProps {
  url: string;
  device: DeviceType;
}

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
const modelCache: Record<string, THREE.Group> = {};

async function loadModel(path: string): Promise<THREE.Group> {
  if (modelCache[path]) return modelCache[path].clone();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        modelCache[path] = gltf.scene;
        resolve(gltf.scene.clone());
      },
      undefined,
      (err) => reject(err)
    );
  });
}

const ThreeScene = ({ url, device }: ThreeSceneProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const webGLContainerRef = useRef<HTMLDivElement | null>(null);
  const css3DContainerRef = useRef<HTMLDivElement | null>(null);

  const iframeObjRef = useRef<CSS3DObject | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  const webGLRenderer = useRef<THREE.WebGLRenderer | null>(null);
  const cssRenderer = useRef<CSS3DRenderer | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const controls = useRef<OrbitControls | null>(null);
  const glScene = useRef(new THREE.Scene());
  const cssScene = useRef(new THREE.Scene());
  const cssGroup = useRef(new THREE.Group());

  const clock = useRef(new THREE.Clock());
  const animId = useRef<number>(0);
  const animationDone = useRef(false);

  const setRendererSize = useCallback(() => {
    const container = containerRef.current;
    if (!container || !camera.current) return;
    const width = container.clientWidth;
    const height = 600;
    camera.current.aspect = width / height;
    camera.current.updateProjectionMatrix();
    webGLRenderer.current?.setSize(width, height);
    cssRenderer.current?.setSize(width, height);
  }, []);

  const setupScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const webGLDiv = document.createElement("div");
    const css3DDiv = document.createElement("div");
    webGLDiv.className = styles.webglLayer;
    css3DDiv.className = styles.css3dLayer;

    container.appendChild(webGLDiv);
    container.appendChild(css3DDiv);
    webGLContainerRef.current = webGLDiv;
    css3DContainerRef.current = css3DDiv;

    webGLRenderer.current = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    webGLRenderer.current.setPixelRatio(window.devicePixelRatio);
    webGLDiv.appendChild(webGLRenderer.current.domElement);

    cssRenderer.current = new CSS3DRenderer();
    cssRenderer.current.domElement.className = styles.cssRendererDom;
    css3DDiv.appendChild(cssRenderer.current.domElement);

    camera.current = new THREE.PerspectiveCamera(60, 1, 1, 2000);
    camera.current.position.set(0, 0, 600);

    controls.current = new OrbitControls(
      camera.current,
      cssRenderer.current.domElement
    );
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.enableZoom = true;

    glScene.current.add(new THREE.AmbientLight(0xffffff, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 1, 1);
    glScene.current.add(dirLight);
    cssScene.current.add(cssGroup.current);
    setRendererSize();
    window.addEventListener("resize", setRendererSize);
  }, [setRendererSize]);

  const animateCamera = useCallback(() => {
    let startTime: number | null = null;
    const totalDuration = 4000;

    const { radiusEnd, yEnd } = getResponsiveCameraEnd();
    const leftAngle = THREE.MathUtils.degToRad(
      device === "desktop" ? -40 : -45
    );
    const rightAngle = THREE.MathUtils.degToRad(device === "desktop" ? 20 : 45);
    const finalAngle = THREE.MathUtils.degToRad(10);
    const radiusStart = 600;
    // const radiusEnd = 510;
    // const yEnd = device === "desktop" ? 180 : -60;
    const yStart = device === "desktop" ? 70 : 0;

    function animate(time: number) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const phase1 = 1500;
      const phase2 = 1000;
      const phase3 = 1500;

      let angle = 0;
      let radius = radiusStart;
      let y = yStart;

      if (elapsed < phase1) {
        angle = THREE.MathUtils.lerp(0, leftAngle, elapsed / phase1);
      } else if (elapsed < phase1 + phase2) {
        angle = THREE.MathUtils.lerp(
          leftAngle,
          rightAngle,
          (elapsed - phase1) / phase2
        );
      } else if (elapsed < totalDuration) {
        const t = (elapsed - phase1 - phase2) / phase3;
        angle = THREE.MathUtils.lerp(rightAngle, finalAngle, t);
        radius = THREE.MathUtils.lerp(radiusStart, radiusEnd, t);
        y = THREE.MathUtils.lerp(yStart, yEnd, t);
      } else {
        angle = finalAngle;
        radius = radiusEnd;
        y = yEnd;

        if (modelRef.current && controls.current && camera.current) {
          const targetY = modelRef.current.position.y;
          controls.current.target.set(0, targetY, 0);
          camera.current.position.set(
            radius * Math.sin(angle),
            y,
            radius * Math.cos(angle)
          );
          controls.current.update();
        }

        animationDone.current = true;
        controls.current.enabled = true; // <-- OTKLJUČAJ KONTROLE
        return;
      }

      if (camera.current && controls.current) {
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        camera.current.position.set(x, y, z);
        const targetY = modelRef.current ? modelRef.current.position.y : 0;
        controls.current.target.set(0, targetY, 0);
        controls.current.update();
      }

      webGLRenderer.current?.render(glScene.current, camera.current!);
      cssRenderer.current?.render(cssScene.current, camera.current!);

      animId.current = requestAnimationFrame(animate);
    }

    animId.current = requestAnimationFrame(animate);
  }, [device]);

  const loadSceneContent = useCallback(async () => {
    const config = deviceConfigs[device];
    const controlsCfg = controls.current;
    if (controlsCfg) {
      controlsCfg.minPolarAngle = Math.PI / 6;
      controlsCfg.maxPolarAngle =
        device === "desktop" ? Math.PI - Math.PI / 2.28 : Math.PI - Math.PI / 6;
      controlsCfg.minAzimuthAngle =
        device === "desktop" ? -Math.PI / 2.5 : -Math.PI / 3;
      controlsCfg.maxAzimuthAngle =
        device === "desktop" ? Math.PI / 2.5 : Math.PI / 3;
    }

    const cleanupScene = () => {
      if (modelRef.current) {
        glScene.current.remove(modelRef.current);
        modelRef.current.traverse((child) => {
          if ((child as THREE.Mesh).geometry)
            (child as THREE.Mesh).geometry.dispose();
          if ((child as THREE.Mesh).material) {
            const mat = (child as THREE.Mesh).material;
            Array.isArray(mat)
              ? mat.forEach((m) => m.dispose())
              : mat.dispose();
          }
        });
        modelRef.current = null;
      }
      if (iframeObjRef.current) {
        cssGroup.current.remove(iframeObjRef.current);
        iframeObjRef.current = null;
      }
    };

    cleanupScene();
    try {
      const model = await loadModel(config.modelPath);
      model.scale.setScalar(config.scale);
      model.position.copy(config.position);
      model.position.y += 30;
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          Array.isArray(mesh.material)
            ? mesh.material.forEach((m) => (m.side = THREE.DoubleSide))
            : (mesh.material.side = THREE.DoubleSide);
        }
      });
      glScene.current.add(model);
      modelRef.current = model;

      const iframeWrapper = document.createElement("div");
      iframeWrapper.className = styles.iframeWrapper;
      iframeWrapper.style.width = `${config.iframeSize.width}px`;
      iframeWrapper.style.height = `${config.iframeSize.height}px`;
      iframeWrapper.style.borderRadius = device === "phone" ? "50px" : "10px";

      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.className = styles.iframe;
      iframeWrapper.appendChild(iframe);

      const cssObject = new CSS3DObject(iframeWrapper);
      cssObject.scale.setScalar(config.iframeScale);
      cssObject.position.copy(config.iframePosition);
      cssObject.rotation.copy(config.iframeRotation);
      cssObject.position.y += 30;
      cssGroup.current.add(cssObject);
      iframeObjRef.current = cssObject;
    } catch (err) {
      console.error(err);
    }
  }, [url, device]);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(animId.current);
    window.removeEventListener("resize", setRendererSize);
    window.removeEventListener("orientationchange", handleOrientationChange);
    webGLRenderer.current?.dispose();
    webGLContainerRef.current?.remove();
    css3DContainerRef.current?.remove();

    modelRef.current = null;
    iframeObjRef.current = null;
    camera.current = null;
    controls.current = null;
    webGLRenderer.current = null;
    cssRenderer.current = null;
    cssGroup.current.clear();
    glScene.current.clear();
  }, [setRendererSize]);

  const handleOrientationChange = useCallback(() => {
    setTimeout(() => {
      setRendererSize();
      loadSceneContent();
    }, 100);
  }, [setRendererSize, loadSceneContent]);

  // const radiusEnd = 510;
  // const yEnd = device === "desktop" ? 180 : -60;

  const getResponsiveCameraEnd = () => {
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    if (vw < 768)
      return {
        radiusEnd: device === "desktop" ? 700 : 510,
        yEnd: device === "desktop" ? 60 : -60,
      };
    if (vw < 1024)
      return {
        radiusEnd: device === "desktop" ? 600 : 510,
        yEnd: device === "desktop" ? 120 : -60,
      };
    return { radiusEnd: 510, yEnd: device === "desktop" ? 180 : -60 };
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      // Potpuno resetujemo scenu
      cleanup(); // pozovi cleanup
      setTimeout(() => {
        setupScene(); // ponovo postavi
        loadSceneContent();
        animateCamera();
      }, 100);
    };

    window.addEventListener("orientationchange", handleOrientationChange);
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [cleanup, setupScene, loadSceneContent, animateCamera]);

  useEffect(() => {
    setupScene();
    return cleanup;
  }, [setupScene, cleanup]);

  useEffect(() => {
    clock.current.start();
    animationDone.current = false;
  }, [url, device]);

  useEffect(() => {
    animateCamera();
  }, [animateCamera]);

  useEffect(() => {
    loadSceneContent();
  }, [loadSceneContent]);

  return <div ref={containerRef} className={styles.container} />;
};

export default ThreeScene;
