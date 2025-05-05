export function preloadNPCAnimations(scene) {
    scene.load.image('npc-test', 'assets/sprites/test/sprite-test.png');

    scene.load.image('npc1-down1', 'assets/sprites/test/frames/move-down/move-dw1.png');
    scene.load.image('npc1-down2', 'assets/sprites/test/frames/move-down/move-dw2.png');
    scene.load.image('npc1-down3', 'assets/sprites/test/frames/move-down/move-dw3.png');
    
    scene.load.image('npc1-left1', 'assets/sprites/test/frames/move-left/move-l1.png');
    scene.load.image('npc1-left2', 'assets/sprites/test/frames/move-left/move-l2.png');
    scene.load.image('npc1-left3', 'assets/sprites/test/frames/move-left/move-l3.png');
    scene.load.image('npc1-left4', 'assets/sprites/test/frames/move-left/move-l4.png');

    scene.load.image('npc1-right1', 'assets/sprites/test/frames/move-right/move-r1.png');
    scene.load.image('npc1-right2', 'assets/sprites/test/frames/move-right/move-r2.png');
    scene.load.image('npc1-right3', 'assets/sprites/test/frames/move-right/move-r3.png');
    scene.load.image('npc1-right4', 'assets/sprites/test/frames/move-right/move-r4.png');

    scene.load.image('npc1-up1', 'assets/sprites/test/frames/move-up/move-up1.png');
    scene.load.image('npc1-up2', 'assets/sprites/test/frames/move-up/move-up2.png'); 
    scene.load.image('npc1-up3', 'assets/sprites/test/frames/move-up/move-up3.png'); 

    scene.load.image('npc1-turn1', 'assets/sprites/test/frames/turn/turn.png');
    scene.load.image('npc1-turn2', 'assets/sprites/test/frames/turn/turn2.png');
} 

export function NPCAnimations(scene) {
    if (scene.anims.exists('npc1-move-down')) return;

    scene.anims.create({
        key: 'npc1-turn',
        frames: [
            { key: 'npc1-turn1' },
            { key: 'npc1-turn2' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'npc1-move-down',
        frames: [
            { key: 'npc1-down1' },
            { key: 'npc1-down2' },
            { key: 'npc1-down3' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'npc1-move-left',
        frames: [
            { key: 'npc1-left1' },
            { key: 'npc1-left2' },
            { key: 'npc1-left3' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'npc1-move-right',
        frames: [
            { key: 'npc1-right1' },
            { key: 'npc1-right2' },
            { key: 'npc1-right3' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'npc1-move-up',
        frames: [
            { key: 'npc1-up1' },
            { key: 'npc1-up2' },
            { key: 'npc1-up3' }
        ],
        frameRate: 6,
        repeat: -1
    });
}

