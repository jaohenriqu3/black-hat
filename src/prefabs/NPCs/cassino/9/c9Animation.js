export function preloadC9Animation(scene) {
    scene.load.image('c9.1', 'assets/sprites/cassino/9/c9.1.png'); 
    scene.load.image('c9.2', 'assets/sprites/cassino/9/c9.2.png'); 
}

export function C9Animation(scene) {
    if (scene.anims.exists('c9')) return;

    scene.anims.create({
        key: 'c9',
        frames: [
            { key: 'c9.1' },
            { key: 'c9.2' }
        ],  
        frameRate: 0.5,
        repeat: -1
    });
}
