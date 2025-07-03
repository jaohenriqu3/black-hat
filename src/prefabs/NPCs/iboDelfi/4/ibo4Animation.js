export function preloadIbo4(scene) {
    scene.load.image('ibo4.1', 'assets/sprites/iboDelfi/4/ibo4.1.png'); 
     scene.load.image('ibo4.2', 'assets/sprites/iboDelfi/4/ibo4.2.png'); 
}

export function Ibo4Animation(scene) {
    if (scene.anims.exists('ibo4')) return;

    scene.anims.create({
        key: 'ibo4',
        frames: [
            { key: 'ibo4.1' },
            { key: 'ibo4.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}