export function preloadC2Animation(scene) {
    scene.load.image('c2.1', 'assets/sprites/cassino/2/c2.1.png'); 
    scene.load.image('c2.2', 'assets/sprites/cassino/2/c2.2.png'); 
}

export function C2Animation(scene) {
    if (scene.anims.exists('c2')) return;

    scene.anims.create({
        key: 'c2',
        frames: [
            { key: 'c2.1' },
            { key: 'c2.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
