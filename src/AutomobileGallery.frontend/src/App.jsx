import { useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const scene = new SceneInit('myThreeJsCanvas');
    scene.initialize();
    scene.animate();

    // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // test.scene.add(boxMesh);

    let Model = new THREE.Object3D();
    const glftLoader = new GLTFLoader();
    glftLoader.load('assets/golf.glb', (gltf) => {
        Model.add(gltf.scene)
    //   loadedModel = gltfScene;
        Model.scale.set(1500, 1500, 1500);
        // Model.position.set(8, -10, 1.5);

      scene.scene.add(Model);
    });

    const animate = () => {
      if (Model) {
        Model.rotation.y += 0.01;
        // loadedModel.scene.rotation.x += 0.0;
        // loadedModel.scene.rotation.y += 0.0;
        // loadedModel.scene.rotation.z += 0.0;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;