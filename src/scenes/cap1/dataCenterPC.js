import CoinBar from "../../components/coinBar/coinBar.js";
import CoreBar from "../../components/coreBar/coreBar.js"; 

import GameState from "../../state/gameState.js";
import systemMessage from "../../components/systemMessage/systemMessage.js";

export default class DataCenterPC extends Phaser.Scene {

    constructor() {
        super("DataCenterPC");
    }

    preload() {
        this.load.image("dataPC", "assets/screens/puzzlePC.png");

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.load.image("data", "assets/inputs/UI/icons/data.png") 

        this.load.audio('datacenter', 'assets/audios/dataCenter/dataCenter.mp3'); 

        this.load.image("vertical50", "assets/inputs/UI/hack/puzzle/vertical50.png")
        this.load.image("vertical", "assets/inputs/UI/hack/puzzle/vertical.png")
        this.load.image("vertical-angular-left", "assets/inputs/UI/hack/puzzle/vertical-angular-left.png")
        this.load.image("vertical-angular-top", "assets/inputs/UI/hack/puzzle/vertical-angular-top.png")
        this.load.image("vertical-angular-right", "assets/inputs/UI/hack/puzzle/vertical-angular-right.png")
        this.load.image("vertical-angular-down", "assets/inputs/UI/hack/puzzle/vertical-angular-down.png")
        this.load.image("vertical50-left", "assets/inputs/UI/hack/puzzle/vertical50-left.png")

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {

      this.coreBar = new CoreBar(this, 1220, 15);
      this.coreBar.container.setScale(3.0)

      this.coinBar = new CoinBar(this, 980, 50);
      this.coinBar.container.setScale(1.1)

       this.dataCenterSound = this.sound.add('datacenter', {
            loop: true,
            volume: 1.0, 
        }); 

      this.dataCenterSound.play()

      this.add.image(700, 460 ,"dataPC");

      //this.screenZone= this.add.rectangle(625, 280, 570, 350, 0xFFFFFF).setOrigin(0.5).setInteractive(); 

      this.dataBackground= this.add.rectangle(625, 280, 380, 280, 0xD0D0D0).setOrigin(0.5).setInteractive(); 

      this.add.image(630, 250, "data").setScale(0.3)

      this.dataText = this.add.text(560, 360, "Base de dados", {fontSize: "20px", fill: "#00000", fontFamily: 'monospace'})

      this.preesE = this.add.text(200, 15, "Pressione E para sair do computador",
     { fontSize: "20px", fill: "#00000", fontFamily: 'monospace',}).setOrigin(0.5); 

     this.dataBackground.on("pointerdown", () => {
        if (!this.popupOpen) {
            this.openPuzzle();
        }
    });
      const chapter = GameState.getChapter();
    } 

    openPuzzle() {
        this.popupOpen = true;

        this.puzzlePopup = this.add.rectangle(625, 280, 570, 350, 0x4B3559).setDepth(10);

        this.closePuzzleButton = this.add.text(872, 105, "X", {
            fontSize: "32px",
            fill: "#ffffff",
            fontFamily: "monospace",
            backgroundColor: "#ff0000",
            padding: { x: 10, y: 5 }
        }).setInteractive().setDepth(11).on("pointerdown", () => {
            this.closePuzzle();
        });

        const gridTiles = [
            ["vertical50", "vertical", "vertical-angular-left"],
            ["vertical-angular-top", "vertical", "vertical-angular-right"],
            ["vertical-angular-down", "vertical", "vertical50-left"]
        ];

        const expectedRotations = [
            [0, 0, 0],
            [2, 0, 2],
            [0, 0, 0]
        ];

        const gridSize = 3;
        const cellSize = 90;
        const offsetX = 545;
        const offsetY = 160;
        this.puzzlePieces = [];

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = offsetX + col * cellSize;
                const y = offsetY + row * cellSize;

                const texture = gridTiles[row][col];
                const correctRotation = expectedRotations[row][col];

                const piece = this.add.image(x, y, texture).setDepth(11).setInteractive().setScale(2.0);
                piece.rotationState = 0;
                piece.setAngle(0);
                piece.correctRotation = correctRotation;
                piece.textureKey = texture;

                piece.on("pointerdown", () => {
                    piece.rotationState = (piece.rotationState + 1) % 4;
                    piece.setAngle(piece.rotationState * 90);
                });
                this.puzzlePieces.push(piece);
            }
        }

        this.puzzleLabel = this.add.text(445, 115, "Conecte os circuitos", {
            fontSize: "18px",
            fill: "#FFFFFF",
            fontFamily: "monospace"
        }).setOrigin(0.5).setDepth(11);

        this.checkButton = this.add.text(635, 420, "Verificar", {
            fontSize: "24px",
            fill: "#FFFFFF",
            fontFamily: "monospace",
            backgroundColor: "#00AA00",
            padding: { x: 12, y: 6 }
        }).setOrigin(0.5).setInteractive().setDepth(11);

        this.checkButton.on("pointerdown", () => {
            const allCorrect = this.puzzlePieces.every((piece, index) => {
                const row = Math.floor(index / gridSize);
                const col = index % gridSize;
                const expected = expectedRotations[row][col];

                if (col === 1 && expected === 0) {
                    return piece.rotationState === 0 || piece.rotationState === 2;
                }

                return piece.rotationState === expected;
            });

            if (this.feedbackText) {
                this.feedbackText.destroy();
            }

            if (allCorrect) { 
                this.feedbackText = this.add.text(635, 390, "Hackeamento bem sucedido", {
                    fontSize: "18px",
                    fill: "#00ff00",
                    fontFamily: "monospace"
                }).setOrigin(0.5).setDepth(12); 
                this.showMessageScreen(); 
                this.closePuzzle();

            } else {
                this.feedbackText = this.add.text(635, 390, "Hackeamento falho", {
                    fontSize: "18px",
                    fill: "#ff0000",
                    fontFamily: "monospace"
                }).setOrigin(0.5).setDepth(12);
                this.coreBar.loseCore();
    
            if (this.coreBar.getCoreCount() <= 0) { 
                this.showGameOver(); 
                this.closePuzzle();
                }
            }
        });
    }

    showMessageScreen(){
        this.backgroundMessage= this.add.rectangle(620, 280, 580, 350, 0x000000).setOrigin(0.5).setInteractive(); 

        this.text1 = this.add.text(350, 150, "VICTOR: Os dados obtidos são valiosos.",
            { fill: "#5BE402", fontFamily: 'monospace',});
        this.text2 = this.add.text(350, 170,"Com eles, podemos manipular mercados, decisões políticas...",
            { fill: "#5BE402", fontFamily: 'monospace',});
        this.text3 = this.add.text(350, 190,"VICTOR: Se alguem descobrir, vamos jogar a culpa nos hackers.",
            { fill: "#5BE402", fontFamily: 'monospace',});

        this.text4 = this.add.text(350, 230,"DIANA: Protocolos confirmados.",
            { fill: "#5BE402", fontFamily: 'monospace',});
        this.text5 = this.add.text(350, 250,"DIANA: Expansão da influência em andamento...",
            { fill: "#5BE402", fontFamily: 'monospace',}); 
        this.text6 = this.add.text(350, 270,"DIANA: Probabilidade de exposição: 1,47%",
            { fill: "#5BE402", fontFamily: 'monospace',}); 

        this.text7 = this.add.text(350, 310,"?3$%@: Vocês pensam que controlam tudo.",
            { fill: "#5BE402", fontFamily: 'monospace', fontSize: "18px"}); 
        this.text8 = this.add.text(350, 330,"?3$%@: Nós já estamos aqui dentro",
            { fill: "#5BE402", fontFamily: 'monospace', fontSize: "18px"});
        this.text9 = this.add.text(350, 350,"?3$%@: O colapso começa agora!",
            { fill: "#5BE402", fontFamily: 'monospace', fontSize: "18px"}); 

        this.nextButton = this.add.rectangle(830, 420, 120, 40, 0x5BE402).setOrigin(0.5);

        this.textButton = this.add.text(795, 400, "Next",
        { fill: "#000000", fontFamily: 'monospace', fontSize: "32px"} )

        this.nextButton.setInteractive().on("pointerdown", () => { 
            this.dataCenterSound.stop()
            this.showCorvusAttack();
            });
        }

    showGameOver() {
         this.cameras.main.fadeOut(3000, 0, 0, 0); 
         this.dataCenterSound.stop()

         this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("Chapter1GameOver");
        });
    }

    showCorvusAttack(){ 
        this.cameras.main.fadeOut(3000, 0, 0, 0); 
         this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("Chapter1Corvus");
        });
    }

    closePuzzle() {
        this.popupOpen = false;

        this.puzzlePopup.destroy();
        this.closePuzzleButton.destroy();
        this.puzzlePieces.forEach(piece => piece.destroy());

        if (this.checkButton) {
            this.checkButton.destroy();
            this.checkButton = null;
        }

        if (this.feedbackText) {
            this.feedbackText.destroy();
            this.feedbackText = null;
        }
        if (this.puzzleLabel){
            this.puzzleLabel.destroy();
            this.puzzleLabel = null;
        }
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            window.lastScene = "DataCenterPC";
            this.scene.start("DataCenter");
        }
    }
}