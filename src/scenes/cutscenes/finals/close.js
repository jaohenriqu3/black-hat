import GameState from "../../../state/gameState.js";

export default class Close extends Phaser.Scene {
  constructor() {
    super("Close");
  }

  preload() {
     this.load.image("logo", "assets/images/Logo.png");
  }

  create() {
    GameState.setChapter(4)

    this.Background = this.add.rectangle(1400, 800, 20000, 10000, 0x000000).setOrigin(0.5);

    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    const texts = [
      "Liberdade ou Estabilidade?\nPrivacidade ou Vigilância?\nRevolução ou Ordem?",
      "Ser Black Hat é saber a verdade",
      "Fim de jogo"
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

    this.hat = this.add.image(centerX + 10, centerY - 150, 'logo').setScale(0.4);

    const restartBtn = this.add.text(centerX, centerY + 50, "Recomeçar", {
      fontSize: "20px",
      fill: "#ffffff",
      backgroundColor: "#444"
    }).setOrigin(0.5).setPadding(10).setInteractive({ useHandCursor: true });

    restartBtn.on("pointerdown", () => {
      this.sound.stopAll();
      this.scene.start("TelaInicial"); 
    });

    const continueBtn = this.add.text(centerX, centerY + 100, "Continuar no jogo", {
      fontSize: "20px",
      fill: "#ffffff",
      backgroundColor: "#444"
    }).setOrigin(0.5).setPadding(10).setInteractive({ useHandCursor: true }); 

    const moreBtn = this.add.text(centerX, centerY + 150, "Mais sobre Black Hat", {
      fontSize: "20px",
      fill: "#ffffff",
      backgroundColor: "#444"
    }).setOrigin(0.5).setPadding(10).setInteractive({ useHandCursor: true });

    continueBtn.on("pointerdown", () => {
      this.sound.stopAll();
      this.scene.start("Lobby"); 
    }); 

    moreBtn.on("pointerdown", () => {
       window.open('https://joaos-organization-54.gitbook.io/black-hat', '_blank');
    });

    [this.hat, restartBtn, continueBtn, moreBtn].forEach(btn => {
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
