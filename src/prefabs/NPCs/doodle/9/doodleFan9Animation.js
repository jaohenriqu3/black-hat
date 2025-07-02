export function preloadDoodleFan9Animation(scene) {
    scene.load.image('doodleFan9.1', 'assets/sprites/doodle/9/doodleFan9.1.png');
    scene.load.image('doodleFan9.2', 'assets/sprites/doodle/9/doodleFan9.2.png'); 
}

export function doodleFan9Animation(scene) {
    if (scene.anims.exists('doodleFan9')) return;

    scene.anims.create({
        key: 'doodleFan9',
        frames: [
            { key: 'doodleFan9.1' },
            { key: 'doodleFan9.2' }
        ],
        frameRate: 1.0,
        repeat: -1
    });
}
