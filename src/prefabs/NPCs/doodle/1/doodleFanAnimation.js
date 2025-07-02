export function preloadDoodleFanAnimation(scene) {
    scene.load.image('doodleFan', 'assets/sprites/doodle/1/doodleFan.png');
    scene.load.image('doodleFan2', 'assets/sprites/doodle/1/doodleFan1.png'); 
}

export function doodleFanAnimation(scene) {
    if (scene.anims.exists('doodleFan')) return;

    scene.anims.create({
        key: 'doodleFan',
        frames: [
            { key: 'doodleFan' },
            { key: 'doodleFan2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
