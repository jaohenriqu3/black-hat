export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }
    
    preload() {
       const centerX = this.cameras.main.width / 2;
       const centerY = this.cameras.main.height / 2;

       const barWidth = 300; 
       const barHeight = 30; 
       const spacing = -10; 

       const progressBarBg = this.add.rectangle(centerX, centerY + 50, barWidth, barHeight, 0x666666).setOrigin(0.5);
       const progressBar = this.add.rectangle(centerX - barWidth / 2, centerY + 50, 0, barHeight, 0xffffff).setOrigin(0, 0.5);
       const loadingText = this.add.text(centerX, centerY - spacing, "Carregando...", { fontSize: "24px", fill: "#ffffff" }).setOrigin(0.5);
       
       this.load.on("progress", (progress) => {
           progressBar.width = progress * barWidth;
       });

        this.load.image("loadingImage", "assets/preload/hat.png");
        const image = this.add.image(centerX, centerY - 70, "loadingImage").setScale(0.5).setOrigin(0.5);
    }

    create() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        this.scene.start("Lobby");
    }
}