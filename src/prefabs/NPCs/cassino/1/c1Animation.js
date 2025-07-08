export function preloadC1Animation(scene) {
    scene.load.image('c1.1', 'assets/sprites/cassino/1/c1.1.png'); 
    scene.load.image('c1.2', 'assets/sprites/cassino/1/c1.2.png'); 
}

export function C1Animation(scene) {
    if (scene.anims.exists('c1')) return;

    scene.anims.create({
        key: 'c1',
        frames: [
            { key: 'c1.1' },
            { key: 'c1.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
