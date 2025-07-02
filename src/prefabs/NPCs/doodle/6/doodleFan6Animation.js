export function preloadDoodleFan6Animation(scene) {
    scene.load.image('doodleFan6.1', 'assets/sprites/doodle/6/doodleFan6.1.png');
    scene.load.image('doodleFan6.2', 'assets/sprites/doodle/6/doodleFan6.2.png'); 
}

export function doodleFan6Animation(scene) {
    if (scene.anims.exists('doodleFan6')) return;

    scene.anims.create({
        key: 'doodleFan6',
        frames: [
            { key: 'doodleFan6.1' },
            { key: 'doodleFan6.2' }
        ],
        frameRate: 0.4,
        repeat: -1
    });
}
