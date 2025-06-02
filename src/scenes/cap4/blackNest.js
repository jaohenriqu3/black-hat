import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js";

import CoreBar from "../../components/coreBar/coreBar.js";
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js"; 
import systemMessage from "../../components/systemMessage/systemMessage.js";

export default class BlackNest extends Phaser.Scene {

    constructor() {
        super("BlackNest");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.tilemapTiledJSON("blacknest", "assets/tilemaps/blacknest.json");

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image("base", "assets/tilesets/walls.png"); 
        this.load.image("blackitems", "assets/tilesets/infra16.png")
        this.load.image("blackitems2", "assets/tilesets/infra2.png");

        this.load.image("blackitems3", "assets/tilesets/museum.png"); 
        this.load.image("blackitems4", "assets/tilesets/halloween.png"); 

        this.load.audio('step', 'assets/audios/steps/indoor-footsteps.mp3');
        this.load.audio('datacenter', 'assets/audios/dataCenter/dataCenter.mp3'); 

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)

        console.log(this.textures.list);
    }

    create() {

        console.log("Cenas ativas:", this.scene.manager.getScenes(true).map(s => s.scene.key));

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
        this.blackNest = this.make.tilemap({ key: "blacknest" }); 

        const walls = this.blackNest.addTilesetImage("base", "base"); 
        const infra = this.blackNest.addTilesetImage("blackitems", "blackitems");
        const infra2 = this.blackNest.addTilesetImage("blackitems2", "blackitems2"); 
        const obj = this.blackNest.addTilesetImage("blackitems3", "blackitems3");
        const obj2 = this.blackNest.addTilesetImage("blackitems4", "blackitems4");

        // Layers
        const blackBase = this.blackNest.createLayer("Chao", walls, 170, 0).setDepth(0);
        const wallsBlack = this.blackNest.createLayer("Parede", walls, 170, 0).setDepth(1);
        const wallsBlack2 = this.blackNest.createLayer("Parede2", walls, 170, 0).setDepth(1);
        const objetosBlack = this.blackNest.createLayer("Objetos", [infra, infra2, obj, obj2], 170, 0).setDepth(2);
        const objetosBlack2 = this.blackNest.createLayer("Objetos2", [infra, infra2, obj, obj2], 170, 0).setDepth(3);
        const objetosBlack3 = this.blackNest.createLayer("Objetos3", [infra, infra2, obj, obj2], 170, 0).setDepth(4);

        const spawnPositions = {
            "Chapter1GameOver": { x: 290, y: 420  },
        };

        const spawn = spawnPositions[window.lastScene] || { x: 290, y: 420 };

        //Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante").setDepth(10);
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
        wallsBlack.setCollisionByProperty({ collider: true }); 
        wallsBlack.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsBlack)

        objetosBlack.setCollisionByProperty({ collider: true }); 
        objetosBlack.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosBlack); 

        objetosBlack2.setCollisionByProperty({ collider: true }); 
        objetosBlack2.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosBlack2); 

        objetosBlack3.setCollisionByProperty({ collider: true }); 
        objetosBlack3.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosBlack3);

        this.doorZones = this.physics.add.staticGroup();

       //this.doodleOutDoor = this.createDoor(400, 400, "Pressione E para sair da Doodle", "Level");
        this.dataCenterDoor = this.createDoor(290, 20, "Pressione E para entrar na sala de Corvus", "BlackLock");

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.blackNest.widthInPixels, this.blackNest.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    } 

    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false).setDepth(10);
        door.textBackground = this.add.rectangle(x, y - 10, 250, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false).setDepth(10); 
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
            window.lastScene = "BlackNest";
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