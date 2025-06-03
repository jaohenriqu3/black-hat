export default class Initial extends Phaser.Scene {
  constructor() {
    super("Initial");
  }

  preload() {
     this.load.image("lifters", "assets/images/lifters.png"); 
     this.load.audio('initial-music', 'assets/audios/music/initial-music.mp3');
  }

  create() {
    this.scale.startFullscreen();
    
    this.Background = this.add.rectangle(1400, 800, 20000, 10000, 0x000000).setOrigin(0.5);

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.initialMusic = this.sound.add('initial-music', {
            loop: true,
            volume: 0.6, 
            rate: 1.0
            }
        );
    
    this.initialMusic.play()

    const texts = [
      "Todas as marcas, história e personagens desse jogo, são de origem autoral",
      "Qualquer semelhança com o mundo real, é pura coincidência.",
    ];

    let currentIndex = 0;

    this.message = this.add.text(centerX, centerY, "", {
      fontSize: "30px",
      fill: "#ffffff",
      align: "center"
    }).setOrigin(0.5).setAlpha(0);

    this.showNextText(texts, currentIndex);
  }

  showNextText(texts, index) {
    if (index >= texts.length) {
      this.showFinalButtons();
      return;
    }

    this.message.setText(texts[index]);
    this.message.setAlpha(0);

    this.tweens.add({
      targets: this.message,
      alpha: 1,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        this.time.delayedCall(3000, () => {
          this.tweens.add({
            targets: this.message,
            alpha: 0,
            duration: 800,
            onComplete: () => {
              this.showNextText(texts, index + 1);
            }
          });
        });
      }
    });
  }

  showFinalButtons() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.hat = this.add.image(centerX + 10, centerY, 'lifters').setScale(1.0); 

    this.cameras.main.fadeOut(5000, 0, 0, 0); 
                this.cameras.main.once("camerafadeoutcomplete", () => {
                    this.scene.start("Level");
                });

    [this.hat,].forEach(btn => {
      btn.setAlpha(0);
      this.tweens.add({
        targets: btn,
        alpha: 1,
        duration: 1000,
        delay: 500
      });
    });
  }
}
