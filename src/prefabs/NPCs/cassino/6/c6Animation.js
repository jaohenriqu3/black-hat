export function preloadC6Animation(scene) {
    scene.load.image('c6.1', 'assets/sprites/cassino/6/c6.1.png'); 
    scene.load.image('c6.2', 'assets/sprites/cassino/6/c6.2.png'); 
}

export function C6Animation(scene) {
    if (scene.anims.exists('c6')) return;

    scene.anims.create({
        key: 'c6',
        frames: [
            { key: 'c6.1' },
            { key: 'c6.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
