export function preloadIboAtttendant(scene) {
    scene.load.image('iboAttendant1', 'assets/sprites/iboAttendant/iboAttendant-1.png'); 
     scene.load.image('iboAttendant2', 'assets/sprites/iboAttendant/iboAttendant-2.png'); 
}

export function IboAttendantAnimations(scene) {
    if (scene.anims.exists('iboAttendant')) return;

    scene.anims.create({
        key: 'iboAttendant',
        frames: [
            { key: 'iboAttendant1' },
            { key: 'iboAttendant2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}