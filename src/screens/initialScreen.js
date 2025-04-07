export default class TelaInicial extends Phaser.Scene {

    constructor() {
        super("TelaInicial");
    }

    preload() {
        this.load.image("telaInicial", "assets/screens/initialScreen.png"); 
    }

    create() {
        this.add.image(700, 400, "telaInicial").setOrigin(0.5) 

    this.fullText = "Pressione ENTER para jogar";
    this.currentText = "";

    this.enterText = this.add.text(700, 550, "", {
        fontSize: "28px",
        fontFamily: "Arial",
        fill: "#ffffff",
        stroke: "#000000",
        strokeThickness: 3,
    }).setOrigin(0.5);

    this.textIndex = 0;
    this.time.addEvent({
        delay: 90, 
        repeat: this.fullText.length - 1,
        callback: () => {
            this.currentText += this.fullText[this.textIndex];
            this.enterText.setText(this.currentText);
            this.textIndex++;
        }
    });
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.scene.start("Lobby");
        }
    }
}
