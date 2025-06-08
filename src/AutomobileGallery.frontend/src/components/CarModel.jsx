import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect, useRef } from "react";
import SceneInit from "../lib/SceneInit.js";
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

export default function CarModel({
  modelPath,
  dirLightColor,
  ambientColor,
  dirPosition,
  dirLightIntensity,
  showLightHelper
}) {
  const ambientRef = useRef();
  const directionalRef = useRef();
  const modelRef = useRef();
  const sceneRef = useRef();
  const lightHelperRef = useRef();

  useEffect(() => {
    const scene = new SceneInit('dupa');
    scene.initialize();
    scene.renderer.shadowMap.enabled = true;
    scene.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene.animate();
    // const rgbeLoader = new RGBELoader();
    // rgbeLoader.load('/assets/docklands_01_2k.hdr', (texture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping;

    //   scene.scene.background = texture;
    //   scene.scene.environment = texture;
    // });
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
          const oldMat = child.material;
          child.material = new THREE.MeshPhongMaterial({
            color: oldMat?.color || new THREE.Color(0xffffff),
            shininess: 100
          });
          child.material.needsUpdate = true;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.scene.add(model);
      scene.setZoomLimitsForModel(model);
      modelRef.current = model;
    });

    return () => {
      scene.scene.remove(ambient);
      scene.scene.remove(directional);
      scene.scene.remove(lightHelperRef.current);
      if (modelRef.current) scene.scene.remove(modelRef.current);
    };
  }, [modelPath]);

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
    <div>
      <canvas style={{ width: "80vw", height: "80vh" }} id="dupa" />
    </div>
  );
}
