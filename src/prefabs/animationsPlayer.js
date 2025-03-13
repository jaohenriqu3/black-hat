export function preloadPlayerAnimations(scene) {
    scene.load.image('dante', 'assets/sprites/dante/dante.png');

    scene.load.image('move-down1', 'assets/sprites/dante/move-down/dante-move-down-1.png');
    scene.load.image('move-down2', 'assets/sprites/dante/move-down/dante-move-down-2.png');
    scene.load.image('move-down3', 'assets/sprites/dante/move-down/dante-move-down-3.png'); 

    scene.load.image('move-left1', 'assets/sprites/dante/move-left/dante-move-left-1.png');
    scene.load.image('move-left2', 'assets/sprites/dante/move-left/dante-move-left-2.png');
    scene.load.image('move-left3', 'assets/sprites/dante/move-left/dante-move-left-3.png');
    scene.load.image('move-left4', 'assets/sprites/dante/move-left/dante-move-left-4.png');

    scene.load.image('move-right1', 'assets/sprites/dante/move-right/dante-move-right-1.png');
    scene.load.image('move-right2', 'assets/sprites/dante/move-right/dante-move-right-2.png');
    scene.load.image('move-right3', 'assets/sprites/dante/move-right/dante-move-right-3.png');
    scene.load.image('move-right4', 'assets/sprites/dante/move-right/dante-move-right-4.png');

    scene.load.image('move-up1', 'assets/sprites/dante/move-up/dante-move-up-1.png');
    scene.load.image('move-up2', 'assets/sprites/dante/move-up/dante-move-up-2.png');
    scene.load.image('move-up3', 'assets/sprites/dante/move-up/dante-move-up-3.png'); 

    scene.load.image('turn1', 'assets/sprites/dante/turn/dante-turn-1.png');
    scene.load.image('turn2', 'assets/sprites/dante/turn/dante-turn-2.png');

    scene.load.image('turn2-1', 'assets/sprites/dante/turn2/dante-turn-2-1.png');
    scene.load.image('turn2-2', 'assets/sprites/dante/turn2/dante-turn-2-2.png'); 

    scene.load.image('turn-up-1', 'assets/sprites/dante/turn-up/dante-turn-up-1.png');
    scene.load.image('turn-up-2', 'assets/sprites/dante/turn-up/dante-turn-up-2.png');
}

export function PlayerAnimations(scene) {
    if (scene.anims.exists('move-down')) return;

    scene.anims.create({
        key: 'move-down',
        frames: [
            { key: 'move-down1' },
            { key: 'move-down2' },
            { key: 'move-down3' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'move-left',
        frames: [
            { key: 'move-left1' },
            { key: 'move-left2' },
            { key: 'move-left3' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'move-right',
        frames: [
            { key: 'move-right1' },
            { key: 'move-right2' },
            { key: 'move-right3' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'move-up',
        frames: [
            { key: 'move-up1' },
            { key: 'move-up2' },
            { key: 'move-up3' }
        ],
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn',
        frames: [
            { key: 'turn1' },
            { key: 'turn2' }
        ],
        frameRate: 2,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn2',
        frames: [
            { key: 'turn2-1' },
            { key: 'turn2-2' }
        ],
        frameRate: 2,
        repeat: -1
    });

    scene.anims.create({
        key: 'turn-up',
        frames: [
            { key: 'turn-up-1' },
            { key: 'turn-up-2' }
        ],
        frameRate: 2,
        repeat: -1
    });
}
