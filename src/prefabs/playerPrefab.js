export default class PlayerPrefab extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x ?? 24, y ?? 38, texture || "dante", frame);

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.name = "player";
        this.setCollideWorldBounds(true);
        this.body.setSize(8, 8);

        this.AutoPlayAnimation = "turn";
        this.scene.events.once("create", () => this.awake());
    }

    /** @type {string} */
	AutoPlayAnimation = "turn";

    awake() {
        this.play(this.AutoPlayAnimation);
    }

}
