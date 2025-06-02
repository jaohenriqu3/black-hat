export function preloadCassinoAttendant2(scene) {
    scene.load.image('cassinoAttendant2.1', 'assets/sprites/cassino/cassinoAttendant2/cassinoAttendant2.1.png'); 
    scene.load.image('cassinoAttendant2.2', 'assets/sprites/cassino/cassinoAttendant2/cassinoAttendant2.2.png'); 
}

export function CassinoAttendantAnimation2(scene) {
    if (scene.anims.exists('cassinoAttendant2')) return;

    scene.anims.create({
        key: 'cassinoAttendant2',
        frames: [
            { key: 'cassinoAttendant2.1' },
            { key: 'cassinoAttendant2.2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}