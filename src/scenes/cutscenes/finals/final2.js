import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js";

export default class Final2 extends Phaser.Scene {
  constructor() {
    super("Final2");
  }

  preload(){ 
    this.load.image("internet", "assets/images/internet.jpeg") 
    this.load.image("outdoor", "assets/images/outdoor.png")
    this.load.image("danteCorvus", "assets/images/dante-corvus.jpeg")

    this.load.audio("finalmusic", "assets/audios/final/finalMusic2.mp3")

  }

  create() {

    this.finalMusic = this.sound.add('finalmusic', {
            loop: true,
            volume: 1.0, 
        }); 
      
    this.finalMusic.play()

    this.dialogIndex = 0;

    this.internet = this.add.image(700, 400, "internet").setScale(1.1)
    this.outdoor = this.add.image(700, 400, "outdoor").setScale(1.1).setVisible(false)
    this.danteCorvus = this.add.image(700, 400, "danteCorvus").setScale(1.1).setVisible(false)

    systemMessage(this, GameState.final2Dialog[this.dialogIndex]);

    this.input.keyboard.on("keydown-ENTER", () => {
    
    this.dialogIndex++;

      if (this.dialogIndex === 1) {
        this.internet.setVisible(false);
        this.outdoor.setVisible(true);
        systemMessage(this, GameState.final2Dialog[1]);
      }
      else if (this.dialogIndex === 2) {
        this.internet.setVisible(false);
        this.outdoor.setVisible(false);
        this.danteCorvus.setVisible(true);
        systemMessage(this, GameState.final2Dialog[2]);
      } 
        else {
        this.cameras.main.fadeOut(3000, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("Close");
        });
      }
    });
  }
}
