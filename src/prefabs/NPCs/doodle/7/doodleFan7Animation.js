export function preloadDoodleFan7Animation(scene) {
    scene.load.image('doodleFan7.1', 'assets/sprites/doodle/7/doodleFan7.1.png');
    scene.load.image('doodleFan7.2', 'assets/sprites/doodle/7/doodleFan7.2.png'); 
}

export function doodleFan7Animation(scene) {
    if (scene.anims.exists('doodleFan7')) return;

    scene.anims.create({
        key: 'doodleFan7',
        frames: [
            { key: 'doodleFan7.1' },
            { key: 'doodleFan7.2' }
        ],
        frameRate: 0.4,
        repeat: -1
    });
}
