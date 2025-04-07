import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js"; 

export default class Cassino extends Phaser.Scene {

    constructor() {
        super("Cassino");
    }

    preload() {
        // Mapa e os tilesets
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
             itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0);
        const objetosCassino2 = this.cassino.createLayer("Objetos2", [gamesCassino, itemsCassino, itemsCassino2, itemsCassino3, itemsCassino4, itemsCassino5,
             itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0);
        const objetosCassino3 = this.cassino.createLayer("Objetos3", [gamesCassino, itemsCassino, itemsCassino2, itemsCassino3, itemsCassino4, itemsCassino5, 
            itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0);
        const objetosCassino4 = this.cassino.createLayer("Objetos4", [gamesCassino, itemsCassino, itemsCassino2, itemsCassino3, itemsCassino4, itemsCassino5, 
            itemsCassino6, itemsCassino7, itemsCassino8, infraCassino], 30, 0);

        //Definir posição inicial do player
        const spawnPositions = { 
             "Level": { x: 270, y: 410 }, 
             "CassinoOffice": { x: 435, y: 55 }   
         } 
        const spawn = spawnPositions[window.lastScene] || {  x: 270, y: 410 };

        //Player
        this.player = new PlayerPrefab(this, 270, 410, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

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

        //Criar zona de interação para saída para a cidade
        this.doorZones = this.physics.add.staticGroup();

        this.cassinoOutDoor = this.createDoor(270, 430, "Pressione E para sair do Cassino", "Level");
        this.cassiboOfficeDoor = this.createDoor(455, 55, "Pressione E para entrar no escritório", "CassinoOffice");

        //Ativar detecção de sobreposição do player com a porta
        this.physics.add.overlap(this.player, this.doorZone, this.showEnterPrompt, null, this);

        //Debug
        //objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.cassino.widthInPixels, this.cassino.heightInPixels);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }

    createDoor(x, y, text, sceneName) {
        const door = this.doorZones.create(x, y).setSize(50, 50).setVisible(false);
        door.textBackground = this.add.rectangle(x - 10, y - 10, 250, 15, 0xFFFFFF, 0.6).setOrigin(0.5).setVisible(false); 
        door.enterText = this.add.text(x - 10, y - 10, text, { fontSize: "10px", fill: "#000000" }).setOrigin(0.5).setVisible(false);
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
            window.lastScene = "Cassino";
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