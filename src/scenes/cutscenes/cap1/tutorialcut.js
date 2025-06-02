export default class TutorialCut extends Phaser.Scene {
  constructor() {
    super("TutorialCut");
  }

  preload(){ 
  }

  create() {
        this.cameras.main.fadeOut(10, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          window.lastScene = 'TutorialCut'
          this.scene.start("Coffe");
        });
  }
}

