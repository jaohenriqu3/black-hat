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

        this.load.image("keyE", "assets/inputs/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {
        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap
        this.delfiCity_7 = this.make.tilemap({ key: "delfiCity-7" });
        const tileset = this.delfiCity_7.addTilesetImage("city-map", "tilemap_packed");

        // Layers
        this.delfiCity_7.createLayer("Chão", tileset, 0, 0);
        const objetos = this.delfiCity_7.createLayer("Objetos", tileset, 0, 0);

        // Player
        this.player = new PlayerPrefab(this, 1030, 371, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        objetos.setCollisionByProperty({ collider: true }); 
        objetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetos); 

        // Criar uma zona de interação para a porta
        this.doorZone = this.physics.add.staticGroup();
        const lobbyDoor = this.doorZone.create(1030, 350,).setSize(50, 50).setVisible(null); // Posiciona e define o tamanho 

        // Texto e imagem do aviso de entrada (inicialmente invisíveis)
        this.enterText = this.add.text(1030, 330, "Pressione E para entrar em casa", { fontSize: "10px", fill: "#000000" }).setOrigin(0.5);
        this.enterText.setVisible(false);

        this.enterImage = this.add.image(1030, 310, "keyE").setOrigin(0.5).setScale(1.8);
        this.enterImage.setVisible(false);

        // Ativar detecção de sobreposição do player com a porta
        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
       // objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(2.0);
        this.cameras.main.setBounds(0, 0, this.delfiCity_7.widthInPixels, this.delfiCity_7.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    showEnterPrompt(player, lobbyDoor) {
        this.enterText.setVisible(true);
        this.enterImage.setVisible(true);

        // Verifica se o player pressionou "E"
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.scene.start("Lobby"); // Muda para a cena do Lobby
        }
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

        // Ocultar texto e imagem se o player se afastar da porta
        if (!this.physics.overlap(this.player, this.doorZone)) {
            this.enterText.setVisible(false);
            this.enterImage.setVisible(false);
        }
    }
}
