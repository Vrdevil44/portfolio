function createAdvancedModels() {
    models = new THREE.Group();
    scene.add(models);
    
    createLaptopModel();
    createServerModel();
    createPaddleModel();
    createNetworkModel();
    createCodeBlocks();
    
    models.position.y = -0.5;
    models.rotation.y = Math.PI / 6;
    
    // Add raycaster for model interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
}

// Add all the model creation functions here
// (createLaptopModel, createServerModel, etc.)

// Add the model creation functions from the provided code 