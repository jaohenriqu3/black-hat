export function preloadIbo6(scene) {
    scene.load.image('ibo6.1', 'assets/sprites/iboDelfi/6/ibo6.1.png'); 
     scene.load.image('ibo6.2', 'assets/sprites/iboDelfi/6/ibo6.2.png'); 
}

export function Ibo6Animation(scene) {
    if (scene.anims.exists('ibo6')) return;

    scene.anims.create({
        key: 'ibo6',
        frames: [
            { key: 'ibo6.1' },
            { key: 'ibo6.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}