export function preloadIbo3(scene) {
    scene.load.image('ibo3.1', 'assets/sprites/iboDelfi/3/ibo3.1.png'); 
     scene.load.image('ibo3.2', 'assets/sprites/iboDelfi/3/ibo3.2.png'); 
}

export function Ibo3Animation(scene) {
    if (scene.anims.exists('ibo3')) return;

    scene.anims.create({
        key: 'ibo3',
        frames: [
            { key: 'ibo3.1' },
            { key: 'ibo3.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}