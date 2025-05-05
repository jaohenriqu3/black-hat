import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 

import { addMenuButton } from '../components/menuButton/menuButton.js';
import { EscMenu } from "../components/menuButton/menuESC.js"; 

import CoreBar from "../components/coreBar/coreBar.js"; 
import PlayerState from "../state/playerState.js";

import CoinBar from "../components/coinBar/coinBar.js";
import Wallet from "../components/coinBar/walletState.js";


export default class Lobby extends Phaser.Scene {

    constructor() {
        super("Lobby");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");


        this.load.tilemapTiledJSON("casaDante", "assets/tilemaps/casa-dante2.json");
        this.load.image("tiletest", "assets/tilesets/tiletest.png"); 
        this.load.image("infra16", "assets/tilesets/infra16.png"); 
        this.load.image("bedroom", "assets/tilesets/bedroom.png");
        this.load.image("room", "assets/tilesets/room.png"); 
        this.load.image("bathroom", "assets/tilesets/bathroom.png");
        this.load.image("kitchen", "assets/tilesets/kitchen.png");

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {

       // this.scale.startFullscreen();
        
        if (!window.lastScene) {
            window.lastScene = "Lobby"; 
        }

        this.coreBar = new CoreBar(this, 10, 50);
        addMenuButton(this);
        EscMenu(this)

        this.coinBar = new CoinBar(this, this.cameras.main.width); 
    
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap 
        console.log(this.cache.json.get("casaDante"));

        this.lobby = this.make.tilemap({ key: "casaDante" });  

        const tileset = this.lobby.addTilesetImage("tiletest", "tiletest");
        const infra = this.lobby.addTilesetImage("infra16", "infra16"); 
        const bedroom = this.lobby.addTilesetImage("bedroom", "bedroom");
        const room = this.lobby.addTilesetImage("room", "room");
        const bathroom = this.lobby.addTilesetImage("bathroom", "bathroom");
        const kitchen = this.lobby.addTilesetImage("kitchen", "kitchen");
        console.log(this.lobby.tilesets); 

       // Layers
       this.lobby.createLayer("Chao", tileset, 50, 0); 
       this.lobby.createLayer("Chao2", [tileset, infra, bedroom, room, bathroom, kitchen], 50, 0); 
       const parede  = this.lobby.createLayer("Parede", tileset, 50, 0);
       const objetos = this.lobby.createLayer("Objetos", [tileset, infra, bedroom, room, bathroom, kitchen], 50, 0);
       const objetos2 = this.lobby.createLayer("Objetos2", [tileset, infra, bedroom, room, bathroom, kitchen], 50, 0);
       this.lobby.createLayer("Objetos3", [tileset, infra, bedroom, room, bathroom, kitchen], 50, 0);

        const spawnPositions = {
            "Level": { x: 420, y: 270 }, 
            "DantePC": { x: 250, y: 70 } 
        };
        const spawn = spawnPositions[window.lastScene] || { x: 200, y: 70 };

        // Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        // Collider
        objetos.setCollisionByProperty({ collider: true }); 
        objetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetos);

        parede.setCollisionByProperty({ collider: true}) 
        parede.setCollisionByExclusion([-1]);  
        this.physics.add.collider(this.player, parede); 

        this.doorZones = this.physics.add.staticGroup();

        this.lobbyOutDoor = this.createDoor(420, 260, "Pressione E para sair da casa", "Level");
        this.acessPC = this.createDoor(250, 48, "Pressione E acessar o computador", "DantePC");

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        this.cameras.main.setZoom(2.4);
        this.cameras.main.setBounds(0, 0, this.lobby.widthInPixels, this.lobby.heightInPixels);
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
        door.textBackground.setVisible(true);
        door.enterText.setVisible(true);
        door.enterImage.setVisible(true);
    
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            window.lastScene = "Lobby";
            this.scene.start(door.sceneName);
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
