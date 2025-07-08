export function preloadC4Animation(scene) {
    scene.load.image('c4.1', 'assets/sprites/cassino/4/c4.1.png'); 
    scene.load.image('c4.2', 'assets/sprites/cassino/4/c4.2.png'); 
}

export function C4Animation(scene) {
    if (scene.anims.exists('c4')) return;

    scene.anims.create({
        key: 'c4',
        frames: [
            { key: 'c4.1' },
            { key: 'c4.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
