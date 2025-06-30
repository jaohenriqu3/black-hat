import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js";

import { MapM } from "../../components/map/mapM.js"; 

import CoreBar from "../../components/coreBar/coreBar.js";
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js"; 
import systemMessage from "../../components/systemMessage/systemMessage.js";

import { preloadIboAtttendant, IboAttendantAnimations } from "../../prefabs/NPCs/iboAttendant/iboAttendantaAnimation.js";
import { spawnAllNpcs } from "../../prefabs/managers/iboDelfiManager.js";

export default class IboDelfi extends Phaser.Scene {

    constructor() {
        super("IboDelfi");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.tilemapTiledJSON("iboDelfi", "assets/tilemaps/ibodelfi.json");

        this.load.image("iboWalls", "assets/tilesets/walls.png"); 
        this.load.image("iboInfra", "assets/tilesets/infra2.png"); 
        this.load.image("iboInfra2", "assets/tilesets/board.png"); 
        this.load.image("iboInfra3", "assets/tilesets/infra16.png")
        this.load.image("iboIntens", "assets/tilesets/utils.png"); 

        this.load.audio('step', 'assets/audios/steps/indoor-footsteps.mp3');
        this.load.audio('office', 'assets/audios/office/Office.mp3'); 

        this.load.image("keyE", "assets/inputs/keyE/keyE.png"); 
        this.load.image("keyC", "assets/inputs/keyC/keyC.png");

        preloadPlayerAnimations(this);
        preloadIboAtttendant(this);
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
        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        // Tilemap
        this.iboDelfi = this.make.tilemap({ key: "iboDelfi" }); 

        const iboWalls = this.iboDelfi.addTilesetImage("iboWalls", "iboWalls"); 
        const iboInfra = this.iboDelfi.addTilesetImage("iboInfra", "iboInfra");
        const iboInfra2 = this.iboDelfi.addTilesetImage("iboInfra2", "iboInfra2"); 
        const iboInfra3 = this.iboDelfi.addTilesetImage("iboInfra3", "iboInfra3"); 
        const iboIntens = this.iboDelfi.addTilesetImage("iboIntens", "iboIntens");

        // Layers
        const iboBase = this.iboDelfi.createLayer("Chao", iboWalls, 30, 0).setDepth(0);;
        const iboWall = this.iboDelfi.createLayer("Parede", iboWalls, 30, 0).setDepth(1);;
        const iboObjetos = this.iboDelfi.createLayer("Objetos", [iboInfra, iboInfra2, iboInfra3, iboIntens], 30, 0).setDepth(2);;
        const iboObjetos2 = this.iboDelfi.createLayer("Objetos2", [iboInfra, iboInfra2, iboInfra3, iboIntens], 30, 0).setDepth(3);;
        const iboObjetos3 = this.iboDelfi.createLayer("Objetos3", [iboInfra, iboInfra2, iboInfra3, iboIntens], 30, 0).setDepth(5);;
        
       
        const spawnPositions = {
            "Level": { x: 390, y: 255 }, 
            "IboOffice": { x: 435, y: 55 } 
        };
        const spawn = spawnPositions[window.lastScene] || { x: 390, y: 255 };

        //Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante").setDepth(10);
        this.physics.add.existing(this.player);
        PlayerAnimations(this)

        //NPC via manager
        spawnAllNpcs(this);
        this.physics.add.collider(this.attendant, iboObjetos3)

        //audios 
        this.stepSound = this.sound.add('step', {
            loop: true,
            volume: 1.5, 
            rate: 1.3
        }); 

        this.office = this.sound.add('office', {
            loop: true,
            volume: 0.3, 
        }); 

        this.office.play()

        //Collider
        iboWall.setCollisionByProperty({ collider: true }); 
        iboWall.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, iboWall)

        iboObjetos.setCollisionByProperty({ collider: true }); 
        iboObjetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, iboObjetos); 

        this.doorZones = this.physics.add.staticGroup();

        //this.iboOutDoor = this.createDoor(390, 255, "Pressione E para sair da IBODELFI", "Level");
        this.iboOfficeDoor = this.createDoor(435, 55, "Pressione E para entrar no escritório", "IboOffice");
        this.iboAttendant = this.createDoor(430, 140, "Pressione C para falar com a atendente", null);

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1)) 

        // Configurar câmera
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.iboDelfi.widthInPixels, this.iboDelfi.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1); 

        this.iboOfficeDoor.active = false;
        this.iboOfficeDoor.visible = false;
        this.iboOfficeDoor.body.enable = false;

        this.dialogIndex = 0;
        systemMessage(this, GameState.iboDelfiDifalog[this.dialogIndex]) 
    }

    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false);
        door.textBackground = this.add.rectangle(x, y - 10, 240, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false); 
        door.enterText = this.add.text(x, y - 10, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false);
        door.enterImage = this.add.image(x, y + 20, "keyE").setOrigin(0.5).setScale(1.8).setVisible(false);
        door.enterImageC = this.add.image(x, y + 20, "keyC").setOrigin(0.5).setScale(1.8).setVisible(false);
        door.sceneName = sceneName;
    
        this.physics.add.overlap(this.player, door, () => this.showEnterPrompt(door), null, this);
        return door;
    }

    showEnterPrompt(door) {
        if (!door.active) return;

        door.textBackground.setVisible(true).setDepth(10);
        door.enterText.setVisible(true).setDepth(10);
        door.enterImage.setVisible(true).setDepth(10);
        door.enterImageC.setVisible(true).setDepth(10);

        if (door === this.iboAttendant && this.dialogIndex >= 7) {
        return; 
        } 

        if (door === this.iboAttendant) {
            door.enterImage.setVisible(false).setDepth(10)
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.attendantDialogStarted = true;
            this.dialogActive = true;
            this.showAttendantDialog();
        }
        // bloquear tecla E
        return;
        }

        if(Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.office.stop()
            window.lastScene = "IboDelfi";
            this.scene.start(door.sceneName);
        }      
    } 

    showAttendantDialog(){ 
        this.dialogIndex = 0; 

        this.dialogActive = true;
        this.dialogLocked = false; 
        
        systemMessage(this, GameState.iboDelfiAttendentDialog[this.dialogIndex]); 

        this.input.keyboard.on("keydown-ENTER", () => {
        this.dialogIndex++;

        if (this.dialogIndex < GameState.iboDelfiAttendentDialog.length) {
            systemMessage(this,GameState.iboDelfiAttendentDialog[this.dialogIndex]);

         if (this.dialogIndex === 4) {
                const currentDelfirs = GameState.getCoins("delfir");
                if (currentDelfirs >= 1000) {
                    GameState.addCoins("ditcoin", 1);
                    GameState.addCoins("delfir", -1000);
                    this.coinBar._refreshDisplay();
                    systemMessage(this, GameState.iboDelfiAttendentDialog[this.dialogIndex]);
                } else {
                    systemMessage(this, "Você não tem Delfirs suficientes para comprar Ditcoins no momento, mas abri sua carteira, você poderá tentar comprar novamente depois.");
                    this.dialogLocked = true;
                }
            }
            } else {
            this.dialogLocked = true; 
            }
            if (this.dialogIndex === 7) {
            this.iboOfficeDoor.active = true;
            this.iboOfficeDoor.body.enable = true;

            this.iboAttendant.active = false;
            this.iboAttendant.body.enable = false;
            }
        });   
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
                door.enterImageC.setVisible(false);
                door.textBackground.setVisible(false);
                 }
            });
    }
}