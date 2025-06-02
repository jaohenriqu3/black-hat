import CoreBar from "../../components/coreBar/coreBar.js"; 
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js";

export default class BlackLock extends Phaser.Scene {

    constructor() {
        super("BlackLock");
    }

    preload() {
        this.load.image("blackLock", "assets/screens/blackLock.png"); 

        this.load.image("lock", "assets/inputs/UI/icons/lock.png");

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {
      this.popupOpen = false;

       this.coreBar = new CoreBar(this, 1220, 15);
       this.coreBar.container.setScale(3.0)

       this.coinBar = new CoinBar(this, 980, 60);
       this.coinBar.container.setScale(1.1)

       this.add.image(700, 450 ,"blackLock").setScale(1.3);

    //   this.preesE = this.add.text(270, 15, "Pressione E para sair do dispositivo móvel",
    //  { fontSize: "22px", fill: "#FFFFFF", fontFamily: 'monospace',}).setOrigin(0.5);

      this.Background = this.add.rectangle(699, 437, 280, 365, 0x00000).setOrigin(0.5);  

      this.ipText = this.add.text(600, 270, "BN_LOCKED: 50.83.46.247", 
      { fill: "#5BE402", fontFamily: 'monospace', fontSize: "16px"});

      this.titleText = this.add.text(615, 480, "Quebrar criptografia", 
      { fill: "#5BE402", fontFamily: 'monospace', fontSize: "16px"}).setVisible(true);

      this.lockIcon = this.add.image(700, 420, "lock").setScale(0.4).setInteractive().setVisible(true); 

      this.lockIcon.on("pointerdown", () => {
        if (!this.popupOpen) {
            this.openPuzzle();
        }
      });
    }

    openPuzzle(){
    this.puzzleBackground = this.add.rectangle(699, 437, 280, 365, 0x00000).setOrigin(0.5);
 
    const targetKey = "1101";
    this.add.text(640, 270, `Chave: ${targetKey}`, {
        fill: "#5BE402", fontFamily: 'monospace', fontSize: "20px"
    }).setDepth(11); 

    this.bitBlocks = ["0010", "0111"];
    this.bitTexts = [];

    this.bitBlocks.forEach((bits, index) => {
        const text = this.add.text(665, 310 + index * 40, bits, {
            fill: "#FFFFFF", fontFamily: 'monospace', fontSize: "20px", backgroundColor: "#000"
        }).setPadding(10).setDepth(11);
        this.bitTexts.push(text);
    });

    this.resultText = this.add.text(630, 400, "Resultado: ----", {
        fill: "#FFD700", fontFamily: 'monospace', fontSize: "18px"
    }).setDepth(11);

    const operations = ["AND", "OR", "XOR", "NOT"];
    operations.forEach((op, i) => {
        const btn = this.add.text(590 + (i * 60), 450, op, {
            fill: "#000", fontFamily: 'monospace', fontSize: "16px",
            backgroundColor: "#5BE402", padding: { x: 10, y: 5 }
        }).setInteractive().setDepth(11);

        btn.on("pointerdown", () => {
            this.applyOperation(op, targetKey);
        });
    });

  //   const closeBtn = this.add.text(825, 275, "X", {
  //         fontSize: "24px",
  //         fontFamily: "monospace",
  //         color: "#5BE402",
  //     }).setOrigin(0.5).setInteractive();
  //     closeBtn.on("pointerdown", () => {
  //         this.closePuzzle();
  //     });
   }

  applyOperation(op, targetKey) {
    let [a, b] = this.bitBlocks;
    let result = "";

    switch (op) {
        case "AND":
            for (let i = 0; i < 4; i++) result += a[i] & b[i];
            break;
        case "OR":
            for (let i = 0; i < 4; i++) result += a[i] | b[i];
            break;
        case "XOR":
            for (let i = 0; i < 4; i++) result += a[i] ^ b[i];
            break;
        case "NOT":
            for (let i = 0; i < 4; i++) result += a[i] === "1" ? "0" : "1";
            break;
    }

    this.resultText.setText("Resultado: " + result);

    
    if (result === targetKey) {

       this.true = this.add.text(620, 520, "Porta Desbloqueada", {
            fill: "#00FF00", fontFamily: 'monospace', fontSize: "18px"
        }).setDepth(11).setVisible(true);

        this.nextBtn = this.add.text(700, 570, "Abrir", {
              fontSize: "18px",
              fontFamily: "monospace",
              backgroundColor: "#5BE402",
              color: "#000000",
              padding: { x: 10, y: 5 },
              }).setOrigin(0.5).setInteractive().setVisible(true);

              this.nextBtn.on("pointerdown", () => {
                this.cameras.main.fadeOut(3000, 0, 0, 0); 
                this.cameras.main.once("camerafadeoutcomplete", () => {
                    this.scene.start("BlackOffice");
                });
            });

    } else   { 
       this.coreBar.loseCore(); 

       if (this.coreBar.getCoreCount() <= 0) {
                  window.lastScene = 'BlackLock'
                  this.scene.start("Chapter1GameOver"); 
        }

       this.false =  this.add.text(640, 520, "Acesso Negado", {
            fill: "#E40202", fontFamily: 'monospace', fontSize: "18px"
        }).setDepth(11).setVisible(true);
    }
}

    showBlackOffice(){

    }

    update() {
    }
}