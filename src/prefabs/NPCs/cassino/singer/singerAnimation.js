export function preloadSingerAnimation(scene) {
    scene.load.image('singer', 'assets/sprites/cassino/singer/singer.png'); 
    scene.load.image('singer2', 'assets/sprites/cassino/singer/singer2.png'); 
}

export function SingerAnimation(scene) {
    if (scene.anims.exists('singerCassino')) return;

    scene.anims.create({
        key: 'singerCassino',
        frames: [
            { key: 'singer' },
            { key: 'singer2' }
        ],  
        frameRate: 0.5,
        repeat: -1
    });
}
