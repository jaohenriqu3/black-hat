export function preloadC7Animation(scene) {
    scene.load.image('c7.1', 'assets/sprites/cassino/7/c7.1.png'); 
    scene.load.image('c7.2', 'assets/sprites/cassino/7/c7.2.png'); 
}

export function C7Animation(scene) {
    if (scene.anims.exists('c7')) return;

    scene.anims.create({
        key: 'c7',
        frames: [
            { key: 'c7.1' },
            { key: 'c7.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
