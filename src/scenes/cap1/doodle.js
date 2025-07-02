import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js";

import { MapM } from "../../components/map/mapM.js"; 

import CoreBar from "../../components/coreBar/coreBar.js";
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js"; 
import systemMessage from "../../components/systemMessage/systemMessage.js";

import { preloadVictorAnimation, VictorAnimation } from "../../prefabs/NPCs/victor/animationVictor.js"; 
import { preloadDianaAnimation, dianaAnimation } from "../../prefabs/NPCs/diana/dianaAnimation.js";
import { preloadDoodleFanAnimation } from "../../prefabs/NPCs/doodle/1/doodleFanAnimation.js";
import { preloadDoodleFan2Animation } from "../../prefabs/NPCs/doodle/2/doodleFan2Animation.js";
import { preloadDoodleFan3Animation } from "../../prefabs/NPCs/doodle/3/doodleFan3Animation.js";
import { preloadDoodleFan4Animation } from "../../prefabs/NPCs/doodle/4/doodleFan4Animation.js";
import { preloadDoodleFan5Animation } from "../../prefabs/NPCs/doodle/5/doodleFan5Animation.js";
import { preloadDoodleFan6Animation } from "../../prefabs/NPCs/doodle/6/doodleFan6Animation.js";
import { preloadDoodleFan7Animation } from "../../prefabs/NPCs/doodle/7/doodleFan7Animation.js";
import { preloadDoodleFan8Animation } from "../../prefabs/NPCs/doodle/8/doodleFan8Animation.js";
import { preloadDoodleFan9Animation } from "../../prefabs/NPCs/doodle/9/doodleFan9Animation.js";

import { spawnAllNpcs } from "../../prefabs/managers/doodleManager.js";

export default class Doodle extends Phaser.Scene {

    constructor() {
        super("Doodle");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.tilemapTiledJSON("doodle", "assets/tilemaps/doodle.json");

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image("wallsDoodle", "assets/tilesets/walls.png"); 
        this.load.image("pcDoodle", "assets/tilesets/infra16.png")
        this.load.image("stage", "assets/tilesets/stage.png"); 
        this.load.image("plays", "assets/tilesets/plays.png"); 
        this.load.image("television", "assets/tilesets/television.png");
        this.load.image("music", "assets/tilesets/music.png");
        this.load.image("logo", "assets/tilesets/tilemap_packed.png");

        this.load.audio('step', 'assets/audios/steps/indoor-footsteps.mp3');
        this.load.audio('officeParty', 'assets/audios/office/OfficeParty.mp3'); 
        
        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)

        preloadVictorAnimation(this) 
        preloadDianaAnimation(this)
        preloadDoodleFanAnimation(this)
        preloadDoodleFan2Animation(this)
        preloadDoodleFan3Animation(this)
        preloadDoodleFan4Animation(this)
        preloadDoodleFan5Animation(this)
        preloadDoodleFan6Animation(this)
        preloadDoodleFan7Animation(this)
        preloadDoodleFan8Animation(this)
        preloadDoodleFan9Animation(this)
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
        this.doodle = this.make.tilemap({ key: "doodle" }); 

        const wallsDoodle = this.doodle.addTilesetImage("wallsDoodle", "wallsDoodle"); 
        const pcDoodle = this.doodle.addTilesetImage("pcDoodle", "pcDoodle");
        const stage = this.doodle.addTilesetImage("stage", "stage");
        const playsDoodle = this.doodle.addTilesetImage("plays", "plays") 
        const television = this.doodle.addTilesetImage("television", "television");
        const music = this.doodle.addTilesetImage("music", "music"); 
        const logo =  this.doodle.addTilesetImage("logo", "logo")

        // Layers
        const doodleBase = this.doodle.createLayer("Chao", wallsDoodle, 0, 0).setDepth(0);
        const wallsDoodleLayer = this.doodle.createLayer("Parede", wallsDoodle, 0, 0).setDepth(1);
        const objetosDoodle = this.doodle.createLayer("Objetos", [pcDoodle, stage, playsDoodle, television, music], 0, 0).setDepth(2);
        const objetosDoodle2 = this.doodle.createLayer("Objetos2", [pcDoodle, stage, playsDoodle, television, music], 0, 0).setDepth(3);
        const objetosDoodle3 = this.doodle.createLayer("Objetos3", [pcDoodle, stage, playsDoodle, television, music, logo], 0, 0).setDepth(4);

        const spawnPositions = {
            "Level": { x: 400, y: 400 }, 
            "DataCenter": { x: 135, y: 75 },
            "Chapter1GameOver": { x: 400, y: 400 },
        };
        const spawn = spawnPositions[window.lastScene] || { x: 400, y: 400 };

        //Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante").setDepth(10);
        this.physics.add.existing(this.player);

        PlayerAnimations(this) 

        spawnAllNpcs(this); 

        this.physics.add.collider(this.player, this.doodleFan)
        this.physics.add.collider(this.player, this.doodleFan2)
        this.physics.add.collider(this.player, this.doodleFan3)
        this.physics.add.collider(this.player, this.doodleFan4)
        this.physics.add.collider(this.player, this.doodleFan5)
        this.physics.add.collider(this.player, this.doodleFan6)
        this.physics.add.collider(this.player, this.doodleFan7)
        this.physics.add.collider(this.player, this.doodleFan8)
        this.physics.add.collider(this.player, this.doodleFan9)

        //audios 
        this.stepSound = this.sound.add('step', {
            loop: true,
            volume: 1.5, 
            rate: 1.3
        }); 

        this.office = this.sound.add('officeParty', {
            loop: true,
            volume: 0.3, 
        }); 

        this.office.play()
        
        //Collider
        wallsDoodleLayer.setCollisionByProperty({ collider: true }); 
        wallsDoodleLayer.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsDoodleLayer)

        objetosDoodle.setCollisionByProperty({ collider: true }); 
        objetosDoodle.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosDoodle); 

        this.doorZones = this.physics.add.staticGroup();

       // this.doodleOutDoor = this.createDoor(400, 400, "Pressione E para sair da Doodle", "Level");
        this.dataCenterDoor = this.createDoor(135, 55, "Pressione E para entrar no Data Center", "DataCenter");

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        this.cameras.main.setZoom(2.4);
        this.cameras.main.setBounds(0, 0, this.doodle.widthInPixels, this.doodle.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.dialogIndex = 0;

        systemMessage(this, GameState.doodleDialog[this.dialogIndex])

        this.dialogActive = true;
        this.dialogLocked = false; 
        this.dialogSequence = GameState.doodleDialog;
    } 

    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false).setDepth(10);
        door.textBackground = this.add.rectangle(x, y - 10, 240, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false).setDepth(10); 
        door.enterText = this.add.text(x, y - 10, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false).setDepth(10);
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
            this.office.stop()
            window.lastScene = "Doodle";
            this.scene.start(door.sceneName);
            this.scene.stop();
        }
    }

    update() {
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

        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.dialogIndex++; 
        if (this.dialogIndex < GameState.doodleDialog.length) {
            systemMessage(this, GameState.doodleDialog[this.dialogIndex]);
        } else {
            this.dialogLocked = true; 
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