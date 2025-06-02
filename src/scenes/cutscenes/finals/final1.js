import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js";

export default class Final1 extends Phaser.Scene {
  constructor() {
    super("Final1");
  }

  preload(){ 
    this.load.image("corvusJail", "assets/images/corvus-jail.jpeg")
    this.load.image("danteTV", "assets/images/danteTV.jpeg") 
    this.load.image("doodle", "assets/images/doodle.png") 
    this.load.image("danteMask", "assets/images/danteMask.jpeg")

    this.load.audio("finalmusic", "assets/audios/final/finalMusic2.mp3")
  }

  create() {

    this.dialogIndex = 0;

    this.finalMusic = this.sound.add('finalmusic', {
            loop: true,
            volume: 1.0, 
        }); 
      
    this.finalMusic.play()

    this.corvusJail = this.add.image(700, 400, "corvusJail").setScale(1.1) 
    this.danteTV = this.add.image(700, 400, "danteTV").setScale(1.1).setVisible(false)
    this.doodle = this.add.image(700, 400, "doodle").setScale(1.2).setVisible(false)
    this.danteMask = this.add.image(700, 400, "danteMask").setScale(1.1).setVisible(false)

    systemMessage(this, GameState.final1Dialog[this.dialogIndex]);

    this.input.keyboard.on("keydown-ENTER", () => {
    
    this.dialogIndex++;

      if (this.dialogIndex === 1) {
        this.corvusJail.setVisible(false);
        this.danteTV.setVisible(true);
        systemMessage(this, GameState.final1Dialog[1]);
      }
      else if (this.dialogIndex === 2) {
        this.corvusJail.setVisible(false);
        this.danteTV.setVisible(false);
        this.doodle.setVisible(true);
        systemMessage(this, GameState.final1Dialog[2]);
      } else if (this.dialogIndex === 3) {
        this.corvusJail.setVisible(false);
        this.danteTV.setVisible(false);
        this.doodle.setVisible(false);
        this.danteMask.setVisible(true);
        systemMessage(this, GameState.final1Dialog[3]);
    } else {
        this.cameras.main.fadeOut(3000, 0, 0, 0);
        // this.scene.stop("Chapter1Cutscene")
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("Close");
        });
      }
    });
  }
}
