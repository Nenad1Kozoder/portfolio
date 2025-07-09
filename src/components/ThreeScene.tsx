"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { deviceConfigs } from "@/data/devices";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";

export type DeviceType = "phone" | "tablet" | "desktop";

interface ThreeSceneProps {
  url: string;
  device: DeviceType;
}

const loader = new GLTFLoader();
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

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Kreiramo dva div kontejnera za WebGL i CSS3D renderere
    const webGLDiv = document.createElement("div");
    const css3DDiv = document.createElement("div");

    webGLDiv.style.position = "absolute";
    webGLDiv.style.top = "0";
    webGLDiv.style.left = "0";
    webGLDiv.style.width = "100%";
    webGLDiv.style.height = "100%";
    webGLDiv.style.overflow = "hidden";

    css3DDiv.style.position = "absolute";
    css3DDiv.style.top = "0";
    css3DDiv.style.left = "0";
    css3DDiv.style.width = "100%";
    css3DDiv.style.height = "100%";
    css3DDiv.style.overflow = "hidden";
    css3DDiv.style.pointerEvents = "none";

    container.style.position = "relative";

    container.appendChild(webGLDiv);
    container.appendChild(css3DDiv);

    webGLContainerRef.current = webGLDiv;
    css3DContainerRef.current = css3DDiv;

    // WebGL Renderer
    webGLRenderer.current = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false,
    });

    webGLRenderer.current.setPixelRatio(window.devicePixelRatio);
    webGLContainerRef.current.appendChild(webGLRenderer.current.domElement);

    // CSS3D Renderer
    cssRenderer.current = new CSS3DRenderer();
    cssRenderer.current.domElement.style.position = "absolute";
    cssRenderer.current.domElement.style.top = "0";
    cssRenderer.current.domElement.style.pointerEvents = "auto";
    css3DContainerRef.current.appendChild(cssRenderer.current.domElement);

    // Kreiranje kamere i kontrola
    camera.current = new THREE.PerspectiveCamera(60, 1, 1, 2000);
    camera.current.position.set(0, 0, 600);

    controls.current = new OrbitControls(
      camera.current,
      cssRenderer.current.domElement
    );
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.enableZoom = true;

    glScene.current.add(new THREE.AmbientLight(0xffffff, 2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(0, 1, 1);
    glScene.current.add(dirLight);
    cssScene.current.add(cssGroup.current);

    // Funkcija za sinhronizaciju veličine renderera sa containerom
    const setRendererSize = () => {
      if (!container) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      webGLRenderer.current?.setSize(width, height);
      cssRenderer.current?.setSize(width, height);

      if (camera.current) {
        camera.current.aspect = width / height;
        camera.current.updateProjectionMatrix();
      }
    };

    setRendererSize();

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.current?.update();

      webGLRenderer.current?.render(glScene.current, camera.current!);
      cssRenderer.current?.render(cssScene.current, camera.current!);
    };
    animate();

    window.addEventListener("resize", setRendererSize);

    return () => {
      window.removeEventListener("resize", setRendererSize);
      cancelAnimationFrame(animId);

      webGLRenderer.current?.dispose();

      if (webGLContainerRef.current) {
        webGLContainerRef.current.innerHTML = "";
        webGLContainerRef.current.remove();
      }
      if (css3DContainerRef.current) {
        css3DContainerRef.current.innerHTML = "";
        css3DContainerRef.current.remove();
      }

      webGLRenderer.current = null;
      cssRenderer.current = null;
      camera.current = null;
      controls.current = null;

      cssGroup.current.clear();
      glScene.current.clear();

      modelRef.current = null;
      iframeObjRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!webGLRenderer.current || !camera.current || !cssGroup.current) return;

    controls.current.minPolarAngle = Math.PI / 6; // 30°

    if (device === "desktop") {
      controls.current.maxPolarAngle = Math.PI - Math.PI / 2.28; // ~117°
      controls.current.minAzimuthAngle = -Math.PI / 2.5;
      controls.current.maxAzimuthAngle = Math.PI / 2.5;
    } else {
      controls.current.maxPolarAngle = Math.PI - Math.PI / 6; // 150°
      controls.current.minAzimuthAngle = -Math.PI / 3;
      controls.current.maxAzimuthAngle = Math.PI / 3;
    }

    const config = deviceConfigs[device];

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

    let cancelled = false;

    loadModel(config.modelPath)
      .then((model) => {
        if (cancelled) return;

        model.scale.setScalar(config.scale);
        model.position.copy(config.position);
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            Array.isArray(mesh.material)
              ? mesh.material.forEach((mat) => (mat.side = THREE.DoubleSide))
              : (mesh.material.side = THREE.DoubleSide);
          }
        });

        glScene.current.add(model);
        modelRef.current = model;

        webGLRenderer.current?.render(glScene.current, camera.current!);
        cssRenderer.current?.render(cssScene.current, camera.current!);
      })
      .catch(console.error);

    const iframeWrapper = document.createElement("div");
    iframeWrapper.style.width = `${config.iframeSize.width}px`;
    iframeWrapper.style.height = `${config.iframeSize.height}px`;
    iframeWrapper.style.overflow = "hidden";
    iframeWrapper.style.borderRadius = device === "phone" ? "50px" : "10px";
    iframeWrapper.style.background = "white";

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.background = "transparent";

    iframeWrapper.appendChild(iframe);

    const cssObject = new CSS3DObject(iframeWrapper);
    cssObject.scale.setScalar(config.iframeScale);
    cssObject.position.copy(config.iframePosition);
    cssObject.rotation.copy(config.iframeRotation);

    iframeObjRef.current = cssObject;
    cssGroup.current.add(cssObject);

    return () => {
      cancelled = true;
      cleanupScene();
    };
  }, [url, device]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default ThreeScene;
