export default class C6Prefab extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'c6');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setScale(1.0);
        this.setDepth(4); 

        this.play('c6');
    }

    update() {
    }
}
