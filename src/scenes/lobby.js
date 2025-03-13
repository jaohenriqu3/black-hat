import PlayerPrefab from "../prefabs/playerPrefab.js";
import { PlayerAnimations, preloadPlayerAnimations } from "../prefabs/animationsPlayer.js";

export default class Lobby extends Phaser.Scene {

    constructor() {
        super("Lobby");
    }

    preload() {
        // Mapa e os tilesets
        this.load.tilemapTiledJSON("casaDante", "assets/tilemaps/casa-dante.json");
        this.load.image("tiletest", "assets/tilesets/tiletest.png"); 

        preloadPlayerAnimations(this)
        
        console.log(this.textures.list);
    }

    
    create() {
        // Inputs
        this.up_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Tilemap
        this.lobby = this.make.tilemap({ key: "casaDante" }); 
        const tileset = this.lobby.addTilesetImage("tiletest", "tiletest");

        // Layers
        this.lobby.createLayer("Chao", tileset, 50, 0);
        const parede  = this.lobby.createLayer("Parede", tileset, 50, 0);
        const objetos = this.lobby.createLayer("Objetos", tileset, 50, 0);

        // Player
        this.player = new PlayerPrefab(this, 120, 100, "dante");
        this.physics.add.existing(this.player);

        PlayerAnimations(this)

       // Collider
         objetos.setCollisionByProperty({ collider: true }); 
         objetos.setCollisionByExclusion([-1]); 
         this.physics.add.collider(this.player, objetos);

         parede.setCollisionByProperty({ collider: true}) 
         parede.setCollisionByExclusion([-1]);  
         this.physics.add.collider(this.player, parede);


    //Debug
       // objetos.renderDebug(this.add.graphics().setDepth(1))

        // Configurar câmera
        this.cameras.main.setZoom(2.4);
        this.cameras.main.setBounds(0, 0, this.lobby.widthInPixels, this.lobby.heightInPixels);
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
    }
}
