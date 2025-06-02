export function preloadMaxAnimation(scene) {
    scene.load.image('max1', 'assets/sprites/cassino/max/max-1.png'); 
    scene.load.image('max2', 'assets/sprites/cassino/max/max-2.png'); 
}

export function MaxAnimation(scene) {
    if (scene.anims.exists('max')) return;

    scene.anims.create({
        key: 'max',
        frames: [
            { key: 'max1' },
            { key: 'max2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
