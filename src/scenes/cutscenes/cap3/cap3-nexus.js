import GameState from "../../../state/gameState.js";
import systemMessage from "../../../components/systemMessage/systemMessage.js"; 

export default class Chapter3Nexus extends Phaser.Scene {
  constructor() {
    super("Chapter3Nexus");
  }

  preload(){ 
    this.load.image("pcFiles", "assets/images/pcFiles.png")  
    this.load.image("pcScript", "assets/images/pcScript.png")  
    this.load.image("pcNewLog", "assets/images/pcNewLog.png")
  }

  create() {
    GameState.setChapter(4) 
    this.sound.stopAll();
    
    this.dialogIndex = 0;

    this.log = this.add.image(700, 400, "pcFiles").setScale(0.87);
    this.script = this.add.image(700, 400, "pcScript").setScale(0.87).setVisible(false)
    this.newlog = this.add.image(700, 400, "pcNewLog").setScale(0.87).setVisible(false)

    systemMessage(this, GameState.chapter3NexusDialog[this.dialogIndex]);

    this.input.keyboard.on("keydown-ENTER", () => {
    
    this.dialogIndex++;

    systemMessage(this, GameState.chapter3NexusDialog[this.dialogIndex]);

      if (this.dialogIndex === 2) {
        this.log.setVisible(false);
        this.script.setVisible(true);
        systemMessage(this, GameState.chapter3NexusDialog[this.dialogIndex]);
      } else if(this.dialogIndex === 3){
        this.log.setVisible(false);
        this.script.setVisible(false);
        this.newlog.setVisible(true);
        systemMessage(this, GameState.chapter3NexusDialog[this.dialogIndex])
      } else if (this.dialogIndex === 5) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          window.lastScene = "Chapter3Nexus";
          this.scene.start("Lobby");
        });
      }
      });
    }
}
