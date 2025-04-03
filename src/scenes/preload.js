export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
       // Definir a posição central da tela
       const centerX = this.cameras.main.width / 2;
       const centerY = this.cameras.main.height / 2;

       this.load.image("loadingImage", "assets/preload/hat.png");

       // Criar barra de carregamento com espaçamento ajustável
       const barWidth = 300;
       const barHeight = 30;
       const spacing = -10; // Espaço entre os elementos


       const progressBarBg = this.add.rectangle(centerX, centerY + 50, barWidth, barHeight, 0x666666).setOrigin(0.5);
       const progressBar = this.add.rectangle(centerX - barWidth / 2, centerY + 50, 0, barHeight, 0xffffff).setOrigin(0, 0.5);
       const loadingText = this.add.text(centerX, centerY - spacing, "Carregando...", { fontSize: "24px", fill: "#ffffff" }).setOrigin(0.5);

       this.load.on("progress", (progress) => {
           progressBar.width = progress * barWidth;
       });
        
        // Carregar assets
        this.load.image("tiles", "assets/tilesets/tilemap_packed.png"); // Tileset
        this.load.tilemapTiledJSON("map", "assets/tilemaps/delfiCity-7.json"); // Mapa JSON do Tiled
        const image = this.add.image(centerX, centerY - 70, "loadingImage").setScale(0.5).setOrigin(0.5);

    }

    create() {

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.scene.start("DataCenter");
    }
}