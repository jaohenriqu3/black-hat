export function preloadVictorAnimation(scene) {
    scene.load.image('victor1', 'assets/sprites/victor/victor-durant-1.png'); 
    scene.load.image('victor2', 'assets/sprites/victor/victor-durant-2.png'); 
}

export function VictorAnimation(scene) {
    if (scene.anims.exists('turnVictor')) return;

    scene.anims.create({
        key: 'turnVictor',
        frames: [
            { key: 'victor1' },
            { key: 'victor2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
