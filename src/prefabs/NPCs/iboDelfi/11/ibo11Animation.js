export function preloadIbo11(scene) {
    scene.load.image('ibo11.1', 'assets/sprites/iboDelfi/11/ibo11.1.png'); 
     scene.load.image('ibo11.2', 'assets/sprites/iboDelfi/11/ibo11.2.png'); 
}

export function Ibo11Animation(scene) {
    if (scene.anims.exists('ibo11')) return;

    scene.anims.create({
        key: 'ibo11',
        frames: [
            { key: 'ibo11.1' },
            { key: 'ibo11.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}