export function preloadIbo(scene) {
    scene.load.image('ibo1.1', 'assets/sprites/iboDelfi/1/ibo1.1.png'); 
     scene.load.image('ibo1.2', 'assets/sprites/iboDelfi/1/ibo1.2.png'); 
}

export function IboAnimation(scene) {
    if (scene.anims.exists('ibo')) return;

    scene.anims.create({
        key: 'ibo',
        frames: [
            { key: 'ibo1.1' },
            { key: 'ibo1.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}