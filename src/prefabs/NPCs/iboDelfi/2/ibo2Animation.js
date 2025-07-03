export function preloadIbo2(scene) {
    scene.load.image('ibo2.1', 'assets/sprites/iboDelfi/2/ibo2.1.png'); 
     scene.load.image('ibo2.2', 'assets/sprites/iboDelfi/2/ibo2.2.png'); 
}

export function Ibo2Animation(scene) {
    if (scene.anims.exists('ibo2')) return;

    scene.anims.create({
        key: 'ibo2',
        frames: [
            { key: 'ibo2.1' },
            { key: 'ibo2.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}