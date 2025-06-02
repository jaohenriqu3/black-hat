import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js"; 

export default class Chapter2Cutscene extends Phaser.Scene {
  constructor() {
    super("Chapter2Cutscene");
  }

  preload(){ 
    this.load.image("delfirNews", "assets/images/delfir-news.jpeg") 
  }

  create() {
    this.dialogIndex = 0; 
    this.sound.stopAll();

    this.delfirNews = this.add.image(700, 360, "delfirNews").setScale(1.2)  

    systemMessage(this, GameState.delfirNewsDialog[this.dialogIndex]);

    this.input.keyboard.on("keydown-ENTER", () => {
    
    this.dialogIndex++;

      if (this.dialogIndex === 1) {
        systemMessage(this, GameState.delfirNewsDialog[this.dialogIndex]);
      } 
      else {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
       // this.scene.stop("Chapter1Cutscene")
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("IboDelfi");
        });
      }
    });
  }
}
