export function preloadDoodleFan5Animation(scene) {
    scene.load.image('doodleFan5.1', 'assets/sprites/doodle/5/doodleFan5.1.png');
    scene.load.image('doodleFan5.2', 'assets/sprites/doodle/5/doodleFan5.2.png'); 
}

export function doodleFan5Animation(scene) {
    if (scene.anims.exists('doodleFan5')) return;

    scene.anims.create({
        key: 'doodleFan5',
        frames: [
            { key: 'doodleFan5.1' },
            { key: 'doodleFan5.2' }
        ],
        frameRate: 0.4,
        repeat: -1
    });
}
