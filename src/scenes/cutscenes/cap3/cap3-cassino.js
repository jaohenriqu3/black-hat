import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js"; 

export default class Chapter3Cutscene extends Phaser.Scene {
  constructor() {
    super("Chapter3Cutscene");
  }

  preload(){ 
    this.load.image("cassino2", "assets/images/cassino2.jpeg") 
  }

  create() {
    this.dialogIndex = 0; 
    this.sound.stopAll();

    this.delfirNews = this.add.image(700, 360, "cassino2").setScale(1.2)  

    systemMessage(this, GameState.cassino2CutDialog);

    this.input.keyboard.on("keydown-ENTER", () => {
        this.cameras.main.fadeOut(3000, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          window.lastScene = "Chapter3Cutscene"
          this.scene.start("Cassino");
        });
    });
  }
}
