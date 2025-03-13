export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        // Tela de carregamento
        const progressBarBg = this.add.rectangle(700, 400, 300, 30, 0x666666).setOrigin(0.5);
        const progressBar = this.add.rectangle(700, 400, 0, 30, 0xffffff).setOrigin(0, 0.5);
        const loadingText = this.add.text(680, 370, "Carregando...", { fontSize: "20px", fill: "#ffffff" });

        this.load.on("progress", (progress) => {
            progressBar.width = progress * 300;
        });
        
        // Carregar assets
        this.load.image("tiles", "assets/tilesets/tilemap_packed.png"); // Tileset
        this.load.tilemapTiledJSON("map", "assets/tilemaps/delfiCity-7.json"); // Mapa JSON do Tiled
       // this.load.spritesheet("player", "assets/player.png", { frameWidth: 32, frameHeight: 32 }); // Personagem

    }

    create() {
        this.scene.start("Lobby");
    }
}