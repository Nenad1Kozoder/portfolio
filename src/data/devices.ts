import * as THREE from "three";

export const deviceConfigs = {
  phone: {
    modelPath: "/phone.glb",
    scale: 12,
    position: new THREE.Vector3(0, 0, 0),
    iframeSize: { width: 375, height: 812 },
    iframeScale: 0.42,
    iframePosition: new THREE.Vector3(0, 0, 8),
    iframeRotation: new THREE.Euler(0, 0, 0),
  },
  tablet: {
    modelPath: "/tablet.glb",
    scale: 75,
    position: new THREE.Vector3(0, 0, 0),
    iframeSize: { width: 767, height: 1080 },
    iframeScale: 0.315,
    iframePosition: new THREE.Vector3(-14.5, -27, 3),
    iframeRotation: new THREE.Euler(0, 0, 0),
  },
  desktop: {
    modelPath: "/desktop.glb",
    scale: 10,
    position: new THREE.Vector3(0, 0, 0),
    iframeSize: { width: 1280, height: 800 },
    iframeScale: 0.27,
    iframePosition: new THREE.Vector3(0, 112, 3),
    iframeRotation: new THREE.Euler(-Math.PI / 9, 0, 0),
  },
};
