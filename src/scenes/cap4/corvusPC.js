import CoinBar from "../../components/coinBar/coinBar.js";
import CoreBar from "../../components/coreBar/coreBar.js"; 

import GameState from "../../state/gameState.js";
import systemMessage from "../../components/systemMessage/systemMessage.js";

export default class CorvusPC extends Phaser.Scene {

    constructor() {
        super("CorvusPC");
    } 

    preload() {
        this.load.image("dataPC", "assets/screens/puzzlePC.png");

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image("corvusPC", "assets/screens/corvusPC.png");
        this.load.image("hacker", "assets/images/hacker.png"); 
        this.load.image("corvus-cut", "assets/images/corvuscut.png");
        
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {
      this.coreBar = new CoreBar(this, 1220, 15);
      this.coreBar.container.setScale(3.0)

      this.coinBar = new CoinBar(this, 980, 55);
      this.coinBar.container.setScale(1.1)

      this.add.image(700, 460 ,"corvusPC");

      this.option1 = this.add.rectangle(460, 270, 280, 280, 0x000000).setOrigin(0.5).setInteractive(); 
      this.add.image(460, 260, "corvus-cut").setScale(0.3) 

      this.true = this.add.text(385, 380, "Denunciar Corvus", {
      fill: "#00FF00", fontFamily: 'monospace', fontSize: "18px"
      }).setDepth(11).setVisible(true)

      this.option2 = this.add.rectangle(780, 270, 280, 280, 0x00000).setOrigin(0.5).setInteractive(); 
      this.add.image(780, 255, "hacker").setScale(0.122) 

      this.true = this.add.text(720, 380, "Ajudar Corvus", {
      fill: "#00FF00", fontFamily: 'monospace', fontSize: "18px"
      }).setDepth(11).setVisible(true)

      this.true = this.add.text(400, 10, "ATENÇÃO: Sua decisão decidirá o final do jogo", {
      fill: "#FFFFFF", fontFamily: 'monospace', fontSize: "18px"
      }).setDepth(11).setVisible(true)

    this.option1.on("pointerdown", () => {
        this.cameras.main.fadeOut(2000, 0, 0, 0); 
        this.sound.stopAll();
                this.cameras.main.once("camerafadeoutcomplete", () => {
                    this.scene.start("Final1");
            });
    });

    this.option2.on("pointerdown", () => {
        this.cameras.main.fadeOut(2000, 0, 0, 0); 
        this.sound.stopAll();
                this.cameras.main.once("camerafadeoutcomplete", () => {
                    this.scene.start("Final2");
        });
    });

      const chapter = GameState.getChapter();

    } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            window.lastScene = "DataCenterPC";
            this.scene.start("DataCenter");
        }
    }
}