import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js"; 

import { MapM } from "../../components/map/mapM.js";

import CoreBar from "../../components/coreBar/coreBar.js"; 
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js"; 
import systemMessage from "../../components/systemMessage/systemMessage.js";

import { spawnAllNpcs } from "../../prefabs/managers/coffeeShopManager.js";

import { preloadCoffeeAttendantAnimations } from "../../prefabs/NPCs/coffeeAttendant/coffeeAttendantAnimation.js";
import { preloadCoffeeAttendant2Animations } from "../../prefabs/NPCs/coffeeshop/coffeeAttendant2/coffeeAttendant2Animation.js";
import { preloadCoffeeAttendant3Animations } from "../../prefabs/NPCs/coffeeshop/coffeeAttendant3/coffeeAttendant3Animation.js";
import { preloadCoffeeClient } from "../../prefabs/NPCs/coffeeshop/coffeeClient/1/coffeeClientAnimation.js";
import { preloadCoffeeClient2 } from "../../prefabs/NPCs/coffeeshop/coffeeClient/2/coffeeClient2Animation.js";
import { preloadCoffeeClient3 } from "../../prefabs/NPCs/coffeeshop/coffeeClient/3/coffeClient3Animation.js";
import { preloadCoffeeClient4 } from "../../prefabs/NPCs/coffeeshop/coffeeClient/4/coffeeClient4Animation.js";
import { preloadCoffeeClient5 } from "../../prefabs/NPCs/coffeeshop/coffeeClient/5/coffeeClient5Animation.js";
import { preloadCoffeeClient6 } from "../../prefabs/NPCs/coffeeshop/coffeeClient/6/coffeeClient6Animation.js";

export default class Coffe extends Phaser.Scene {

    constructor() {
        super("Coffe");
    }

    preload() { 
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        // Mapa e os tilesets
        this.load.tilemapTiledJSON("coffeShop", "assets/tilemaps/coffeshop.json");

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image("coffeshop", "assets/tilesets/kitchen.png"); 
        this.load.image("wallsbase", "assets/tilesets/wallsbase.png"); 
        this.load.image("walls", "assets/tilesets/tiletest.png"); 
        this.load.image("cashier", "assets/tilesets/cashier.png");

        this.load.audio('step', 'assets/audios/steps/indoor-footsteps.mp3');
        this.load.audio('music', 'assets/audios/coffee/coffeeshop.mp3'); 
        
        this.load.image("keyE", "assets/inputs/keyE/keyE.png");
        this.load.image("keyC", "assets/inputs/keyC/keyC.png");

        preloadPlayerAnimations(this);
        preloadCoffeeAttendantAnimations(this);
        preloadCoffeeAttendant2Animations(this);
        preloadCoffeeAttendant3Animations(this);
        preloadCoffeeClient(this);
        preloadCoffeeClient2(this);
        preloadCoffeeClient3(this);
        preloadCoffeeClient4(this);
        preloadCoffeeClient5(this);
        preloadCoffeeClient6(this);
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
        this.coffeShop = this.make.tilemap({ key: "coffeShop" }); 

        const wallsbase = this.coffeShop.addTilesetImage("wallsbase", "wallsbase");
        const walls = this.coffeShop.addTilesetImage("walls", "walls"); 
        const tilesCoffeShop = this.coffeShop.addTilesetImage("coffeshop", "coffeshop") 
        const cashier = this.coffeShop.addTilesetImage("cashier", "cashier");

        // Layers
        this.coffeShop.createLayer("Chao", wallsbase, 70, 0).setDepth(0);
        this.coffeShop.createLayer("Chao2", [wallsbase, walls, tilesCoffeShop], 70, 0).setDepth(1);
        const coffeeParede = this.coffeShop.createLayer("Parede" , [wallsbase, walls, tilesCoffeShop], 70, 0).setDepth(5);
        const coffeeObjetos = this.coffeShop.createLayer("Objetos", tilesCoffeShop, 70, 0).setDepth(6);
        this.coffeShop.createLayer("Objetos2" , [wallsbase, walls, tilesCoffeShop], 70, 0).setDepth(7);
        this.coffeShop.createLayer("Objetos3" , [wallsbase, walls, tilesCoffeShop, cashier], 70, 0).setDepth(8);
        
        // Player
        this.player = new PlayerPrefab(this, 205, 260, "dante").setDepth(10);
        this.physics.add.existing(this.player); 

        //NPC 
        const chapter = GameState.getChapter();
        const npcs = spawnAllNpcs(this, chapter);

        //Som
        this.stepSound = this.sound.add('step', {
            loop: true,
            volume: 1.5, 
            rate: 1.3
        }); 

        this.music = this.sound.add('music', {
            loop: true,
            volume: 1.0, 
            rate: 1.3
        }); 

        this.music.play()

        PlayerAnimations(this) 
        this.disablePlayerControl = false;

        //Collider 
        coffeeParede.setCollisionByProperty({ collider: true }); 
        coffeeParede.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, coffeeParede)

        coffeeObjetos.setCollisionByProperty({ collider: true }); 
        coffeeObjetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, coffeeObjetos); 

        //zona de interação 
        this.doorZones = this.physics.add.staticGroup()

        this.lobbyOutDoor = this.createDoor(210, 260, "Pressione E para sair da cafeteria", "Level")   
        this.placeOrder = this.createDoor(205, 110, "Pressione C para fazer um pedido", null);  

        this.physics.add.overlap(this.player, this.placeOrder, () => this.showEnterPrompt(this.placeOrder), null, this);
        this.physics.add.overlap(this.player, this.lobbyOutDoor, () => this.showEnterPrompt(this.lobbyOutDoor), null, this);

        this.cameras.main.setZoom(2.4); 
        this.cameras.main.setBounds(0, 0, this.coffeShop.widthInPixels, this.coffeShop.heightInPixels); 
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1); 

        if (window.lastScene === 'TutorialCut' && !this.dialogAlreadyStarted) {
            systemMessage(this, GameState.coffeTutorialDialog[0])
            this.lobbyOutDoor.setVisible(false);     
        } else {
            this.dialogAlreadyStarted = false; 
        }
    }

    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false);
        door.textBackground = this.add.rectangle(x, y - 10, 240, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false).setDepth(999); 
        door.enterText = this.add.text(x, y - 10, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false).setDepth(999);
        door.enterImage = this.add.image(x, y + 20, "keyE").setOrigin(0.5).setScale(1.8).setVisible(false).setDepth(999);
        door.enterImageC = this.add.image(x, y + 20, "keyC").setOrigin(0.5).setScale(1.8).setVisible(false).setDepth(999);
        door.sceneName = sceneName;
    
        this.physics.add.overlap(this.player, door, () => this.showEnterPrompt(door), null, this);
        return door;
    } 

    getCoffeePriceByChapter() {
    const chapter = GameState.getChapter(); 
    switch (chapter) {
        case 1:
            return 5;
        case 2:
            return 15;
        case 3:
            return 40;
        case 4:
            return 60;
        default:
            return 5; 
        }
    }

    showAttendantDialog() {
    this.dialogIndex = 0;
    this.dialogActive = true;
    this.dialogLocked = false;

    const chapter = GameState.getChapter();

    let currentDialog;
    switch (chapter) {
        case 1:
            currentDialog = GameState.coffeAtendentDialog2;
            break;
        case 2:
            currentDialog = GameState.coffeAtendentDialog3;
            break;
        case 3:
            currentDialog = GameState.coffeAtendentDialog4;
            break;
        case 4:
            currentDialog = GameState.coffeAtendentDialog5;
            break;
        default:
            currentDialog = GameState.coffeAtendentDialog2;
    }

    this.messageBox = systemMessage(this, currentDialog[this.dialogIndex]);

    if (this.enterKeyListener) {
        this.input.keyboard.off("keydown-ENTER", this.enterKeyListener);
    }

    this.enterKeyListener = () => {
        this.dialogIndex++;


        if (this.dialogIndex < currentDialog.length) {
            this.messageBox = systemMessage(this, currentDialog[this.dialogIndex]);
        } else {
            this.disablePlayerControl = true;
            this.dialogLocked = true;
            this.player.anims.play('dante-coffee');
            this.isAnimating = true;

            const coffeePrice = this.getCoffeePriceByChapter();
            GameState.addCoins("delfir", -coffeePrice);
            this.coinBar._refreshDisplay();

            this.player.once('animationcomplete-dante-coffee', () => {
                this.messageBox.destroy();
                this.player.anims.play('turn');
                this.disablePlayerControl = false;
                this.dialogAlreadyStarted = false;
            });
        }
    };
        this.input.keyboard.on("keydown-ENTER", this.enterKeyListener);
    }


    showTutorialAttendantDialog(){
        this.dialogIndex = 0; 

        this.dialogActive = true;
        this.dialogLocked = false; 
        
        systemMessage(this, GameState.coffeAtendentDialog[this.dialogIndex]); 

        this.input.keyboard.on("keydown-ENTER", () => {
        this.dialogIndex++; 

        systemMessage(this, GameState.coffeAtendentDialog[this.dialogIndex]); 

        if(this.dialogIndex === 2){ 
            this.disablePlayerControl = true;
            this.dialogLocked = true; 
            this.player.anims.play('dante-coffee'); 
            this.isAnimating = true;


            this.player.once('animationcomplete-dante-coffee', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0); 
            this.music.stop()
                this.cameras.main.once('camerafadeoutcomplete', () => {
                window.lastScene = 'Coffe' 
                this.dialogAlreadyStarted = false
                this.scene.start("Lobby");
                });   
            });
        }
        });  
    } 

    showEnterPrompt(door) {
        door.textBackground.setVisible(true);
        door.enterText.setVisible(true);
        door.enterImage.setVisible(true);
        door.enterImageC.setVisible(true);
    
        if (door === this.lobbyOutDoor){
            door.enterImageC.setVisible(false);
            if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.music.stop()
            window.lastScene = "Coffe";
            this.scene.start(door.sceneName)
        } 
        }

        if (this.dialogAlreadyStarted === true) {
            door.enterText.setVisible(false);
            door.enterImageC.setVisible(false); 
            door.textBackground.setVisible(false);
        }
    
        if (door === this.placeOrder) {
            door.enterImage.setVisible(false);
            if (Phaser.Input.Keyboard.JustDown(this.cKey) && !this.dialogAlreadyStarted) {
                this.dialogAlreadyStarted = true;
                if (window.lastScene === 'TutorialCut') {
                    this.showTutorialAttendantDialog();
                } else {
                    door.textBackground.setVisible(true);
                    door.enterText.setVisible(true);
                    door.enterImageC.setVisible(true);
                    this.showAttendantDialog();
                }
            }
            return;
        }
        
        if (window.lastScene === 'TutorialCut'){
        door.textBackground.setVisible(false);
        door.enterText.setVisible(false);
        door.enterImage.setVisible(false);
        door.enterImageC.setVisible(false);
        } else {
            door.textBackground.setVisible(true);
            door.enterText.setVisible(true);
            door.enterImage.setVisible(true);
            door.enterImageC.setVisible(true);
        }

    } 

    update() {

        let moving = false; 

        this.player.setVelocity(0);

        if (!this.disablePlayerControl) {
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
            
            this.player.setVelocity(0);
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