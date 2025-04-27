import * as THREE from 'three';
/*const textureLoader = new THREE.TextureLoader();

    // --- Garage Floor ---
    const floorTexture = textureLoader.load('/assets/floor.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(4, 4);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ map: floorTexture })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.scene.add(floor);

    // --- Garage Walls ---
    const wallTexture = textureLoader.load('/assets/wall.jpg');
    wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(4, 2);

    const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(500, 200), wallMaterial);
    backWall.position.set(0, 100, -250);
    scene.scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(500, 200), wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-250, 100, 0);
    scene.scene.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(500, 200), wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(250, 100, 0);
    scene.scene.add(rightWall);

    // --- Ceiling ---
    const ceilingTexture = textureLoader.load('/assets/ceiling.jpg');
    ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
    ceilingTexture.repeat.set(4, 4);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({ map: ceilingTexture })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 200;
    scene.scene.add(ceiling);*/