import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js";

export default class Chapter1Corvus extends Phaser.Scene {
  constructor() {
    super("Chapter1Corvus");
  }

  preload(){ 
    this.load.image("corvus", "assets/images/corvus.jpeg")
  }

  create() {
    this.sound.stopAll();

    GameState.setChapter(2)

    this.dialogIndex = 0;

    this.corvusImage = this.add.image(700, 400, "corvus").setScale(1.1) 

    systemMessage(this, GameState.corvusAttackDialog[this.dialogIndex]);

    this.input.keyboard.on("keydown-ENTER", () => {
        this.cameras.main.fadeOut(3000, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          this.scene.start("Lobby");
        });
    });
  }
}
