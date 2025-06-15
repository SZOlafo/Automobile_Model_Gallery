import * as THREE from 'three';
import { useEffect, useRef, useState  } from "react";
import SceneInit from "../lib/SceneInit.js";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'


export default function CarModel({
  modelPath,
  dirLightColor,
  ambientColor,
  dirPosition,
  dirLightIntensity,
  showLightHelper,
  hdrBackground
}) {
  const ambientRef = useRef();
  const directionalRef = useRef();
  const modelRef = useRef();
  const sceneRef = useRef();
  const lightHelperRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false); // <-- Dodajemy stan ładowania

  useEffect(() => {
    const scene = new SceneInit('scene');
    scene.initialize();
    scene.renderer.shadowMap.enabled = true;
    scene.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene.animate();
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(hdrBackground, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.scene.background = texture;
      scene.scene.environment = texture;
    });
    sceneRef.current = scene;



    // Ambient
    const ambient = new THREE.AmbientLight(ambientColor, 0.3);
    ambientRef.current = ambient;
    scene.scene.add(ambient);

    // Directional
    const directional = new THREE.DirectionalLight(dirLightColor, dirLightIntensity);
    directional.position.set(dirPosition.x, dirPosition.y, dirPosition.z);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 2048;
    directional.shadow.mapSize.height = 2048;
    directional.shadow.camera.near = 0.5;
    directional.shadow.camera.far = 100;

    directionalRef.current = directional;
    scene.scene.add(directional);

    // Light Helper
    const helper = new THREE.DirectionalLightHelper(directional, 3, 0xff0000);
    helper.visible = showLightHelper;
    scene.scene.add(helper);
    lightHelperRef.current = helper;

    // Load model
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(modelPath, (gltf) => {
      const model = new THREE.Object3D();
      model.add(gltf.scene);

      // Compute bounding box and center
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Move model down so it sits on the ground
      model.position.y = -(center.y - box.min.y);

      // Adjust OrbitControls target to interior (slightly lower than geometric center)
      const interiorTarget = center.clone();
      interiorTarget.y -= (box.max.y - box.min.y) * 0.25; // shift target down toward cabin

      scene.controls.target.copy(interiorTarget);
      scene.controls.update();

      // Optional: also reposition camera to look at the cabin more effectively
      scene.camera.position.set(interiorTarget.x, interiorTarget.y + 5, interiorTarget.z + 80);
      scene.camera.lookAt(interiorTarget);

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          const mat = child.material;   // oryginalny materiał z GLB-a

          // upewnij się, że właściwości istnieją (niektóre materiały mogą ich nie mieć)
          if ('roughness' in mat) mat.roughness = 0.1;   // im mniejsze, tym bardziej lustrzane
          if ('metalness' in mat) mat.metalness = 0.0;   // 0 = lakier, 1 = chrom

          mat.needsUpdate = true;

          child.castShadow    = true;
          child.receiveShadow = true;
        }
      });


      scene.scene.add(model);
      scene.setZoomLimitsForModel(model);
      modelRef.current = model;
      setIsLoaded(true); 
    });

    return () => {
      scene.scene.remove(ambient);
      scene.scene.remove(directional);
      scene.scene.remove(lightHelperRef.current);
      if (modelRef.current) scene.scene.remove(modelRef.current);
    };
  }, [modelPath, hdrBackground]);

  // Update lights
  useEffect(() => {
    if (ambientRef.current) {
      ambientRef.current.color.set(ambientColor);
    }
  }, [ambientColor]);

  useEffect(() => {
    if (directionalRef.current) {
      directionalRef.current.color.set(dirLightColor);
      directionalRef.current.intensity = dirLightIntensity;
      directionalRef.current.position.set(
        dirPosition.x,
        dirPosition.y,
        dirPosition.z
      );

      //if (lightHelperRef.current) {
      //  lightHelperRef.current.update();
      //}
    }
  }, [dirLightColor, dirLightIntensity, dirPosition]);

  useEffect(() => {
    if (lightHelperRef.current) {
      lightHelperRef.current.visible = showLightHelper;
    }
  }, [showLightHelper]);



  return (
    <div style={{ position: "relative", width: "80vw" }}>
      {!isLoaded && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 auto",   // centrowanie poziome
          display: "flex",    // ↓ centrowanie zawartości (płótna) w obu osiach
          justifyContent: "center",
          alignItems: "center",
        }}>
          Ładowanie modelu...
        </div>
      )}
      <canvas style={{ width: "80vw", visibility: isLoaded ? 'visible' : 'hidden' }} id="scene" />
    </div>
  );
}
