import PlayerPrefab from "../prefabs/playerPrefab.js"; 
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../components/menuButton/menuButton.js'; 
import { EscMenu } from "../components/menuButton/menuESC.js";

import CoreBar from "../components/coreBar/coreBar.js";

import CoinBar from "../components/coinBar/coinBar.js";
import Wallet from "../components/coinBar/walletState.js";

export default class Level extends Phaser.Scene {

    constructor() {
        super("Level");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");
        
        this.load.tilemapTiledJSON("delfiCity-7", "assets/tilemaps/delfiCity-7.json");
        this.load.image("tilemap_packed", "assets/tilesets/tilemap_packed.png"); 

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {

        addMenuButton(this);
        EscMenu(this)

        this.coreBar = new CoreBar(this, 10, 50); 
        this.coinBar = new CoinBar(this, this.cameras.main.width); 
        

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

        const spawnPositions = {
            "Lobby": { x: 1030, y: 371 },   
            "Coffe": { x: 680, y: 371 },    
            "Doodle": { x: 210, y: 390 },   
            "IboDelfi": {x: 422, y: 345},
            "Cassino": {x: 1335, y: 150}
        };

        const spawn = spawnPositions[window.lastScene] || { x: 405, y: 745  }; //Parque 

        //Parque: x: 405, y: 745
        
        // Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        objetos.setCollisionByProperty({ collider: true }); 
        objetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetos); 

        this.doorZones = this.physics.add.staticGroup();

        this.lobbyDoor = this.createDoor(1030, 350, "Pressione E para entrar em casa", "Lobby");
        this.cafeDoor = this.createDoor(680, 371, "Pressione E para entrar na cafeteria", "Coffe");
        this.doodleDoor = this.createDoor(210, 390, "Pressione E para entrar na Doodle", "Doodle");
        this.iboDoor = this.createDoor(422, 345, "Pressione E para entrar na IBODELFI", "IboDelfi");
        this.cassinoDoor = this.createDoor(1335, 150, "E para entrar no cassino", "Cassino");

        // Câmera
        this.cameras.main.setZoom(2.4);
        this.cameras.main.setBounds(0, 0, this.delfiCity_7.widthInPixels, this.delfiCity_7.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

   createDoor(x, y, text, sceneName) {
    const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false);
    door.textBackground = this.add.rectangle(x, y - 20, 220, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false); 
    door.enterText = this.add.text(x, y - 20, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false);
    door.enterImage = this.add.image(x, y - 40, "keyE").setOrigin(0.5).setScale(1.8).setVisible(false);
    door.sceneName = sceneName;

    this.physics.add.overlap(this.player, door, () => this.showEnterPrompt(door), null, this);
    return door;
    }

    showEnterPrompt(door) {
    door.enterText.setVisible(true);
    door.enterImage.setVisible(true);
    door.textBackground.setVisible(true);

    if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
        window.lastScene = "Level";
        this.scene.start(door.sceneName);
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

        if (this.menuButton && this.coreBar) {
            const cam = this.cameras.main;
            const screenPos = cam.getWorldPoint(0, 0);
            const margin = 10;
        
            this.menuButton.setPosition(screenPos.x + margin, screenPos.y + margin - 5);
        
            const coreBarX = this.menuButton.x + this.menuButton.displayWidth + margin ;
            const coreBarY = screenPos.y + margin ;
        
            this.coreBar.setPosition(coreBarX, coreBarY);
        }

        if (this.coinBar) {
            const cam = this.cameras.main;
            const screenPos = cam.getWorldPoint(cam.width, 0); // canto superior direito
            const margin = 5;
        
            const coinBarWidth = this.coinBar.container.width || 180; // largura do container (padrão 180)

            const coinBarX = screenPos.x - coinBarWidth - margin;
            const coinBarY = screenPos.y + margin + 3;
        
            this.coinBar.setPosition(coinBarX, coinBarY);
            this.coinBar.container.setScale(0.5)
        }
        
  
       this.doorZones.children.iterate((door) => {
        if (!this.physics.overlap(this.player, door)) {
            door.enterText.setVisible(false);
            door.enterImage.setVisible(false);
            door.textBackground.setVisible(false);
             }
        });
    }
}
