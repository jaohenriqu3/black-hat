import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js"; 

export default class Chapter2Cassino extends Phaser.Scene {
  constructor() {
    super("Chapter2Cassino");
  }

  preload(){ 
    this.load.image("cassino", "assets/images/cassino.jpeg") 
  }

  create() {
    GameState.setChapter(3)
    this.sound.stopAll();

    this.dialogIndex = 0;

    this.corvusImage = this.add.image(700, 400, "cassino").setScale(1.1) 

    systemMessage(this, GameState.cassinoCutDialog[this.dialogIndex]);

    this.input.keyboard.on("keydown-ENTER", () => {
        this.cameras.main.fadeOut(3000, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          window.lastScene = "Chapter2Cassino";
          this.scene.start("Level");
        });
    });
  }
}
