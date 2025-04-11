import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 
import { addMenuButton } from '../components/menuButton/menuButton.js'; 
import { EscMenu } from "../components/menuButton/menuESC.js";

export default class IboDelfi extends Phaser.Scene {

    constructor() {
        super("IboDelfi");
    }

    preload() {
        this.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');

        this.load.tilemapTiledJSON("iboDelfi", "assets/tilemaps/ibodelfi.json");

        this.load.image("iboWalls", "assets/tilesets/walls.png"); 
        this.load.image("iboInfra", "assets/tilesets/infra2.png"); 
        this.load.image("iboInfra2", "assets/tilesets/board.png"); 
        this.load.image("iboInfra3", "assets/tilesets/infra16.png")
        this.load.image("iboIntens", "assets/tilesets/utils.png");

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {
        addMenuButton(this);
        EscMenu(this)

        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap
        this.iboDelfi = this.make.tilemap({ key: "iboDelfi" }); 

        const iboWalls = this.iboDelfi.addTilesetImage("iboWalls", "iboWalls"); 
        const iboInfra = this.iboDelfi.addTilesetImage("iboInfra", "iboInfra");
        const iboInfra2 = this.iboDelfi.addTilesetImage("iboInfra2", "iboInfra2"); 
        const iboInfra3 = this.iboDelfi.addTilesetImage("iboInfra3", "iboInfra3"); 
        const iboIntens = this.iboDelfi.addTilesetImage("iboIntens", "iboIntens");

        // Layers
        const iboBase = this.iboDelfi.createLayer("Chao", iboWalls, 30, 0);
        const iboWall = this.iboDelfi.createLayer("Parede", iboWalls, 30, 0);
        const iboObjetos = this.iboDelfi.createLayer("Objetos", [iboInfra, iboInfra2, iboInfra3, iboIntens], 30, 0);
        const iboObjetos2 = this.iboDelfi.createLayer("Objetos2", [iboInfra, iboInfra2, iboInfra3, iboIntens], 30, 0);
        const iboObjetos3 = this.iboDelfi.createLayer("Objetos3", [iboInfra, iboInfra2, iboInfra3, iboIntens], 30, 0);
        
        // Definir posição inicial do player
        const spawnPositions = {
            "Level": { x: 390, y: 255 }, 
            "IboOffice": { x: 435, y: 55 } 
        };
        const spawn = spawnPositions[window.lastScene] || { x: 390, y: 255 };

        //Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        iboWall.setCollisionByProperty({ collider: true }); 
        iboWall.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, iboWall)

        iboObjetos.setCollisionByProperty({ collider: true }); 
        iboObjetos.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, iboObjetos); 

        //Criar zona de interação para saída para a cidade
        this.doorZones = this.physics.add.staticGroup();

        this.iboOutDoor = this.createDoor(390, 255, "Pressione E para sair da IBODELFI", "Level");
        this.iboOfficeDoor = this.createDoor(435, 55, "Pressione E para entrar no escritório", "IboOffice");

        //Ativar detecção de sobreposição do player com a porta
        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.iboDelfi.widthInPixels, this.iboDelfi.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
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
            window.lastScene = "IboDelfi";
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

        if (this.menuButton) {
            const cam = this.cameras.main;
            const screenPos = cam.getWorldPoint(0, 0); // pega o ponto superior esquerdo visível da câmera
            const margin = 10;
    
            this.menuButton.setPosition(screenPos.x + margin, screenPos.y + margin);
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