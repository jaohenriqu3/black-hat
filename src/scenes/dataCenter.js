import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../components/menuButton/menuButton.js'; 
import { EscMenu } from "../components/menuButton/menuESC.js"; 
import CoreBar from "../components/coreBar/coreBar.js";
import CoinBar from "../components/coinBar/coinBar.js"; 
import Wallet from "../components/coinBar/walletState.js"; 

export default class DataCenter extends Phaser.Scene {

    constructor() {
        super("DataCenter");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        
        this.load.tilemapTiledJSON("dataCenter", "assets/tilemaps/data-center.json");

        this.load.image("baseData", "assets/tilesets/walls.png"); 
        this.load.image("infraData", "assets/tilesets/infra16.png");

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
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
        this.dataCenter = this.make.tilemap({ key: "dataCenter" }); 

        const baseData = this.dataCenter.addTilesetImage("baseData", "baseData"); 
        const infraData = this.dataCenter.addTilesetImage("infraData", "infraData");
        
        // Layers
        this.dataCenter.createLayer("Chao", baseData, 40, 0);
        const wallsDataCenter = this.dataCenter.createLayer("Parede", baseData, 40, 0);
        const objetosDataCenter = this.dataCenter.createLayer("Objetos", infraData, 40, 0);
        const objetosDataCenter2= this.dataCenter.createLayer("Objetos2", infraData, 40, 0);
        const objetosDataCenter3 = this.dataCenter.createLayer("Objetos3", infraData, 40, 0);

        // Player
        this.player = new PlayerPrefab(this, 195, 280, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        wallsDataCenter.setCollisionByProperty({ collider: true }); 
        wallsDataCenter.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsDataCenter)

        objetosDataCenter.setCollisionByProperty({ collider: true }); 
        objetosDataCenter.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosDataCenter); 

        this.doorZone = this.physics.add.staticGroup();
        const dataCenterDoor = this.doorZone.create(195, 270,).setSize(50, 50).setVisible(null); // Posiciona e define o tamanho 

        this.textBackground = this.add.rectangle(195, 270, 220, 15, 0xFFFFFF).setOrigin(0.5);
        this.textBackground.setAlpha(0.6);

        this.enterText = this.add.text(195, 270, "Pressione E para sair do Data Center", { fontSize: "10px", fill: "#000000" }).setOrigin(0.5);
        this.enterText.setVisible(false);

        this.enterImage = this.add.image(185, 300, "keyE").setOrigin(0.5).setScale(1.8);
        this.enterImage.setVisible(false);

        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.dataCenter.widthInPixels, this.dataCenter.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }


    showEnterPrompt(player, lobbyDoorOut) {
        this.enterText.setVisible(true);
        this.enterImage.setVisible(true);
        this.textBackground.setVisible(true)

        if (Phaser.Input.Keyboard.JustDown(this.eKey)) { 
            window.lastScene = "DataCenter";
            this.scene.start("Doodle"); 
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