export function preloadIbo10(scene) {
    scene.load.image('ibo10.1', 'assets/sprites/iboDelfi/10/ibo10.1.png'); 
     scene.load.image('ibo10.2', 'assets/sprites/iboDelfi/10/ibo10.2.png'); 
}

export function Ibo10Animation(scene) {
    if (scene.anims.exists('ibo10')) return;

    scene.anims.create({
        key: 'ibo10',
        frames: [
            { key: 'ibo10.1' },
            { key: 'ibo10.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}