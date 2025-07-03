export function preloadIbo5(scene) {
    scene.load.image('ibo5.1', 'assets/sprites/iboDelfi/5/ibo5.1.png'); 
     scene.load.image('ibo5.2', 'assets/sprites/iboDelfi/5/ibo5.2.png'); 
}

export function Ibo5Animation(scene) {
    if (scene.anims.exists('ibo5')) return;

    scene.anims.create({
        key: 'ibo5',
        frames: [
            { key: 'ibo5.1' },
            { key: 'ibo5.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}