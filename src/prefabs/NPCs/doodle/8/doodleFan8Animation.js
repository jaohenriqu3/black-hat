export function preloadDoodleFan8Animation(scene) {
    scene.load.image('doodleFan8.1', 'assets/sprites/doodle/8/doodleFan8.1.png');
    scene.load.image('doodleFan8.2', 'assets/sprites/doodle/8/doodleFan8.2.png'); 
}

export function doodleFan8Animation(scene) {
    if (scene.anims.exists('doodleFan8')) return;

    scene.anims.create({
        key: 'doodleFan8',
        frames: [
            { key: 'doodleFan8.1' },
            { key: 'doodleFan8.2' }
        ],
        frameRate: 0.4,
        repeat: -1
    });
}
