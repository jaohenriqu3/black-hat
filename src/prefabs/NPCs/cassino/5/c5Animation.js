export function preloadC5Animation(scene) {
    scene.load.image('c5.1', 'assets/sprites/cassino/5/c5.1.png'); 
    scene.load.image('c5.2', 'assets/sprites/cassino/5/c5.2.png'); 
}

export function C5Animation(scene) {
    if (scene.anims.exists('c5')) return;

    scene.anims.create({
        key: 'c5',
        frames: [
            { key: 'c5.1' },
            { key: 'c5.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
