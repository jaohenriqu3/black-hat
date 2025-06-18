import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js"; 

import { MapM } from "../../components/map/mapM.js"; 

import CoreBar from "../../components/coreBar/coreBar.js";
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js";
import systemMessage from "../../components/systemMessage/systemMessage.js"; 

import CassinoPlayerPrefab from "../../prefabs/NPCs/cassino/cassinoPlayer/cassinoPlayerPrefab.js"; 
import { preloadCassinoPlayerAnimation, CassinoPlayerAnimation } from "../../prefabs/NPCs/cassino/cassinoPlayer/cassinoPlayerAnimation.js";

import CassinoAttendantPrefab from "../../prefabs/NPCs/cassino/cassinoAttendant/cassinoAttendantPrefab.js"; 
import { preloadCassinoAttendant, CassinoAttendantAnimation } from "../../prefabs/NPCs/cassino/cassinoAttendant/cassinoAttendantAnimation.js"; 

import CassinoAttendant2Prefab from "../../prefabs/NPCs/cassino/cassinoAttendant2/cassinoAttendant2Prefab.js"; 
import { preloadCassinoAttendant2, CassinoAttendantAnimation2 } from "../../prefabs/NPCs/cassino/cassinoAttendant2/cassinoAttendant2Animation.js"; 

import BlackNestMemberPrefab from "../../prefabs/NPCs/cassino/blackNestMember/blackNestMemberPrefab.js"; 
import { preloadBlackNestMember, BlackNestMemberAnimation } from "../../prefabs/NPCs/cassino/blackNestMember/blackNestMemberAnimation.js"

export default class Cassino extends Phaser.Scene {

    constructor() {
        super("Cassino");
    }

    preload() {
        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.tilemapTiledJSON("cassino", "assets/tilemaps/cassino.json");

        this.load.image("wallsCassino", "assets/tilesets/walls.png"); 
        this.load.image("gamesCassino", "assets/tilesets/room2.png"); 
        this.load.image("itemsCassino", "assets/tilesets/utils.png"); 
        this.load.image("itemsCassino2", "assets/tilesets/board.png")
        this.load.image("itemsCassino3", "assets/tilesets/infra2.png");
        this.load.image("itemsCassino4", "assets/tilesets/museum.png");
        this.load.image("itemsCassino5", "assets/tilesets/kitchen.png");
        this.load.image("itemsCassino6", "assets/tilesets/music.png");
        this.load.image("itemsCassino7", "assets/tilesets/stage.png");
        this.load.image("itemsCassino8", "assets/tilesets/room.png");
        this.load.image("infraCassino", "assets/tilesets/infra16.png"); 

        this.load.audio('step', 'assets/audios/steps/indoor-footsteps.mp3');
        this.load.audio('cassino', 'assets/audios/cassino/cassino.mp3');
        this.load.audio('jazz', 'assets/audios/cassino/jazz.mp3');

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");
        this.load.image("keyC", "assets/inputs/keyC/keyC.png");

        preloadPlayerAnimations(this) 
        preloadCassinoPlayerAnimation(this)
        preloadCassinoAttendant(this)
        preloadCassinoAttendant2(this)
        preloadBlackNestMember(this)

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
        this.cassino = this.make.tilemap({ key: "cassino" }); 

        const wallsCassino = this.cassino.addTilesetImage("wallsCassino", "wallsCassino"); 
        const gamesCassino = this.cassino.addTilesetImage("gamesCassino", "gamesCassino");
        const itemsCassino = this.cassino.addTilesetImage("itemsCassino", "itemsCassino"); 
        const itemsCassino2 = this.cassino.addTilesetImage("itemsCassino2", "itemsCassino2"); 
        const itemsCassino3 = this.cassino.addTilesetImage("itemsCassino3", "itemsCassino3");
        const itemsCassino4 = this.cassino.addTilesetImage("itemsCassino4", "itemsCassino4");
        const itemsCassino5 = this.cassino.addTilesetImage("itemsCassino5", "itemsCassino5");
        const itemsCassino6 = this.cassino.addTilesetImage("itemsCassino6", "itemsCassino6"); 
        const itemsCassino7 = this.cassino.addTilesetImage("itemsCassino7", "itemsCassino7"); 
        const itemsCassino8 = this.cassino.addTilesetImage("itemsCassino8", "itemsCassino8");
        const infraCassino = this.cassino.addTilesetImage("infraCassino", "infraCassino");
        
        // Layers
        const baseCassino = this.cassino.createLayer("Chao", [wallsCassino, itemsCassino], 30, 0);
        const WallCassino = this.cassino.createLayer("Parede", wallsCassino, 30, 0);
        const baseCassino2 = this.cassino.createLayer("Chao2", itemsCassino , 30, 0);
        const objetosCassino = this.cassino.createLayer("Objetos", [gamesCassino, itemsCassino, itemsCassino2, itemsCassino3, itemsCassino4, itemsCassino5,
             itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0).setDepth(3);
        const objetosCassino2 = this.cassino.createLayer("Objetos2", [gamesCassino, itemsCassino, itemsCassino2, itemsCassino3, itemsCassino4, itemsCassino5,
             itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0).setDepth(4);
        const objetosCassino3 = this.cassino.createLayer("Objetos3", [gamesCassino, itemsCassino, itemsCassino2, itemsCassino3, itemsCassino4, itemsCassino5, 
            itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0).setDepth(5);
        const objetosCassino4 = this.cassino.createLayer("Objetos4", [gamesCassino, itemsCassino, itemsCassino2, itemsCassino3, itemsCassino4, itemsCassino5, 
            itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0).setDepth(6);

        const spawnPositions = { 
             "Level": { x: 270, y: 410 }, 
             "CassinoOffice": { x: 450, y:55 },
             "CassinoPC": {x: 85, y: 80},
             "CassinoGame": {x: 370, y:360}
         } 
        const spawn = spawnPositions[window.lastScene] || {  x: 270, y: 410 };

        //Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante").setDepth(10);
        this.physics.add.existing(this.player);

        //NPC 
        CassinoPlayerAnimation(this)
        this.cassinoPlayer = new CassinoPlayerPrefab(this, 133, 360);
        this.physics.add.collider(this.cassinoPlayer, objetosCassino)
        this.physics.add.collider(this.player, this.cassinoPlayer)

        CassinoAttendantAnimation(this) 
        this.cassinoAttendant = new CassinoAttendantPrefab(this, 70, 60).setDepth(2); 

        CassinoAttendantAnimation2(this) 
        this.cassinoAttendant = new CassinoAttendant2Prefab(this, 200, 75).setDepth(3);

        BlackNestMemberAnimation(this)
        this.blackNestMember = new BlackNestMemberPrefab(this, 485, 265).setVisible(false)
        this.physics.add.collider(this.player, this.blackNestMember)
        
        PlayerAnimations(this)

        //audios 
        this.stepSound = this.sound.add('step', {
            loop: true,
            volume: 1.5, 
            rate: 1.3
        }); 

        this.cassinoSound = this.sound.add('cassino', {
            loop: true,
            volume: 0.5, 
        }); 

        this.jazz = this.sound.add('jazz', {
            loop: true,
            volume: 0.5, 
        }); 

        this.cassinoSound.play()
        this.jazz.play()

        // Collider
        WallCassino.setCollisionByProperty({ collider: true }); 
        WallCassino.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, WallCassino)

        objetosCassino.setCollisionByProperty({ collider: true }); 
        objetosCassino.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosCassino); 

        objetosCassino2.setCollisionByProperty({ collider: true }); 
        objetosCassino2.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosCassino2); 
        
        objetosCassino4.setCollisionByProperty({ collider: true }); 
        objetosCassino4.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosCassino4); 

        this.doorZones = this.physics.add.staticGroup();

        this.cassinoOutDoor = this.createDoor(270, 430, "Pressione E para sair do Cassino", "Level");
        this.cassinoOfficeDoor = this.createDoor(455, 55, "Pressione E para entrar no escritório", "CassinoOffice");
        this.playerCassinoZone = this.createDoor(133, 360, "Pressione C para conversar com o apostador", null);
        this.CassinoGameZone = this.createDoor(370, 350, "Pressione E para jogar", "CassinoGame");
        this.cassinoAttendant2Zone = this.createDoor(200, 105, "Pressione C para falar com o BarTender", null );
        this.blackNestMemberZone = this.createDoor(450, 260, "Pressione C para conversar com o Hacker", null).setVisible(false); 
        this.cassinoPC = this.createDoor(105, 60, "Pressione E para comprar fichas", "CassinoPC").setVisible(false); 

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.cassino.widthInPixels, this.cassino.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1); 

        this.cassinoOfficeDoor.active = false;
        this.cassinoOfficeDoor.visible = false;
        this.cassinoOfficeDoor.body.enable = false; 

        this.playerCassinoZone.active = false;
        this.playerCassinoZone.visible = false;
        this.playerCassinoZone.body.enable = false; 

        this.cassinoAttendant2Zone.active = false;
        this.cassinoAttendant2Zone.visible = false;
        this.cassinoAttendant2Zone.body.enable = false; 

        this.cassinoOutDoor.active = true;
        this.cassinoOutDoor.visible = false;
        this.cassinoOutDoor.body.enable = true;

        this.cassinoPC.active = true;
        this.cassinoPC.visible = false;
        this.cassinoPC.body.enable = true;

        if (window.lastScene === "Chapter3Cutscene"){
        this.playerCassinoZone.active = true;
        this.playerCassinoZone.body.enable = true;
        this.dialogIndex = 0;
        systemMessage(this, GameState.cassinoSystemDialog[this.dialogIndex]) 
        this.cassinoOutDoor.active = false;
        this.cassinoOutDoor.visible = false;
        this.cassinoOutDoor.body.enable = false;

        this.cassinoPC.active = false;
        this.cassinoPC.visible = false;
        this.cassinoPC.body.enable = false;
        }
        
        if(window.lastScene === "CassinoOffice"){
            this.dialogIndex = 0;
            this.blackNestMember.setVisible(true)
            systemMessage(this, GameState.cassinoSystemDialog2[this.dialogIndex]) 

            this.cassinoPC.active = false;
            this.cassinoPC.visible = false;
            this.cassinoPC.body.enable = false; 

            this.cassinoOutDoor.active = false;
            this.cassinoOutDoor.visible = false;
            this.cassinoOutDoor.body.enable = false;
        }
    }

    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false);
        door.textBackground = this.add.rectangle(x - 10, y - 10, 250, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false); 
        door.enterText = this.add.text(x - 10, y - 10, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false);
        door.enterImage = this.add.image(x, y + 20, "keyE").setOrigin(0.5).setScale(1.8).setVisible(false);
        door.enterImageC = this.add.image(x, y + 20, "keyC").setOrigin(0.5).setScale(1.8).setVisible(false);
        door.sceneName = sceneName;
    
        this.physics.add.overlap(this.player, door, () => this.showEnterPrompt(door), null, this);
        return door;
    } 

    showEnterPrompt(door) {
        if (!door.active) return; 

        if (door === this.playerCassinoZone && this.dialogIndex >= 7) {
        return; 
        } 

        door.textBackground.setVisible(true).setDepth(11);
        door.enterText.setVisible(true).setDepth(11);
        door.enterImage.setVisible(true).setDepth(11);
        door.enterImageC.setVisible(true).setDepth(11);

        if (door === this.playerCassinoZone) {
            door.enterImage.setVisible(false).setDepth(11);
            if (window.lastScene === "Level"){
                door.textBackground.setVisible(false).setDepth(11);
                door.enterText.setVisible(false).setDepth(11);
                door.enterImage.setVisible(false).setDepth(11);
                door.enterImageC.setVisible(false).setDepth(11);
            }
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.dialogActive = true;
            this.showCassinoPlayerDialog();
            } return; 
        } 

        if (door === this.blackNestMemberZone) {
             door.enterImage.setVisible(false).setDepth(11);
            if (window.lastScene === "Chapter3CutScene"){
                door.textBackground.setVisible(false).setDepth(11);
                door.enterText.setVisible(false).setDepth(11);
                door.enterImage.setVisible(false).setDepth(11);
                door.enterImageC.setVisible(false).setDepth(11);
            }
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.dialogActive = true;
            this.showblackNestMemberDialog();
            } return; 
        }

        if (door === this.cassinoAttendant2Zone) {
             door.enterImage.setVisible(false).setDepth(11);
            if (window.lastScene === "Chapter3CutScene"){
                door.textBackground.setVisible(false).setDepth(11);
                door.enterText.setVisible(false).setDepth(11);
                door.enterImage.setVisible(false).setDepth(11); 
                door.enterImageC.setVisible(false).setDepth(11);
            } 
            if (window.lastScene === "Level"){
                door.textBackground.setVisible(false).setDepth(11);
                door.enterText.setVisible(false).setDepth(11);
                door.enterImage.setVisible(false).setDepth(11);
                door.enterImageC.setVisible(false).setDepth(11);
            }
        if (Phaser.Input.Keyboard.JustDown(this.cKey)) {
            this.dialogActive = true;
            this.showCassinoBarDialog();
            } return; 
        }

        if (Phaser.Input.Keyboard.JustDown(this.eKey)) { 
            door.enterImageC.setVisible(false).setDepth(11);
            window.lastScene = "Cassino";
            this.cassinoSound.stop()
            this.jazz.stop()
            this.scene.start(door.sceneName);
        }
    }

    showCassinoPlayerDialog(){
        this.dialogIndex = 0; 

        this.dialogActive = true;
        this.dialogLocked = false; 


        systemMessage(this, GameState.cassinoPlayerDialog[this.dialogIndex]); 

        this.input.keyboard.on("keydown-ENTER", () => {
        this.dialogIndex++ 

        if (this.dialogIndex < GameState.cassinoPlayerDialog.length){
            systemMessage(this, GameState.cassinoPlayerDialog[this.dialogIndex]);

            if (this.dialogIndex === 7) { 

            this.dialogLocked = true; 

            this.cassinoOfficeDoor.active = true;
            this.cassinoOfficeDoor.body.enable = true;
            }
        }
        });
    }

    showblackNestMemberDialog(){ 
        this.dialogIndex = 0; 

        this.dialogActive = true;
        this.dialogLocked = false;

        this.input.keyboard.removeAllListeners("keydown-ENTER");

        systemMessage(this, GameState.blackNestMemberDialog[this.dialogIndex]); 

        this.input.keyboard.on("keydown-ENTER", () => {
        if(!this.dialogLocked){

        }
        this.dialogIndex++ 

        if (this.dialogIndex < GameState.blackNestMemberDialog.length){
            systemMessage(this, GameState.blackNestMemberDialog[this.dialogIndex]);

            if (this.dialogIndex === 3) { 
            // this.dialogLocked = true; 
            // this.dialogActive = false; 

            this.cassinoAttendant2Zone.active = true;
            this.cassinoAttendant2Zone.body.enable = true;

             this.input.keyboard.removeAllListeners("keydown-ENTER");
                }
            }
        });
    }

    showCassinoBarDialog(){ 
        this.dialogIndex = 0; 

        this.dialogActive = true;
        this.dialogLocked = false;

        this.input.keyboard.removeAllListeners("keydown-ENTER");

        systemMessage(this, GameState.cassinoBarDialog[this.dialogIndex]);

        this.input.keyboard.on("keydown-ENTER", () => {
        this.dialogIndex++;

        if (this.dialogIndex < GameState.cassinoBarDialog.length) {
            systemMessage(this, GameState.cassinoBarDialog[this.dialogIndex]);
        } 
        if (this.dialogIndex === 2 ){
        this.cameras.main.fadeOut(2000, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          window.lastScene = "Cassino";
          this.scene.start("DanteCell");
        });
        }

        });
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
                door.enterImageC.setVisible(false);
                door.textBackground.setVisible(false); 
                 }
            });
    }
}