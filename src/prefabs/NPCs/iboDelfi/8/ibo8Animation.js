export function preloadIbo8(scene) {
    scene.load.image('ibo8.1', 'assets/sprites/iboDelfi/8/ibo8.1.png'); 
     scene.load.image('ibo8.2', 'assets/sprites/iboDelfi/8/ibo8.2.png'); 
}

export function Ibo8Animation(scene) {
    if (scene.anims.exists('ibo8')) return;

    scene.anims.create({
        key: 'ibo8',
        frames: [
            { key: 'ibo8.1' },
            { key: 'ibo8.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}