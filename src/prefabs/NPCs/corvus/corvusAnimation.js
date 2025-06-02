export function preloadCorvusAnimation(scene) {
    scene.load.image('corvus1', 'assets/sprites/corvus/corvus-1.png');
    scene.load.image('corvus2', 'assets/sprites/corvus/corvus-2.png'); 
}

export function corvusAnimation(scene) {
    if (scene.anims.exists('corvus')) return;

    scene.anims.create({
        key: 'corvus',
        frames: [
            { key: 'corvus1' },
            { key: 'corvus2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
