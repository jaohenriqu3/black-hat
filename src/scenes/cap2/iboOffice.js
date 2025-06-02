import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js"; 

import CoreBar from "../../components/coreBar/coreBar.js"; 
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js";
import systemMessage from "../../components/systemMessage/systemMessage.js"; 

import MayaPrefab from "../../prefabs/NPCs/maya/mayaPrefab.js"; 
import { preloadMaya, MayaAnimations } from "../../prefabs/NPCs/maya/mayaAnimation.js";

export default class IboOffice extends Phaser.Scene {

    constructor() {
        super("IboOffice");
    }

    preload() {

        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.tilemapTiledJSON("iboOffice", "assets/tilemaps/iboOffice.json");

        this.load.image("officeWalls", "assets/tilesets/walls.png"); 
        this.load.image("officeInfra", "assets/tilesets/infra2.png"); 
        this.load.image("officeInfra2", "assets/tilesets/board.png"); 
        this.load.image("officeRoom", "assets/tilesets/room.png"); 
        this.load.image("officeRoom2", "assets/tilesets/room2.png"); 

        this.load.image("keyE", "assets/inputs/keyE/keyE.png"); 

        this.load.audio('step', 'assets/audios/steps/indoor-footsteps.mp3');

        preloadPlayerAnimations(this) 
        preloadMaya(this)
        
        console.log(this.textures.list);
    }

    create() {

        EscMenu(this)
        addMenuButton(this);
        this.coreBar = new CoreBar(this, 10, 50);
        this.coinBar = new CoinBar(this, this.cameras.main.width); 

        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); 
        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        // Tilemap
        this.IboOffice = this.make.tilemap({ key: "iboOffice" }); 

        const officeWalls = this.IboOffice.addTilesetImage("officeWalls", "officeWalls"); 
        const officeInfra = this.IboOffice.addTilesetImage("officeInfra", "officeInfra");
        const officeInfra2 = this.IboOffice.addTilesetImage("officeInfra2", "officeInfra2");
        const officeRoom = this.IboOffice.addTilesetImage("officeRoom", "officeRoom");
        const officeRoom2 = this.IboOffice.addTilesetImage("officeRoom2", "officeRoom2");

        // Layers
        this.IboOffice.createLayer("Chao", officeWalls, 100, 0);
        const wallsOffice = this.IboOffice.createLayer("Parede", officeWalls, 100, 0);
        const objetosOffice = this.IboOffice.createLayer("Objetos", [officeInfra, officeInfra2, officeRoom, officeRoom2], 100, 0).setDepth(2);
        const objetosOffice2 = this.IboOffice.createLayer("Objetos2", [officeInfra, officeInfra2, officeRoom, officeRoom2], 100, 0).setDepth(3);

        // Player
        this.player = new PlayerPrefab(this, 315, 270, "dante").setDepth(10);
        this.physics.add.existing(this.player);
         PlayerAnimations(this)

        //NPC 
        MayaAnimations(this)
        this.maya = new MayaPrefab(this, 252, 65, "maya").setDepth(1); 

        this.stepSound = this.sound.add('step', {
            loop: true,
            volume: 1.5, 
            rate: 1.3
        }); 

        //Collider
        wallsOffice.setCollisionByProperty({ collider: true }); 
        wallsOffice.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsOffice)

        objetosOffice.setCollisionByProperty({ collider: true }); 
        objetosOffice.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosOffice); 

        objetosOffice2.setCollisionByProperty({ collider: true }); 
        objetosOffice2.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosOffice2);

        this.doorZones = this.physics.add.staticGroup();

      //this.iboOutDoor = this.createDoor(315, 270, "Pressione E para sair do escritório", "IboDelfi");
      //this.mayaOffice = this.createDoor(270, 85, "Pressione C para falar com Maya Rios", null);

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.IboOffice.widthInPixels, this.IboOffice.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        this.showMayaDialog()
    }

    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false);
        door.textBackground = this.add.rectangle(x, y - 10, 240, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false); 
        door.enterText = this.add.text(x, y - 10, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false);
        door.enterImage = this.add.image(x, y + 20, "keyE").setOrigin(0.5).setScale(1.8).setVisible(false);
        door.sceneName = sceneName;
    
        this.physics.add.overlap(this.player, door, () => this.showEnterPrompt(door), null, this);
        return door;
    }

     showEnterPrompt(door) {
        door.textBackground.setVisible(true).setDepth(10);
        door.enterText.setVisible(true).setDepth(10);
        door.enterImage.setVisible(true).setDepth(10);
    
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            window.lastScene = "IboOffice";
            this.scene.start(door.sceneName);
        }
    }

    showMayaDialog(){ 
        this.dialogIndex = 0; 

        this.dialogActive = true;
        this.dialogLocked = false; 
        
        systemMessage(this, GameState.iboOfficeDialog[this.dialogIndex]); 

        this.input.keyboard.off("keydown-ENTER");

        this.input.keyboard.on("keydown-ENTER", () => {

        if (this.dialogLocked || !this.dialogActive) return;

        this.dialogIndex++; 

        if (this.dialogIndex >= GameState.iboOfficeDialog.length) {
            this.dialogLocked = true;
            this.dialogActive = false;

            this.cameras.main.fadeOut(2000, 0, 0, 0);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                window.lastScene = "IboOffice";
                this.scene.start("Chapter2Cassino");
            });
            return;
        }
        systemMessage(this, GameState.iboOfficeDialog[this.dialogIndex]);
        });  
    }

    update() {
        let moving = false; 
        this.player.setVelocity(0);

        if (this.left_key.isDown){
            this.player.setVelocityX(-50);
            this.player.play('move-left' , true);
            this.lastDirection = "d-left";
            moving = true 
        } 
        else if (this.right_key.isDown){
            this.player.setVelocityX(50);
            this.player.play('move-right', true);
            this.lastDirection = "d-right"; 
            moving = true 
        }
        else if (this.up_key.isDown){
            this.player.setVelocityY(-50); 
            this.player.play('move-up', true)
            this.lastDirection = "d-up"; 
            moving = true 
        } 
        else if (this.down_key.isDown){
            this.player.setVelocityY(50);
            this.player.play('move-down', true);
            this.lastDirection = "d-right"; 
            moving = true 
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