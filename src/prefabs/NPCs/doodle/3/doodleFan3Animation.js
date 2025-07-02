export function preloadDoodleFan3Animation(scene) {
    scene.load.image('doodleFan3.1', 'assets/sprites/doodle/3/doodleFan3.png');
    scene.load.image('doodleFan3.2', 'assets/sprites/doodle/3/doodleFan3.1.png'); 
}

export function doodleFan3Animation(scene) {
    if (scene.anims.exists('doodleFan3')) return;

    scene.anims.create({
        key: 'doodleFan3',
        frames: [
            { key: 'doodleFan3.1' },
            { key: 'doodleFan3.2' }
        ],
        frameRate: 0.7,
        repeat: -1
    });
}
