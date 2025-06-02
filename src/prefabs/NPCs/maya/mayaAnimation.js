export function preloadMaya(scene) {
    scene.load.image('maya1', 'assets/sprites/maya/maya-rios-1.png'); 
    scene.load.image('maya2', 'assets/sprites/maya/maya-rios-2.png'); 
}

export function MayaAnimations(scene) {
    if (scene.anims.exists('maya')) return;

    scene.anims.create({
        key: 'maya',
        frames: [
            { key: 'maya1' },
            { key: 'maya2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}