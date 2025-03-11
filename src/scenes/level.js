import PlayerPrefab from "../prefabs/playerPrefab.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super("Level");
    }

    preload() {
        // Mapa e os tilesets
        this.load.tilemapTiledJSON("delfiCity-7", "assets/tilemaps/delfiCity-7.json");
        this.load.image("tilemap_packed", "assets/tilesets/tilemap_packed.png");
        
        // Animações
        this.load.image('dante', 'assets/sprites/dante/dante.png');

        this.load.image('move-down1', 'assets/sprites/dante/move-down/dante-move-down-1.png');
        this.load.image('move-down2', 'assets/sprites/dante/move-down/dante-move-down-2.png');
        this.load.image('move-down3', 'assets/sprites/dante/move-down/dante-move-down-3.png'); 

        this.load.image('move-left1', 'assets/sprites/dante/move-left/dante-move-left-1.png');
        this.load.image('move-left2', 'assets/sprites/dante/move-left/dante-move-left-2.png');
        this.load.image('move-left3', 'assets/sprites/dante/move-left/dante-move-left-3.png');
        this.load.image('move-left4', 'assets/sprites/dante/move-left/dante-move-left-4.png');

        this.load.image('move-right1', 'assets/sprites/dante/move-right/dante-move-right-1.png');
        this.load.image('move-right2', 'assets/sprites/dante/move-right/dante-move-right-2.png');
        this.load.image('move-right3', 'assets/sprites/dante/move-right/dante-move-right-3.png');
        this.load.image('move-right4', 'assets/sprites/dante/move-right/dante-move-right-4.png');

        this.load.image('move-up1', 'assets/sprites/dante/move-up/dante-move-up-1.png');
        this.load.image('move-up2', 'assets/sprites/dante/move-up/dante-move-up-2.png');
        this.load.image('move-up3', 'assets/sprites/dante/move-up/dante-move-up-3.png'); 

        this.load.image('turn1', 'assets/sprites/dante/turn/dante-turn-1.png');
        this.load.image('turn2', 'assets/sprites/dante/turn/dante-turn-2.png');

        this.load.image('turn2-1', 'assets/sprites/dante/turn2/dante-turn-2-1.png');
        this.load.image('turn2-2', 'assets/sprites/dante/turn2/dante-turn-2-2.png'); 

        this.load.image('turn-up-1', 'assets/sprites/dante/turn-up/dante-turn-up-1.png');
        this.load.image('turn-up-2', 'assets/sprites/dante/turn-up/dante-turn-up-2.png');

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

        this.anims.create({
            key: 'move-down',
            frames: [
                { key: 'move-down1' },
                { key: 'move-down2' },
                { key: 'move-down3' }
            ],
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'move-left',
            frames: [
                { key: 'move-left1' },
                { key: 'move-left2' },
                { key: 'move-left3' }
            ],
            frameRate: 6,
            repeat: -1
        });


        this.anims.create({
            key: 'move-right',
            frames: [
                { key: 'move-right1' },
                { key: 'move-right2' },
                { key: 'move-right3' }
            ],
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'move-up',
            frames: [
                { key: 'move-up1' },
                { key: 'move-up2' },
                { key: 'move-up3' }
            ],
            frameRate: 6,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [
                { key: 'turn1' },
                { key: 'turn2' }
            ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'turn2',
            frames: [
                { key: 'turn2-1' },
                { key: 'turn2-2' }
            ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'turn-up',
            frames: [
                { key: 'turn-up-1' },
                { key: 'turn-up-2' }
            ],
            frameRate: 2,
            repeat: -1
        });

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
