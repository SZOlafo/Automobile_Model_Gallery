import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect } from "react";
import SceneInit from "../lib/SceneInit.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export default function CarModel({ modelPath }) {
  useEffect(() => {
    const scene = new SceneInit('dupa');
    scene.initialize();
    scene.animate();
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('/assets/docklands_01_2k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
  
    scene.scene.background = texture;    
    scene.scene.environment = texture;   
  });

    // --- Car Model ---
    const Model = new THREE.Object3D();
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(modelPath, (gltf) => {
      Model.add(gltf.scene);
      Model.scale.set(1, 1, 1);

      // Auto-align model to the ground
      const box = new THREE.Box3().setFromObject(Model);
      const center = new THREE.Vector3();
      box.getCenter(center);

      Model.position.y = - (center.y - box.min.y);

      scene.scene.add(Model);
    });

    // --- No extra animate() needed! ---
  }, []);

  return (
    <div>
      <canvas style={{ width: "80vw" }} id="dupa" />
    </div>
  );
}
