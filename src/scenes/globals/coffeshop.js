import PlayerPrefab from "../../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../../components/menuButton/menuButton.js'; 
import { EscMenu } from "../../components/menuButton/menuESC.js"; 

import CoreBar from "../../components/coreBar/coreBar.js"; 
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js";

import CoffeeAttendantPrefab from "../../prefabs/NPCs/coffeeAttendant/coffeeAttendantPrefab.js"; 
import { preloadCoffeeAttendantAnimations, CoffeeAttendantAnimations } from "../../prefabs/NPCs/coffeeAttendant/coffeeAttendantAnimation.js";


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

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        preloadCoffeeAttendantAnimations(this);

        
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
        CoffeeAttendantAnimations(this);
        this.attendant = new CoffeeAttendantPrefab(this, 205, 90); 
        this.physics.add.collider(this.attendant, coffeeObjetos);

        //Som
        this.stepSound = this.sound.add('step', {
            loop: true,
            volume: 1.5, 
            rate: 1.3
        }); 

        PlayerAnimations(this) 
        
        //Collider'
        coffeeParede.setCollisionByProperty({ collider: true }); 
        coffeeParede.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, coffeeParede)

        coffeeObjetos.setCollisionByProperty({ collider: true }); 
        coffeeObjetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, coffeeObjetos); 

        this.doorZone = this.physics.add.staticGroup();
        const lobbyDoorOut = this.doorZone.create(210, 260,).setSize(50, 50).setVisible(null).setDepth(10); // Posiciona e define o tamanho 

        this.textBackground = this.add.rectangle(210, 260, 220, 15, 0xFFFFFF).setOrigin(0.5).setDepth(10);
        this.textBackground.setAlpha(0.6);

        this.enterText = this.add.text(210, 260, "Pressione E para sair da cafeteria", { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setDepth(10);
        this.enterText.setVisible(false);

        this.enterImage = this.add.image(210, 290, "keyE").setOrigin(0.5).setScale(1.8).setDepth(10);
        this.enterImage.setVisible(false);

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        this.cameras.main.setZoom(2.4);
        this.cameras.main.setBounds(0, 0, this.coffeShop.widthInPixels, this.coffeShop.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    showEnterPrompt(player, lobbyDoorOut) {
        this.enterText.setVisible(true);
        this.enterImage.setVisible(true);
        this.textBackground.setVisible(true)

        // Verifica se o player pressionou "E"
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) { 
            window.lastScene = "Coffe";
            this.scene.start("Level"); 
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

        if (!this.physics.overlap(this.player, this.doorZone)) {
            this.enterText.setVisible(false);
            this.enterImage.setVisible(false);
            this.textBackground.setVisible(false);
        }
    }
}