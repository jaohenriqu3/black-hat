export function preloadDoodleFan4Animation(scene) {
    scene.load.image('doodleFan4.1', 'assets/sprites/doodle/4/doodleFan4.1.png');
    scene.load.image('doodleFan4.2', 'assets/sprites/doodle/4/doodleFan4.2.png'); 
}

export function doodleFan4Animation(scene) {
    if (scene.anims.exists('doodleFan4')) return;

    scene.anims.create({
        key: 'doodleFan4',
        frames: [
            { key: 'doodleFan4.1' },
            { key: 'doodleFan4.2' }
        ],
        frameRate: 1.0,
        repeat: -1
    });
}
