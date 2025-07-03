export function preloadIbo7(scene) {
    scene.load.image('ibo7.1', 'assets/sprites/iboDelfi/7/ibo7.1.png'); 
     scene.load.image('ibo7.2', 'assets/sprites/iboDelfi/7/ibo7.2.png'); 
}

export function Ibo7Animation(scene) {
    if (scene.anims.exists('ibo7')) return;

    scene.anims.create({
        key: 'ibo7',
        frames: [
            { key: 'ibo7.1' },
            { key: 'ibo7.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}