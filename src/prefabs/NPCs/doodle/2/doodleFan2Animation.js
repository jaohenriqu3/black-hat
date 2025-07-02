export function preloadDoodleFan2Animation(scene) {
    scene.load.image('doodleFan2.1', 'assets/sprites/doodle/2/doodleFan2.png');
    scene.load.image('doodleFan2.2', 'assets/sprites/doodle/2/doodleFan2.1.png'); 
}

export function doodleFan2Animation(scene) {
    if (scene.anims.exists('doodleFan2')) return;

    scene.anims.create({
        key: 'doodleFan2',
        frames: [
            { key: 'doodleFan2.1' },
            { key: 'doodleFan2.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
