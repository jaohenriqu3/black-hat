import PlayerPrefab from "../../prefabs/playerPrefab.js"; 
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js";

import CoreBar from "../../components/coreBar/coreBar.js"; 
import CoinBar from "../../components/coinBar/coinBar.js";

import GameState from "../../state/gameState.js"; 
import systemMessage from "../../components/systemMessage/systemMessage.js";
import { delfiCityDialog } from "../../components/systemMessage/systemMessage.js";

import { preloadNPCAnimations, NPCAnimations } from "../../prefabs/NPCs/test/testAnimation.js";
import NpcPrefab from "../../prefabs/NPCs/test/testPrefab.js";

export default class DelfiCity extends Phaser.Scene {

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

        this.load.audio('out-step', 'assets/audios/steps/outside-footsteps.mp3');
        this.load.audio('city', 'assets/audios/city/city-sound.mp3');
        this.load.audio('initial-music', 'assets/audios/music/initial-music.mp3');

        this.load.image("dante-in-pc", "assets/images/dante-in-pc.jpeg");
    
        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        preloadNPCAnimations(this);
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
            "Cassino": {x: 1335, y: 150},
            "Chapter1Corvus": {x: 210, y: 390},
            "Chapter2Cassino": {x: 422, y: 345},
        };

        const spawn = spawnPositions[window.lastScene] || { x: 405, y: 745  }; 

        //Parque: x: 405, y: 745
        
        // Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante");
        this.physics.add.existing(this.player);
        PlayerAnimations(this) 

        //Som
        this.citySound = this.sound.add('city', {
            loop: true,
            volume: 1.0, 
            rate: 1.0
        }); 

        this.initialMusic = this.sound.add('initial-music', {
            loop: true,
            volume: 1.0, 
            rate: 1.0
            }
        )

        this.citySound.play();

        this.events.on('shutdown', () => {
            if (this.citySound && this.citySound.isPlaying) {
            this.citySound.stop();
            }
        });

        //Step
        this.stepSound = this.sound.add('out-step', {
            loop: true,
            volume: 1.0, 
            rate: 1.0
        });

        this.events.on('shutdown', () => {
            if (this.StepSound && this.StepSound.isPlaying) {
            this.stepSound.stop();
            }
        });
        
        //NPC
         this.npc = new NpcPrefab(this, 650, 390, 'npc-test');
         //this.physics.add.collider(this.npc, objetos);
         NPCAnimations(this);

        this.physics.add.collider(this.player, this.npc)

        //Collider 
        objetos.setCollisionByProperty({ collider: true }); 
        objetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetos); 

        this.doorZones = this.physics.add.staticGroup();

        this.lobbyDoor = this.createDoor(1030, 350, "Pressione E para entrar em casa", "Lobby");
        this.cafeDoor = this.createDoor(680, 371, "Pressione E para entrar na cafeteria", "Coffe");
       // this.doodleDoor = this.createDoor(210, 390, "Pressione E para entrar na Doodle", "Doodle");
       // this.iboDoor = this.createDoor(422, 345, "Pressione E para entrar na IBODELFI", "IboDelfi");
        this.cassinoDoor = this.createDoor(1335, 150, "E para entrar no cassino", "Cassino");

        // Câmera
        this.cameras.main.setZoom(2.2);
        this.cameras.main.setBounds(0, 0, this.delfiCity_7.widthInPixels, this.delfiCity_7.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        if (window.playEntranceAnimation) {
        this.entraceAnimation();
        window.playEntranceAnimation = false;
        }

        this.waitingForEnterAfterCutscene = true;

        this.typingTimer = null;
    }

    entraceAnimation(){ 
        this.player.setVisible(true);

        this.coinBar.setVisible(false) 
        this.menuButton.setVisible(false) 
        this.coreBar.setVisible(false) 

        this.player.body.enable = false;
        this.citySound.stop(); 
       // this.initialMusic.play()

        this.cameras.main.setZoom(1.2);
         this.cameras.main.fadeIn(10000, 0, 0, 0);
        this.cameras.main.stopFollow(); 

        this.cameras.main.scrollX = 0;
        this.cameras.main.scrollY = 200; 

        const scrollDistance = 1400; 
        const scrollDuration = 150000; 

        systemMessage(this, delfiCityDialog[0]);

        this.tweens.add({
            targets: this.cameras.main,
            scrollX: scrollDistance,
            ease: 'Sine.easeInOut',
            duration: scrollDuration,
        });
        
        this.waitingForEnterAfterCutscene = true
            this.input.keyboard.once('keydown-ENTER', () => {
                this.waitingForEnterAfterCutscene = false;
                this.showIntroIllustration();
        });
    }

    showIntroIllustration() {
    const { width, height } = this.cameras.main;

    this.illustration = this.add.image(width / 2, height / 2, 'dante-in-pc')
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(999);

        systemMessage(this, delfiCityDialog[1])

    this.input.keyboard.once('keydown-ENTER', () => {

        if (this.illustration) {
            this.illustration.destroy();
        }

        if (this.initialMusic && this.initialMusic.isPlaying) {
        this.initialMusic.stop();
        } 
        this.sound.stopAll();

        this.time.delayedCall(100, () => {
        this.scene.start("TutorialCut");
        });

        this.coinBar.setVisible(true);
        this.menuButton.setVisible(true);
        this.coreBar.setVisible(true);

        this.player.setVisible(true);
        this.player.body.enable = true;
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.citySound.resume();

    });
}
    waitForIntroEnter() {
    this.introBg = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "dante-in-pc")
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(999); 

    this.dialogs = delfiCityDialog;
    this.dialogIndex = 0;
    systemMessage(this, this.dialogs[this.dialogIndex]);

    this.input.keyboard.once("keydown-ENTER", () => {
        this.advanceIntroDialog();
    });
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
        this.stepSound.stop();
        this.scene.start(door.sceneName);
        }
    }   

    update(time, delta) {

        let moving = false; 

        this.player.setVelocity(0);

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

        this.npc.update(time, delta);

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
