import CoinBar from "../components/coinBar/coinBar.js"; 
import CoreBar from "../components/coreBar/coreBar.js";

import GameState from "../state/gameState.js";

export default class CassinoPC extends Phaser.Scene {

    constructor() {
        super("CassinoPC");
    }

    preload() {
        this.load.image("PCcassino", "assets/screens/cassinoPC.png");                  

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");                              
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");           
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");
        this.load.image("bigFicha", "assets/inputs/UI/coins/big-ficha.png");

        this.load.image("data", "assets/inputs/UI/icons/data.png");

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {

      this.coreBar = new CoreBar(this, 1220, 15);
      this.coreBar.container.setScale(3.0)

      this.coinBar = new CoinBar(this, 980, 50);
      this.coinBar.container.setScale(1.1)

      this.add.image(700, 460 ,"PCcassino");

      //this.screenZone= this.add.rectangle(625, 280, 570, 350, 0xFFFFFF).setOrigin(0.5).setInteractive(); 

      this.cardBackground= this.add.rectangle(410, 320, 130, 300, 0xD0D0D0).setOrigin(0.5).setInteractive(); 
      this.cardBackground2= this.add.rectangle(560, 320, 130, 300, 0xD0D0D0).setOrigin(0.5).setInteractive(); 
      this.cardBackground3= this.add.rectangle(710, 320, 130, 300, 0xD0D0D0).setOrigin(0.5).setInteractive(); 
      this.cardBackground4= this.add.rectangle(860, 320, 130, 300, 0xD0D0D0).setOrigin(0.5).setInteractive(); 

      this.add.image(410, 280, "bigFicha").setScale(1.0) 
      this.add.image(560, 280, "bigFicha").setScale(1.0)
      this.add.image(710, 280, "bigFicha").setScale(1.0)
      this.add.image(860, 280, "bigFicha").setScale(1.0)

      this.cardTitle = this.add.text(370, 340, "1 Ficha", {fontSize: "22px", fill: "#00000", fontFamily: 'monospace'}) 
      this.cardTitle2 = this.add.text(510, 340, "5 Fichas", {fontSize: "22px", fill: "#00000", fontFamily: 'monospace'}) 
      this.cardTitle3 = this.add.text(670, 340, "1 Ficha", {fontSize: "22px", fill: "#00000", fontFamily: 'monospace'}) 
      this.cardTitle4 = this.add.text(810, 340, "5 Fichas", {fontSize: "22px", fill: "#00000", fontFamily: 'monospace'}) 
    
      this.cardPrice = this.add.text(360, 370, "200 Delfirs", {fontSize: "17px", fill: "#00000", fontFamily: 'monospace'}) 
      this.cardPrice2 = this.add.text(510, 370, "950 Delfirs", {fontSize: "17px", fill: "#00000", fontFamily: 'monospace'}) 
      this.cardPrice3 = this.add.text(670, 370, "1 DitCoin", {fontSize: "17px", fill: "#00000", fontFamily: 'monospace'}) 
      this.cardPrice4 = this.add.text(812, 370, "5 DitCoins", {fontSize: "17px", fill: "#00000", fontFamily: 'monospace'}) 

      this.preesE = this.add.text(200, 15, "Pressione E para sair do computador",
     { fontSize: "20px", fill: "#FFFFFF", fontFamily: 'monospace',}).setOrigin(0.5); 

    
        this.feedbackTextFalse = this.add.text(650, 490, "", {
            fontSize: "22px",
            fill: "#ff0000",
            fontFamily: "monospace",
        }).setOrigin(0.5);

        this.feedbackTextTrue = this.add.text(650, 490, "", {
            fontSize: "22px",
            fill: "#00ff00",
            fontFamily: "monospace",
        }).setOrigin(0.5);

        this.showFeedbackFalse = (message) => {
            this.feedbackTextFalse.setText(message);
            this.time.delayedCall(1000, () => {
                this.feedbackTextFalse.setText("");
            });
        };

        this.showFeedbackTrue = (message) => {
            this.feedbackTextTrue.setText(message);
            this.time.delayedCall(1000, () => {
                this.feedbackTextTrue.setText("");
            });
        };

        this.cardBackground.on("pointerdown", () => {
            if (GameState.getCoins("delfir") >= 200) {
                GameState.addCoins("delfir", -200);
                GameState.addCoins("ficha", 1);
                this.coinBar._refreshDisplay();
                this.showFeedbackTrue("Compra realizada!");
            } else {
                this.showFeedbackFalse("Saldo Insuficiente");
            }
        });

        this.cardBackground2.on("pointerdown", () => {
            if (GameState.getCoins("delfir") >= 950) {
                GameState.addCoins("delfir", -950);
                GameState.addCoins("ficha", 5);
                this.coinBar._refreshDisplay();
                this.showFeedbackTrue("Compra realizada!");
            } else {
                this.showFeedbackFalse("Saldo Insuficiente");
            }
        });

        this.cardBackground3.on("pointerdown", () => {
            if (GameState.getCoins("ditcoin") >= 1) {
                GameState.addCoins("ditcoin", -1);
                GameState.addCoins("ficha", 1);
                this.coinBar._refreshDisplay();
                this.showFeedbackTrue("Compra realizada!");
            } else {
                this.showFeedbackFalse("Saldo Insuficiente");
            }
        });

        this.cardBackground4.on("pointerdown", () => {
            if (GameState.getCoins("ditcoin") >= 5) {
                GameState.addCoins("ditcoin", -5);
                GameState.addCoins("ficha", 1);
                this.coinBar._refreshDisplay();
                this.showFeedbackTrue("Compra realizada!");
            } else {
                this.showFeedbackFalse("Saldo Insuficiente");
            }
        });
    } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            window.lastScene = "CassinoPC";
            this.scene.start("Cassino");
        }
    }
}