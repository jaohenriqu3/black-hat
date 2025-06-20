export default class TelaInicial extends Phaser.Scene {

    constructor() {
        super("TelaInicial");
    }

    preload() {
        this.load.image("telaInicial", "assets/screens/initialScreen.png"); 
        this.load.audio('intro-music', 'assets/audios/music/intro-music.mp3');
    }

    create() {
    // this.scale.startFullscreen();
       
    this.add.image(700, 400, "telaInicial").setOrigin(0.5) 

    this.add.text(80, 780, "Versão: 1.2.2", {
        fontSize: "22px", 
        fontFamily: "Arial", 
        fill: "#ffffff", 
        stroke: "#000000", 
        strokeThickness: 3,
    }).setOrigin(0.5);

    this.introMusic = this.sound.add('intro-music', {
        loop: true,
        volume: 0.5,
    }); 

    this.introMusic.play();

    this.events.on('shutdown', () => {
        if (this.introMusic && this.introMusic.isPlaying) {
        this.introMusic.stop();
            }
        });

    this.fullText = "Pressione ENTER para começar";
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
            window.playEntranceAnimation = true;
            this.scene.start("Initial");
        }
    }
}
