export function preloadCassinoAttendant(scene) {
    scene.load.image('cassinoAttendant1', 'assets/sprites/cassino/cassinoAttendant/cassinoAttendant1.png'); 
    scene.load.image('cassinoAttendant2', 'assets/sprites/cassino/cassinoAttendant/cassinoAttendant2.png'); 
}

export function CassinoAttendantAnimation(scene) {
    if (scene.anims.exists('cassinoAttendant')) return;

    scene.anims.create({
        key: 'cassinoAttendant',
        frames: [
            { key: 'cassinoAttendant1' },
            { key: 'cassinoAttendant2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}