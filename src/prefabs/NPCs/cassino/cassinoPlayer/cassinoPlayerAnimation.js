export function preloadCassinoPlayerAnimation(scene) {
    scene.load.image('cassinoPlayer1', 'assets/sprites/cassino/cassinoPlayer1/cassino-player1.png'); 
    scene.load.image('cassinoPlayer2', 'assets/sprites/cassino/cassinoPlayer1/cassino-player2.png'); 
}

export function CassinoPlayerAnimation(scene) {
    if (scene.anims.exists('cassinoPlayer')) return;

    scene.anims.create({
        key: 'cassinoPlayer',
        frames: [
            { key: 'cassinoPlayer1' },
            { key: 'cassinoPlayer2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
