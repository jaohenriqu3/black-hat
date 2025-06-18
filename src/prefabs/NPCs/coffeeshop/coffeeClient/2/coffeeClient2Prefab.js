export default class CoffeeClient2Prefab extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'coffeeClient2');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setScale(1.0);
        this.setDepth(4); 

        this.play('coffeeClient2');
    }

    update() {
    }
}