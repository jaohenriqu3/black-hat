export function preloadC3Animation(scene) {
    scene.load.image('c3.1', 'assets/sprites/cassino/3/c3.1.png'); 
    scene.load.image('c3.2', 'assets/sprites/cassino/3/c3.2.png'); 
}

export function C3Animation(scene) {
    if (scene.anims.exists('c3')) return;

    scene.anims.create({
        key: 'c3',
        frames: [
            { key: 'c3.1' },
            { key: 'c3.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
