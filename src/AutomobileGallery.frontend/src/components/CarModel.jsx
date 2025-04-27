import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect, useState } from "react";
import SceneInit from "../lib/SceneInit.js";

export function CarModel({ modelPath }) {
  const [isLoaded, setIsLoaded] = useState(false); // <-- Dodajemy stan ładowania

  useEffect(() => {
    const scene = new SceneInit('scene');
    scene.initialize();
    scene.animate();

    let Model = new THREE.Object3D();
    const gltfLoader = new GLTFLoader();
    
    gltfLoader.load(
      modelPath,
      (gltf) => {
        Model.add(gltf.scene);
        Model.scale.set(1, 1, 1);
        scene.scene.add(Model);
        setIsLoaded(true); // <-- Po załadowaniu modelu ustawiamy
      },
      undefined,
      (error) => {
        console.error('Błąd podczas ładowania modelu:', error);
      }
    );

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
    <div style={{ position: "relative", width: "80vw" }}>
      {!isLoaded && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "24px",
          fontWeight: "bold"
        }}>
          Ładowanie modelu...
        </div>
      )}
      <canvas style={{ width: "80vw", visibility: isLoaded ? 'visible' : 'hidden' }} id="scene" />
    </div>
  );
}
