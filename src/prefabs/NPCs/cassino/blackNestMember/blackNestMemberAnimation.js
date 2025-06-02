export function preloadBlackNestMember(scene) {
    scene.load.image('blackNestMember1', 'assets/sprites/cassino/blackNestMember/black-nest-member-1.png'); 
    scene.load.image('blackNestMember2', 'assets/sprites/cassino/blackNestMember/black-nest-member-2.png'); 
}

export function BlackNestMemberAnimation(scene) {
    if (scene.anims.exists('blackNestMember')) return;

    scene.anims.create({
        key: 'blackNestMember',
        frames: [
            { key: 'blackNestMember1' },
            { key: 'blackNestMember1' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}