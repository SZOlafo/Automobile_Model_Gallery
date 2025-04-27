import * as THREE from 'three';

export function createGarageSkybox(scene) {
  const textureLoader = new THREE.TextureLoader();

  const floorTexture = textureLoader.load('/assets/floor.jpg');
  const ceilingTexture = textureLoader.load('/assets/celling.jpg');
  const wallTexture = textureLoader.load('/assets/wall.jpg');

  // Repeat textures to cover bigger areas
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);

  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(4, 2);

  ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(2, 2);

  // Create materials for each side
  const materials = [
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // right
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // left
    new THREE.MeshBasicMaterial({ map: ceilingTexture, side: THREE.BackSide }), // top
    new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.BackSide }), // bottom
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // front
    new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.BackSide }), // back
  ];

  // Create big cube
  const skyboxGeo = new THREE.BoxGeometry(500, 500, 500);
  const skybox = new THREE.Mesh(skyboxGeo, materials);

  scene.add(skybox);
}
