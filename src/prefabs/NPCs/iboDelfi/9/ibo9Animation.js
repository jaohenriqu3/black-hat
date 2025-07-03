export function preloadIbo9(scene) {
    scene.load.image('ibo9.1', 'assets/sprites/iboDelfi/9/ibo9.1.png'); 
     scene.load.image('ibo9.2', 'assets/sprites/iboDelfi/9/ibo9.2.png'); 
}

export function Ibo9Animation(scene) {
    if (scene.anims.exists('ibo9')) return;

    scene.anims.create({
        key: 'ibo9',
        frames: [
            { key: 'ibo9.1' },
            { key: 'ibo9.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}