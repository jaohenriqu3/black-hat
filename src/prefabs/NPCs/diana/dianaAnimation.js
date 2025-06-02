export function preloadDianaAnimation(scene) {
    scene.load.image('diana1', 'assets/sprites/diana/diana.png'); 
}

export function dianaAnimation(scene) {
    if (scene.anims.exists('turnDiana')) return;

    scene.anims.create({
        key: 'turnDiana',
        frames: [
            { key: 'diana1' },
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
