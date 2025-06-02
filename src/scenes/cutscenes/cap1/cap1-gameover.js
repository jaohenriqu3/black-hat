import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js"; 

import CoreBar from "../../../components/coreBar/coreBar.js";

export default class Chapter1GameOver extends Phaser.Scene {
  constructor() {
    super("Chapter1GameOver");
  }

  preload(){ 
    this.load.image("blacknest", "assets/images/blacknest-gameover.png") 
    this.coreBar = new CoreBar(this, 1600, 1000);
  }

  create() { 
    this.sound.stopAll();

    this.coreBar.resetCores()

    this.dialogIndex = 0; 

    this.doodleTv = this.add.image(700, 400, "blacknest").setScale(0.8)  

    systemMessage(this, GameState.gameOverCap1Dialog[this.dialogIndex]);

    if (this.dialogIndex === 0) {
        systemMessage(this, GameState.gameOverCap1Dialog[this.dialogIndex]); 
        this.cameras.main.fadeOut(7000, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => { 
          if (window.lastScene === "DanteCell"){
            window.lastScene = "Chapter1GameOver";
            this.scene.start("Cassino"); 
          } 
          else if (window.lastScene === "BlackLock"){
            window.lastScene = "Chapter1GameOver";
            this.scene.start("BlackNest"); 
          } else { 
            window.lastScene = "Chapter1GameOver";
            this.scene.start("Doodle"); 
          }
        });
      } 
  }
}
