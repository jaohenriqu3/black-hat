import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js"; 
import { MapM } from "../../components/map/mapM.js"; 

import CoreBar from "../../components/coreBar/coreBar.js";
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js";
import systemMessage from "../../components/systemMessage/systemMessage.js";


export default class DataCenter extends Phaser.Scene {

    constructor() {
        super("DataCenter");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.tilemapTiledJSON("dataCenter", "assets/tilemaps/data-center.json"); 

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image("baseData", "assets/tilesets/walls.png"); 
        this.load.image("infraData", "assets/tilesets/infra16.png"); 

        this.load.audio('step', 'assets/audios/steps/indoor-footsteps.mp3');
        this.load.audio('datacenter', 'assets/audios/dataCenter/dataCenter.mp3');  

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {

        addMenuButton(this); 
        EscMenu(this)
        MapM(this)
        this.coreBar = new CoreBar(this, 10, 50);
        this.coinBar = new CoinBar(this, this.cameras.main.width);

        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap
        this.dataCenter = this.make.tilemap({ key: "dataCenter" }); 

        const baseData = this.dataCenter.addTilesetImage("baseData", "baseData"); 
        const infraData = this.dataCenter.addTilesetImage("infraData", "infraData");
        
        // Layers
        this.dataCenter.createLayer("Chao", baseData, 40, 0);
        const wallsDataCenter = this.dataCenter.createLayer("Parede", baseData, 40, 0);
        const objetosDataCenter = this.dataCenter.createLayer("Objetos", infraData, 40, 0);
        const objetosDataCenter2= this.dataCenter.createLayer("Objetos2", infraData, 40, 0);
        const objetosDataCenter3 = this.dataCenter.createLayer("Objetos3", infraData, 40, 0);

         const spawnPositions = {
            "Doodle": { x: 195, y: 270 }, 
            "DataCenterPC": { x: 465, y: 90 } 
        };
        const spawn = spawnPositions[window.lastScene] || { x: 185, y: 270 };

        // Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        this.stepSound = this.sound.add('step', {
            loop: true,
            volume: 1.5, 
            rate: 1.5
        }); 

        this.dataCenterSound = this.sound.add('datacenter', {
            loop: true,
            volume: 1.0, 
        }); 

        this.dataCenterSound.play()

        //Collider
        wallsDataCenter.setCollisionByProperty({ collider: true }); 
        wallsDataCenter.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsDataCenter)

        objetosDataCenter.setCollisionByProperty({ collider: true }); 
        objetosDataCenter.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosDataCenter); 

        this.doorZones = this.physics.add.staticGroup();

       // this.doodleOutDoor = this.createDoor(195, 270, "Pressione E para sair do Data Center", "Doodle");
        this.dataCenterDoor = this.createDoor(465, 70, "Pressione E para acessar o computador", "DataCenterPC");

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this); 

        this.dialogIndex = 0;

        systemMessage(this, GameState.dataCenterDialog[this.dialogIndex])

        this.dialogActive = true;
        this.dialogLocked = false; 
    
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.dataCenter.widthInPixels, this.dataCenter.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }


    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false).setDepth(10);
        door.textBackground = this.add.rectangle(x, y - 10, 240, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false).setDepth(10).setScale(0.8); 
        door.enterText = this.add.text(x, y - 10, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false).setDepth(10).setScale(0.8);
        door.enterImage = this.add.image(x, y + 20, "keyE").setOrigin(0.5).setScale(1.8).setVisible(false).setDepth(10);
        door.sceneName = sceneName;
    
        this.physics.add.overlap(this.player, door, () => this.showEnterPrompt(door), null, this);
        return door;
    }

    showEnterPrompt(door) {
        door.textBackground.setVisible(true);
        door.enterText.setVisible(true);
        door.enterImage.setVisible(true);
    
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.dataCenterSound.stop()
            window.lastScene = "DataCenter";
            this.scene.start(door.sceneName);
            this.scene.stop();
        }
    }

    update() {
        this.player.setVelocity(0);

        let moving = false;

        if (this.left_key.isDown){
            this.player.setVelocityX(-50);
            this.player.play('move-left' , true);
            this.lastDirection = "d-left";
            moving = true;
        } 
        else if (this.right_key.isDown){
            this.player.setVelocityX(50);
            this.player.play('move-right', true);
            this.lastDirection = "d-right";
            moving = true;
        }
        else if (this.up_key.isDown){
            this.player.setVelocityY(-50); 
            this.player.play('move-up', true)
            this.lastDirection = "d-up";
            moving = true;
        } 
        else if (this.down_key.isDown){
            this.player.setVelocityY(50);
            this.player.play('move-down', true);
            this.lastDirection = "d-right";
            moving = true;
        } else {
            if (this.lastDirection === "d-right") {
                this.player.play('turn', true);
            } else if (this.lastDirection === "d-left") {
                this.player.play('turn2', true);
            } else if (this.lastDirection === "d-up") {
                this.player.play('turn-up', true); 
            }
        } 

        if (moving) {
            if (!this.stepSound.isPlaying) {
                this.stepSound.play();
            }
        } else {
            this.stepSound.stop();
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
            const screenPos = cam.getWorldPoint(cam.width, 0); 
            const margin = 5;
        
            const coinBarWidth = this.coinBar.container.width || 180; 

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