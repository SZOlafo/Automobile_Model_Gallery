import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect } from "react";
import SceneInit from "../lib/SceneInit.js"

export function CarModel({ modelPath }) {
  useEffect(() => {
    const scene = new SceneInit('dupa');
    scene.initialize();
    scene.animate();

    let Model = new THREE.Object3D();
    const glftLoader = new GLTFLoader();
    glftLoader.load(modelPath, (gltf) => {
      Model.add(gltf.scene)
      Model.scale.set(1, 1, 1);

      scene.scene.add(Model);
    });

    const animate = () => {
      if (Model) {
        Model.rotation.y += 0.01;
      }
      requestAnimationFrame(animate);
    };
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div >
      <canvas style={{width:"80vw"}} id="dupa" />
    </div>
  );
}