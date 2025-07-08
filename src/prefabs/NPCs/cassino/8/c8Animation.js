export function preloadC8Animation(scene) {
    scene.load.image('c8.1', 'assets/sprites/cassino/8/c8.1.png'); 
    scene.load.image('c8.2', 'assets/sprites/cassino/8/c8.2.png'); 
}

export function C8Animation(scene) {
    if (scene.anims.exists('c8')) return;

    scene.anims.create({
        key: 'c8',
        frames: [
            { key: 'c8.1' },
            { key: 'c8.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
