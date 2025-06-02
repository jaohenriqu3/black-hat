export default class TutorialCut extends Phaser.Scene {
  constructor() {
    super("Chapter4Cutscene");
  }

  preload(){ 
  }

  // Roteiro CutScene: 
  // Corvus expõe prefeitura 
  // Dante decide que é hora de agir "As açoes de corvus estão muito perigosas"
  // Dante usa o mapa obtido para achar o covil do BlackNest

  create() {
        this.sound.stopAll();
        
        this.cameras.main.fadeOut(10, 0, 0, 0);
        this.cameras.main.once("camerafadeoutcomplete", () => {
          window.lastScene = 'Chapter4Cutscene'
          this.scene.start("BlackNest");
        });
  }
}
