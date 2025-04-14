import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../components/menuButton/menuButton.js'; 
import { EscMenu } from "../components/menuButton/menuESC.js";
import CoreBar from "../components/coreBar/coreBar.js";

export default class CassinoOffice extends Phaser.Scene {

    constructor() {
        super("CassinoOffice");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.tilemapTiledJSON("cassinoOffice", "assets/tilemaps/cassinoOffice.json");

        this.load.image("wallscOffice", "assets/tilesets/walls.png"); 
        this.load.image("officeitems", "assets/tilesets/utils.png"); 
        this.load.image("officeitems2", "assets/tilesets/room.png");
        this.load.image("officeitems3", "assets/tilesets/halloween.png");
        this.load.image("officeitems4", "assets/tilesets/room2.png");
        this.load.image("officeitems5", "assets/tilesets/natal.png");
        this.load.image("officeitems6", "assets/tilesets/kitchen.png");
        this.load.image("officeitems7", "assets/tilesets/museum.png");
        this.load.image("officeitems8", "assets/tilesets/infra2.png");

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {

        addMenuButton(this);
        EscMenu(this) 
        this.coreBar = new CoreBar(this, 10, 50);

        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap
        this.CassinoOffice = this.make.tilemap({ key: "cassinoOffice" }); 

        // Tilesets
        const cassinoOfficeBase = this.CassinoOffice.addTilesetImage("wallscOffice", "wallscOffice"); 
        const cassinoOfficeItems = this.CassinoOffice.addTilesetImage("officeitems", "officeitems");
        const cassinoOfficeItems2 = this.CassinoOffice.addTilesetImage("officeitems2", "officeitems2");
        const cassinoOfficeItems3 = this.CassinoOffice.addTilesetImage("officeitems3", "officeitems3");
        const cassinoOfficeItems4 = this.CassinoOffice.addTilesetImage("officeitems4", "officeitems4");
        const cassinoOfficeItems5 = this.CassinoOffice.addTilesetImage("officeitems5", "officeitems5");
        const cassinoOfficeItems6 = this.CassinoOffice.addTilesetImage("officeitems6", "officeitems6");
        const cassinoOfficeItems7 = this.CassinoOffice.addTilesetImage("officeitems7", "officeitems7");
        const cassinoOfficeItems8 = this.CassinoOffice.addTilesetImage("officeitems8", "officeitems8");

        // Layers
        this.CassinoOffice.createLayer("Chao", cassinoOfficeBase, 30, 0);
        this.CassinoOffice.createLayer("Chao2", cassinoOfficeItems, 30, 0);
        const wallsCassinoOffice = this.CassinoOffice.createLayer("Parede", cassinoOfficeBase, 30, 0);
        const objetosUnderCassinoOffice = this.CassinoOffice.createLayer("ObjetosUnder", [cassinoOfficeItems, cassinoOfficeItems2, cassinoOfficeItems3, cassinoOfficeItems4, 
            cassinoOfficeItems5, cassinoOfficeItems6, cassinoOfficeItems7, cassinoOfficeItems8], 30, 0);
        const objetosCassinoOffice = this.CassinoOffice.createLayer("Objetos", [cassinoOfficeItems, cassinoOfficeItems2, cassinoOfficeItems3, cassinoOfficeItems4, 
            cassinoOfficeItems5, cassinoOfficeItems6, cassinoOfficeItems7, cassinoOfficeItems8], 30, 0); 
        const objetosCassinoOffice2 = this.CassinoOffice.createLayer("Objetos2", [cassinoOfficeItems, cassinoOfficeItems2, cassinoOfficeItems3, cassinoOfficeItems4, 
                cassinoOfficeItems5, cassinoOfficeItems6, cassinoOfficeItems7, cassinoOfficeItems8], 30, 0); 
        const objetosCassinoOffice3 = this.CassinoOffice.createLayer("Objetos3", [cassinoOfficeItems, cassinoOfficeItems2, cassinoOfficeItems3, cassinoOfficeItems4, 
                cassinoOfficeItems5, cassinoOfficeItems6, cassinoOfficeItems7, cassinoOfficeItems8], 30, 0); 
        
        // Player
        this.player = new PlayerPrefab(this, 270, 270, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        wallsCassinoOffice.setCollisionByProperty({ collider: true }); 
        wallsCassinoOffice.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsCassinoOffice)

        objetosUnderCassinoOffice.setCollisionByProperty({ collider: true }); 
        objetosUnderCassinoOffice.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosUnderCassinoOffice)

        objetosCassinoOffice.setCollisionByProperty({ collider: true }); 
        objetosCassinoOffice.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosCassinoOffice) 

        objetosCassinoOffice2.setCollisionByProperty({ collider: true }); 
        objetosCassinoOffice2.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosCassinoOffice2)

        objetosCassinoOffice3.setCollisionByProperty({ collider: true }); 
        objetosCassinoOffice3.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosCassinoOffice3)

        //Zona de interação para a porta
        this.doorZone = this.physics.add.staticGroup();
        const CassinoOfficeDoor = this.doorZone.create(270, 270,).setSize(50, 50).setVisible(null); // Posiciona e define o tamanho 

        this.textBackground = this.add.rectangle(270, 270, 220, 15, 0xFFFFFF).setOrigin(0.5);
        this.textBackground.setAlpha(0.6);

        this.enterText = this.add.text(270, 270, "Pressione E para sair do Escritório", { fontSize: "10px", fill: "#000000" }).setOrigin(0.5);
        this.enterText.setVisible(false);

        this.enterImage = this.add.image(270, 300, "keyE").setOrigin(0.5).setScale(1.8);
        this.enterImage.setVisible(false);

        //Ativar detecção de sobreposição do player com a porta
        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.CassinoOffice.widthInPixels, this.CassinoOffice.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    showEnterPrompt(player, lobbyDoorOut) {
        this.enterText.setVisible(true);
        this.enterImage.setVisible(true);
        this.textBackground.setVisible(true)

        // Verifica se o player pressionou "E"
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) { 
            window.lastScene = "CassinoOffice";
            this.scene.start("Cassino"); 
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

        if (!this.physics.overlap(this.player, this.doorZone)) {
            this.enterText.setVisible(false);
            this.enterImage.setVisible(false);
            this.textBackground.setVisible(false);
        }
    }
}