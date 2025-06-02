import CoreBar from "../../components/coreBar/coreBar.js"; 
import CoinBar from "../../components/coinBar/coinBar.js"; 

import GameState from "../../state/gameState.js";

export default class DanteCell extends Phaser.Scene {

    constructor() {
        super("DanteCell");
    }

    preload() {
        this.load.image("danteCell", "assets/screens/danteCell.jpeg"); 

        this.load.image("criptografia", "assets/inputs/UI/icons/criptografia.png"); 
        this.load.image("file", "assets/inputs/UI/icons/file.png"); 

        this.load.image("nexus", "assets/images/nexus.jpeg"); 

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

      this.add.image(700, 450 ,"danteCell").setScale(1.5);

    //   this.preesE = this.add.text(270, 15, "Pressione E para sair do dispositivo móvel",
    //  { fontSize: "22px", fill: "#FFFFFF", fontFamily: 'monospace',}).setOrigin(0.5);

      this.Background = this.add.rectangle(720, 340, 230, 360, 0x00000).setOrigin(0.5);  

      this.ipText = this.add.text(610, 170, "IP do hacker: 111.96.78.213", 
      { fill: "#5BE402", fontFamily: 'monospace', fontSize: "14px"});

      this.titleText = this.add.text(632, 270, "Quebrar criptografia", 
      { fill: "#5BE402", fontFamily: 'monospace', fontSize: "16px"}).setVisible(true);

      this.criptoIcon = this.add.image(720, 350, "criptografia").setScale(0.18).setInteractive().setVisible(true); 

      this.criptoIcon.on("pointerdown", () => {
        if (!this.popupOpen) {
            this.openPuzzle();
        }
      });
    }

    showGameOver() {

    }

    openPuzzle(){
    this.popupOpen = true;

    if (this.popupOpen = true) {
      this.titleText.setVisible(false);
      this.criptoIcon.setVisible(false);
    }

    this.puzzleContainer = this.add.container(720, 280); 

    const bg = this.add.rectangle(0, 0, 220, 120, 0x111111, 0.9).setStrokeStyle(2, 0x5BE402);
    this.puzzleContainer.add(bg);

    this.currentSequence = [0, 1, 0, 1]; 

    this.binaryTexts = [];

      for (let i = 0; i < 4; i++) {
          const text = this.add.text(-75 + i * 50, -20, this.currentSequence[i], {
              fontSize: '40px',
              fontFamily: 'monospace',
              color: '#5BE402',
          }).setOrigin(0.5).setInteractive();

          text.on('pointerdown', () => {
              this.currentSequence[i] = this.currentSequence[i] === 0 ? 1 : 0;
              text.setText(this.currentSequence[i]);
          });

          this.puzzleContainer.add(text);
          this.binaryTexts.push(text);
      }

      const verifyBtn = this.add.text(0, 40, "Verificar", {
          fontSize: "18px",
          fontFamily: "monospace",
          backgroundColor: "#5BE402",
          color: "#000000",
          padding: { x: 10, y: 5 },
      }).setOrigin(0.5).setInteractive();

      this.puzzleContainer.add(verifyBtn);

      this.puzzleMessage = this.add.text(0, 120, "", {
          fontSize: "18px",
          fontFamily: "monospace",
          color: "#FF0000",
      }).setOrigin(0.5);
      this.puzzleContainer.add(this.puzzleMessage); 

      verifyBtn.on("pointerdown", () => {
          const isCorrect = this.currentSequence.join("") === "0110";
          if (isCorrect) {
              this.puzzleMessage.setColor("#5BE402");
              this.puzzleMessage.setText("Criptografia rompida.\n\nArquivos liberados:\nnexus_grid.dat\nproject_DarkNest.log");

              this.nextBtn = this.add.text(715, 480, "Next", {
              fontSize: "18px",
              fontFamily: "monospace",
              backgroundColor: "#5BE402",
              color: "#000000",
              padding: { x: 10, y: 5 },
              }).setOrigin(0.5).setInteractive().setVisible(true);

              this.nextBtn.on("pointerdown", () => {
                  this.closePuzzle();
                  this.titleText.setVisible(false);
                  this.criptoIcon.setVisible(false); 
                  this.openFileScreen();
              });
              } else {
              this.coreBar.loseCore();
              if (this.coreBar.getCoreCount() <= 0) {
                  window.lastScene = 'DanteCell'
                  this.scene.start("Chapter1GameOver"); 
              } else {
                  this.puzzleMessage.setColor("#FF0000");
                  this.puzzleMessage.setText("Hackeamento falho");
                  this.nextBtn.setVisible(false)
              }
          }
      });

      const closeBtn = this.add.text(100, -50, "X", {
          fontSize: "18px",
          fontFamily: "monospace",
          color: "#5BE402",
      }).setOrigin(0.5).setInteractive();
      closeBtn.on("pointerdown", () => {
          this.closePuzzle();
      });
      this.puzzleContainer.add(closeBtn);
    }

    closePuzzle() { 
      if (this.puzzleContainer) {
        this.puzzleContainer.destroy();
        this.popupOpen = false;
        this.titleText.setVisible(true);
        this.criptoIcon.setVisible(true); 
        this.nextBtn.setVisible(false)
      }
    }

    openFileScreen(){ 
      this.BackgroundFiles = this.add.rectangle(720, 340, 230, 360, 0x00000).setOrigin(0.5);  

      this.file1 = this.add.image(720, 250, "file").setScale(0.18).setInteractive().setVisible(true); 
      this.file1Text = this.add.text(650, 290, "nexus_grid.dat", 
      { fill: "#5BE402", fontFamily: 'monospace', fontSize: "18px"}).setVisible(true); 
      
      this.file2 = this.add.image(720, 380, "file").setScale(0.18).setInteractive().setVisible(true);
      this.file2Text = this.add.text(625, 420, "project-DarkNest.log", 
      { fill: "#5BE402", fontFamily: 'monospace', fontSize: "18px"}).setVisible(true);

      this.file1.on("pointerdown", () => {
                  this.file1.setVisible(false)
                  this.file1Text.setVisible(false)
                  this.file2.setVisible(false)
                  this.file2Text.setVisible(false)
                  this.openNexusGrid();
                  });

        this.file2.on("pointerdown", () => {
                  this.file1.setVisible(false)
                  this.file1Text.setVisible(false)
                  this.file2.setVisible(false)
                  this.file2Text.setVisible(false)
                  this.openProjectDarkNest();
                  });
                  
    }

    openNexusGrid(){
      this.BackgroundFiles = this.add.rectangle(720, 340, 230, 360, 0x00000).setOrigin(0.5);  
      this.nexus = this.add.image(720, 340, "nexus").setScale(0.2).setInteractive().setVisible(true); 

      this.closeBtn = this.add.text(820, 180, "X", {
          fontSize: "28px",
          fontFamily: "monospace",
          color: "#5BE402",
      }).setOrigin(0.5).setInteractive();
      this.closeBtn.on("pointerdown", () => { 
          this.nexus.setVisible(false)
          this.openFileScreen()
      });
    }

    openProjectDarkNest(){
        this.BackgroundFiles = this.add.rectangle(720, 340, 230, 360, 0x00000).setOrigin(0.5);  

        this.darkProject = this.add.text(615, 290, "Preparar envio de 10 milhões \npara [ID_REF: RAVEN_NEST].\nData do evento confirmada.\nExecutar operação (fase final)", 
        { fill: "#5BE402", fontFamily: 'monospace', fontSize: "13px"}).setVisible(true);

        this.closeBtn = this.add.text(820, 180, "X", {
          fontSize: "28px",
          fontFamily: "monospace",
          color: "#5BE402",
        }).setOrigin(0.5).setInteractive();
        this.closeBtn.on("pointerdown", () => { 
            this.darkProject.setVisible(false)
            this.openFileScreen()
        });

        this.nextBtn = this.add.text(715, 480, "Next", {
              fontSize: "18px",
              fontFamily: "monospace",
              backgroundColor: "#5BE402",
              color: "#000000",
              padding: { x: 10, y: 5 },
              }).setOrigin(0.5).setInteractive().setVisible(true);

              this.nextBtn.on("pointerdown", () => {

                this.cameras.main.fadeOut(3000, 0, 0, 0); 

                this.cameras.main.once("camerafadeoutcomplete", () => {
                    this.darkProject.setVisible(false) 
                    window.lastScene = "DanteCell";
                    this.scene.start("Chapter3Nexus"); 
                });
              });
            } 

    update() {
    }
}