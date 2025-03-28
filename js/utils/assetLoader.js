export class AssetLoader {
    static async loadTexture(url) {
        const loader = new THREE.TextureLoader();
        return new Promise((resolve, reject) => {
            loader.load(url, 
                texture => resolve(texture),
                undefined,
                error => reject(error)
            );
        });
    }
} 