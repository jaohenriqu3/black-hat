import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../components/menuButton/menuButton.js';
import { EscMenu } from "../components/menuButton/menuESC.js"; 
import CoreBar from "../components/coreBar/coreBar.js";


export default class Lobby extends Phaser.Scene {

    constructor() {
        super("Lobby");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        // Mapa e os tilesets
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


        let startX, startY;

        if (window.lastScene === "Level") {
            startX = 420;
            startY = 270;
        } else {
            startX = 200;
            startY = 70;
        }

        // Player
        this.player = new PlayerPrefab(this, startX, startY, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        // Collider
       objetos.setCollisionByProperty({ collider: true }); 
       objetos.setCollisionByExclusion([-1]); 
       this.physics.add.collider(this.player, objetos);

        parede.setCollisionByProperty({ collider: true}) 
        parede.setCollisionByExclusion([-1]);  
        this.physics.add.collider(this.player, parede); 

        // Criar zona de interação da porta
        this.doorZone = this.physics.add.staticGroup();
        const lobbyDoor = this.doorZone.create(420, 260,).setSize(60, 60).setVisible(null);

        this.textBackground = this.add.rectangle(420, 275, 120, 15, 0xFFFFFF).setOrigin(0.5);
        this.textBackground.setAlpha(0.8);

        this.enterTextLobby = this.add.text(420, 275, "Pressione E para sair da casa", { fontSize: "14x", fill: "#000000" }).setOrigin(0.5).setScale(0.8)
        this.enterTextLobby.setVisible(false); 

        this.enterImageLobby = this.add.image(420, 300, "keyE").setOrigin(0.5).setScale(1.8);
        this.enterImageLobby.setVisible(false); 

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this); 

        console.log(`Map size: ${this.lobby.widthInPixels}x${this.lobby.heightInPixels}`);

        console.log(this.lobby);

        this.lobby.tilesets.forEach((tileset, index) => {
            console.log(`Tileset ${index}:`, tileset);
        });

        console.log("JSON Original:", this.cache.json.get("casaDante"));
        console.log("Tilesets no Jogo:", this.lobby.tilesets);

        //Debug
        // objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(2.4);
        this.cameras.main.setBounds(0, 0, this.lobby.widthInPixels, this.lobby.heightInPixels);

    } 

    showEnterPrompt(player, lobbyDoor) { 
        this.enterTextLobby.setVisible(true);
        this.enterImageLobby.setVisible(true);
        this.textBackground.setVisible(true)

        // Verifica se o player pressionou "E"
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {  
            window.lastScene = "Lobby";
            this.scene.start("Level"); 
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
        
            this.menuButton.setPosition(screenPos.x + margin, screenPos.y + margin);
        
            const coreBarX = this.menuButton.x + this.menuButton.displayWidth + margin - 5;
            const coreBarY = screenPos.y + margin + 5;
        
            this.coreBar.setPosition(coreBarX, coreBarY);
        }

        // Ocultar texto e imagem se o player se afastar da porta
        if (!this.physics.overlap(this.player, this.doorZone)) {
            this.enterTextLobby.setVisible(false);
            this.enterImageLobby.setVisible(false); 
            this.textBackground.setVisible(false);
        }
    }
}
