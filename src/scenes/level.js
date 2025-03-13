import PlayerPrefab from "../prefabs/playerPrefab.js"; 
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super("Level");
    }

    preload() {
        // Mapa e os tilesets
        this.load.tilemapTiledJSON("delfiCity-7", "assets/tilemaps/delfiCity-7.json");
        this.load.image("tilemap_packed", "assets/tilesets/tilemap_packed.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {
        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Tilemap
        this.delfiCity_7 = this.make.tilemap({ key: "delfiCity-7" });
        const tileset = this.delfiCity_7.addTilesetImage("city-map", "tilemap_packed");

        // Layers
        this.delfiCity_7.createLayer("Chão", tileset, 0, 0);
        const objetos = this.delfiCity_7.createLayer("Objetos", tileset, 0, 0);

        // Player
        this.player = new PlayerPrefab(this, 1022, 371, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        objetos.setCollisionByProperty({ collider: true }); 
        objetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetos);

    //Debug
       // objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(2.0);
        this.cameras.main.setBounds(0, 0, this.delfiCity_7.widthInPixels, this.delfiCity_7.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }



    update() {
        this.player.setVelocity(0);

		if (this.left_key.isDown){
			this.player.setVelocityX(-50);
			this.player.play('move-left' , true);
			this.lastDirection = "d-left";
		} 
		else if (this.right_key.isDown){
			this.player.setVelocityX(50);
			this.player.play('move-right', true);
			this.lastDirection = "d-right";
		}
		else if (this.up_key.isDown){
			this.player.setVelocityY(-50); 
			this.player.play('move-up', true)
			this.lastDirection = "d-up";
		} 
		else if (this.down_key.isDown){
			this.player.setVelocityY(50);
			this.player.play('move-down', true);
			this.lastDirection = "d-right";
	    } else {
			if (this.lastDirection === "d-right") {
				this.player.play('turn', true);
			} else if (this.lastDirection === "d-left") {
				this.player.play('turn2', true);
			} else if (this.lastDirection === "d-up") {
				this.player.play('turn-up', true); 
			}
		}
    }
}
