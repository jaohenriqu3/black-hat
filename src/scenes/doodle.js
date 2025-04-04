import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 

export default class Doodle extends Phaser.Scene {

    constructor() {
        super("Doodle");
    }

    preload() {
        // Mapa e os tilesets
        this.load.tilemapTiledJSON("doodle", "assets/tilemaps/doodle.json");

        this.load.image("wallsDoodle", "assets/tilesets/walls.png"); 
        this.load.image("pcDoodle", "assets/tilesets/infra16.png")
        this.load.image("stage", "assets/tilesets/stage.png"); 
        this.load.image("plays", "assets/tilesets/plays.png"); 
        this.load.image("television", "assets/tilesets/television.png");
        this.load.image("music", "assets/tilesets/music.png");
        this.load.image("logo", "assets/tilesets/tilemap_packed.png");
        

        this.load.image("keyE", "assets/inputs/keyE/keyE.png");

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    create() {
        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Tilemap
        this.doodle = this.make.tilemap({ key: "doodle" }); 

        const wallsDoodle = this.doodle.addTilesetImage("wallsDoodle", "wallsDoodle"); 
        const pcDoodle = this.doodle.addTilesetImage("pcDoodle", "pcDoodle");
        const stage = this.doodle.addTilesetImage("stage", "stage");
        const playsDoodle = this.doodle.addTilesetImage("plays", "plays") 
        const television = this.doodle.addTilesetImage("television", "television");
        const music = this.doodle.addTilesetImage("music", "music"); 
        const logo =  this.doodle.addTilesetImage("logo", "logo")

        // Layers
        const doodleBase = this.doodle.createLayer("Chao", wallsDoodle, 0, 0);
        const wallsDoodleLayer = this.doodle.createLayer("Parede", wallsDoodle, 0, 0);
        const objetosDoodle = this.doodle.createLayer("Objetos", [pcDoodle, stage, playsDoodle, television, music], 0, 0);
        const objetosDoodle2 = this.doodle.createLayer("Objetos2", [pcDoodle, stage, playsDoodle, television, music], 0, 0);
        const objetosDoodle3 = this.doodle.createLayer("Objetos3", [pcDoodle, stage, playsDoodle, television, music, logo], 0, 0);

        // Definir posição inicial do player
        const spawnPositions = {
            "Level": { x: 400, y: 400 }, // Vindo da cidade
            "DataCenter": { x: 135, y: 75 } // Vindo do Data Center
        };
        const spawn = spawnPositions[window.lastScene] || { x: 400, y: 400 };

        //Player
        this.player = new PlayerPrefab(this, spawn.x, spawn.y, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

        //Collider
        wallsDoodleLayer.setCollisionByProperty({ collider: true }); 
        wallsDoodleLayer.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, wallsDoodleLayer)

        objetosDoodle.setCollisionByProperty({ collider: true }); 
        objetosDoodle.setCollisionByExclusion([-1]); 
        this.physics.add.collider(this.player, objetosDoodle); 

        // Criar zona de interação para saída para a cidade
        this.doorZones = this.physics.add.staticGroup();

        this.doodleOutDoor = this.createDoor(400, 400, "Pressione E para sair da Doodle", "Level");
        this.dataCenterDoor = this.createDoor(135, 75, "Pressione E para entrar no Data Center", "DataCenter");

        // Ativar detecção de sobreposição do player com a porta
        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(1.9);
        this.cameras.main.setBounds(0, 0, this.doodle.widthInPixels, this.doodle.heightInPixels);
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
            window.lastScene = "Doodle";
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

        this.doorZones.children.iterate((door) => {
            if (!this.physics.overlap(this.player, door)) {
                door.enterText.setVisible(false);
                door.enterImage.setVisible(false);
                door.textBackground.setVisible(false);
                 }
            });
    }
}