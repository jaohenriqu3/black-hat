import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js";

export default class Chapter1Cutscene extends Phaser.Scene {
  constructor() {
    super("Chapter1Cutscene");
  }

  preload(){ 
    this.load.image("doodle-tv", "assets/images/doodle-tv.png")
    this.load.image("dante-in-pc", "assets/images/dante-in-pc.jpeg")
  }

  create() {
    this.sound.stopAll();

    this.dialogIndex = 0;

    this.doodleTv = this.add.image(700, 400, "doodle-tv").setScale(1.1) 
    this.danteInPC = this.add.image(700, 400, "dante-in-pc").setScale(1.1).setVisible(false)

    systemMessage(this, GameState.chapter1CutsceneDialog[this.dialogIndex]);

    this.input.keyboard.on("keydown-ENTER", () => {
    
    this.dialogIndex++;

      if (this.dialogIndex === 1) {
        this.doodleTv.setVisible(false);
        this.danteInPC.setVisible(true);
        systemMessage(this, GameState.chapter1CutsceneDialog[1]);
      } 
      else {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        // this.scene.stop("Chapter1Cutscene")
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("Doodle");
        });
      }
    });
  }
}
