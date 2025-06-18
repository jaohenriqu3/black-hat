import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js"; 
import { MapM } from "../../components/map/mapM.js";

import CoreBar from "../../components/coreBar/coreBar.js";
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js"; 
import systemMessage from "../../components/systemMessage/systemMessage.js";

import CorvusPrefab from "../../prefabs/NPCs/corvus/corvusPrefab.js";
import { preloadCorvusAnimation, corvusAnimation } from "../../prefabs/NPCs/corvus/corvusAnimation.js";

export default class BlackOffice extends Phaser.Scene {

    constructor() {
        super("BlackOffice");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.tilemapTiledJSON("blackOffice", "assets/tilemaps/blackOffice.json");

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image("base", "assets/tilesets/walls.png"); 

        this.load.image("blackofficeitems", "assets/tilesets/infra16.png")
        this.load.image("blackofficeitems2", "assets/tilesets/halloween.png");
        this.load.image("blackofficeitems3", "assets/tilesets/infra2.png");

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");
        
        preloadPlayerAnimations(this)
        preloadCorvusAnimation(this)

        console.log(this.textures.list);
    }

    create() {
        addMenuButton(this);
        EscMenu(this);
        MapM(this);

        this.coreBar = new CoreBar(this, 10, 50);
        this.coinBar = new CoinBar(this, this.cameras.main.width);

        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap
        this.blackNest = this.make.tilemap({ key: "blackOffice" }); 

        const walls = this.blackNest.addTilesetImage("base", "base"); 
        const infra = this.blackNest.addTilesetImage("blackofficeitems", "blackofficeitems");
        const infra2 = this.blackNest.addTilesetImage("blackofficeitems2", "blackofficeitems2"); 
        const obj = this.blackNest.addTilesetImage("blackofficeitems3", "blackofficeitems3");

        // Layers
        const blackBase = this.blackNest.createLayer("Chao", walls, 170, 0).setDepth(0);
        const wallsBlack = this.blackNest.createLayer("Parede", walls, 170, 0).setDepth(1);
        const wallsBlack2 = this.blackNest.createLayer("Parede2", walls, 170, 0).setDepth(1); 
        const wallsBlack3 = this.blackNest.createLayer("Parede3", walls, 170, 0).setDepth(1); 
        const objetosUnder = this.blackNest.createLayer("ObjetosUnder", [infra, infra2, obj], 170, 0).setDepth(2);
        const objetosBlack = this.blackNest.createLayer("Objetos", [infra, infra2, obj], 170, 0).setDepth(2);
        const objetosBlack2 = this.blackNest.createLayer("Objetos2", [infra, infra2, obj], 170, 0).setDepth(3);
        const objetosBlack3 = this.blackNest.createLayer("Objetos3", [infra, infra2, obj], 170, 0).setDepth(4);

        const spawnPositions = {
            "BlackLock": { x: 290, y: 270 },
        };

        const spawn = spawnPositions[window.lastScene] || { x: 290, y: 270 };

        //Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante").setDepth(10);
        this.physics.add.existing(this.player);

        PlayerAnimations(this) 

        //NPC
        corvusAnimation(this) 
        this.corvus = new CorvusPrefab(this, 275, 65).setDepth(1)
        this.physics.add.collider(this.player, this.corvus)

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

       // this.doodleOutDoor = this.createDoor(400, 400, "Pressione E para sair da Doodle", "Level");
        this.dataCenterDoor = this.createDoor(290, 20, "Pressione E para entrar na sala de Corvus", "BlackLock");

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.blackNest.widthInPixels, this.blackNest.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER); 

        this.dialogIndex = 0; 

        this.dialogActive = true;
        this.dialogLocked = false; 

        systemMessage(this, GameState.corvusDialog[this.dialogIndex]); 

        this.input.keyboard.on("keydown-ENTER", () => {
        this.dialogIndex++ 

        if (this.dialogIndex < GameState.corvusDialog.length){
            systemMessage(this, GameState.corvusDialog[this.dialogIndex]);

            if (this.dialogIndex === 10) { 
            this.dialogLocked = true; 
            this.cameras.main.fadeOut(7000, 0, 0, 0);
            this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("CorvusPC");
            });
            }
        }
        });

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