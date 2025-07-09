import * as THREE from "three";

export const deviceConfigs = {
  phone: {
    modelPath: "/phone.glb",
    scale: 4,
    position: new THREE.Vector3(0, -200, 0),
    iframeSize: { width: 375, height: 820 },
    iframeScale: 0.48,
    iframePosition: new THREE.Vector3(5, -15, 20),
    iframeRotation: new THREE.Euler(0, 0, 0),
  },
  tablet: {
    modelPath: "/tablet.glb",
    scale: 75,
    position: new THREE.Vector3(0, 0, 0),
    iframeSize: { width: 767, height: 1080 },
    iframeScale: 0.31,
    iframePosition: new THREE.Vector3(-14.5, -27, 5),
    iframeRotation: new THREE.Euler(0, 0, 0),
  },
  desktop: {
    modelPath: "/desktop.glb",
    scale: 7,
    position: new THREE.Vector3(0, -100, 0),
    iframeSize: { width: 1280, height: 800 },
    iframeScale: 0.185,
    iframePosition: new THREE.Vector3(0, -20, 0),
    iframeRotation: new THREE.Euler(-Math.PI / 9, 0, 0),
  },
};
