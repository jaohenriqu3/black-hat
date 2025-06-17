import CoinBar from "../components/coinBar/coinBar.js"; 
import CoreBar from "../components/coreBar/coreBar.js";

import GameState from "../state/gameState.js";

export default class CassinoGame extends Phaser.Scene {

    constructor() {
        super("CassinoGame");
    }

    preload() {
        this.load.image("cassinoGame", "assets/screens/cassinoGame.png");                  

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

      this.coinBar = new CoinBar(this, 980, 55);
      this.coinBar.container.setScale(1.1)

      this.add.image(700, 400 ,"cassinoGame").setScale(1.2);

      this.preesE = this.add.text(175, 15, "Pressione E para sair do jogo",
     { fontSize: "20px", fill: "#FFFFFF", fontFamily: 'monospace',}).setOrigin(0.5); 

     this.gameBackground = this.add.rectangle(700, 360, 500, 350, 0x000000).setOrigin(0.5).setInteractive(); 

     this.gameButton = this.add.rectangle(700, 500, 200, 50, 0x548391).setOrigin(0.5).setInteractive();

     this.gameText = this.add.text(700, 500, "Jogar",
     { fontSize: "36px", fill: "#FFFFFF", fontFamily: 'monospace',}).setOrigin(0.5); 

     this.messageText = this.add.text(710, 210, "", {
        fontSize: "20px",
        fill: "#FFFFFF",
        fontFamily: "monospace",
    }).setOrigin(0.5);

    this.symbols = ["🍒", "🍋", "🔔", "💎"];
    this.slotTexts = [
        this.add.text(600, 360, "", { fontSize: "64px", fill: "#FFFFFF", fontFamily: "monospace" }).setOrigin(0.5),
        this.add.text(700, 360, "", { fontSize: "64px", fill: "#FFFFFF", fontFamily: "monospace" }).setOrigin(0.5),
        this.add.text(800, 360, "", { fontSize: "64px", fill: "#FFFFFF", fontFamily: "monospace" }).setOrigin(0.5),
    ];

    this.gameButton.on("pointerdown", () => {
        const ficha = GameState.getCoins("ficha");

        if (ficha < 1) {
            this.messageText.setText("Fichas insuficientes");
            return;
        }

        GameState.addCoins("ficha", -1); 
        this.coinBar._refreshDisplay();

        const results = this.slotTexts.map(slot => {
            const symbol = Phaser.Utils.Array.GetRandom(this.symbols);
            slot.setText(symbol);
            return symbol;
        });

        if (results[0] === results[1] && results[1] === results[2]) {
            GameState.addCoins("delfir", 100);
            GameState.addCoins("ficha", 5);
            this.messageText.setText("Parabéns voçê ganhou 100 Delfirs + 5 Fichas!"); 
            this.coinBar._refreshDisplay();
        } else {
            this.messageText.setText("Tente novamente!");
        }
    });

    } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            window.lastScene = "CassinoGame";
            this.scene.start("Cassino");
        }
    }
}