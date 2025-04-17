import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../components/menuButton/menuButton.js'; 
import { EscMenu } from "../components/menuButton/menuESC.js"; 
import CoreBar from "../components/coreBar/coreBar.js";

import CoinBar from "../components/coinBar/coinBar.js"; 
import Wallet from "../components/coinBar/walletState.js";


export default class IboOffice extends Phaser.Scene {

    constructor() {
        super("IboOffice");
    }

    preload() {

        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.tilemapTiledJSON("iboOffice", "assets/tilemaps/iboOffice.json");

        this.load.image("officeWalls", "assets/tilesets/walls.png"); 
        this.load.image("officeInfra", "assets/tilesets/infra2.png"); 
        this.load.image("officeInfra2", "assets/tilesets/board.png"); 
        this.load.image("officeRoom", "assets/tilesets/room.png"); 
        this.load.image("officeRoom2", "assets/tilesets/room2.png"); 

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {

        EscMenu(this)
        addMenuButton(this);
        this.coreBar = new CoreBar(this, 10, 50);
        this.coinBar = new CoinBar(this, this.cameras.main.width); 

        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap
        this.IboOffice = this.make.tilemap({ key: "iboOffice" }); 

        const officeWalls = this.IboOffice.addTilesetImage("officeWalls", "officeWalls"); 
        const officeInfra = this.IboOffice.addTilesetImage("officeInfra", "officeInfra");
        const officeInfra2 = this.IboOffice.addTilesetImage("officeInfra2", "officeInfra2");
        const officeRoom = this.IboOffice.addTilesetImage("officeRoom", "officeRoom");
        const officeRoom2 = this.IboOffice.addTilesetImage("officeRoom2", "officeRoom2");

        // Layers
        this.IboOffice.createLayer("Chao", officeWalls, 100, 0);
        const wallsOffice = this.IboOffice.createLayer("Parede", officeWalls, 100, 0);
        const objetosOffice = this.IboOffice.createLayer("Objetos", [officeInfra, officeInfra2, officeRoom, officeRoom2], 100, 0);
        const objetosOffice2 = this.IboOffice.createLayer("Objetos2", [officeInfra, officeInfra2, officeRoom, officeRoom2], 100, 0);

        // Player
        this.player = new PlayerPrefab(this, 315, 270, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        wallsOffice.setCollisionByProperty({ collider: true }); 
        wallsOffice.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsOffice)

        objetosOffice.setCollisionByProperty({ collider: true }); 
        objetosOffice.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosOffice); 

        objetosOffice2.setCollisionByProperty({ collider: true }); 
        objetosOffice2.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosOffice2);

        
        this.doorZone = this.physics.add.staticGroup();
        const dataCenterDoor = this.doorZone.create(315, 270,).setSize(50, 50).setVisible(null); // Posiciona e define o tamanho 

        this.textBackground = this.add.rectangle(315, 270, 220, 15, 0xFFFFFF).setOrigin(0.5);
        this.textBackground.setAlpha(0.6);

        this.enterText = this.add.text(315, 270, "Pressione E para sair do Escritório", { fontSize: "10px", fill: "#000000" }).setOrigin(0.5);
        this.enterText.setVisible(false);

        this.enterImage = this.add.image(315, 300, "keyE").setOrigin(0.5).setScale(1.8);
        this.enterImage.setVisible(false);

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.IboOffice.widthInPixels, this.IboOffice.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    showEnterPrompt(player, lobbyDoorOut) {
        this.enterText.setVisible(true);
        this.enterImage.setVisible(true);
        this.textBackground.setVisible(true)

        if (Phaser.Input.Keyboard.JustDown(this.eKey)) { 
            window.lastScene = "IboOffice";
            this.scene.start("IboDelfi"); 
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
            const screenPos = cam.getWorldPoint(cam.width, 0); // canto superior direito
            const margin = 5;
        
            const coinBarWidth = this.coinBar.container.width || 180; // largura do container (padrão 180)

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