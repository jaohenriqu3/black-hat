//import PlayerState from "../state/playerState.js";

import CoreBar from "../components/coreBar/coreBar.js"; 
import CoinBar from "../components/coinBar/coinBar.js";

import GameState from "../state/gameState.js";


export default class DantePC extends Phaser.Scene { 

    constructor() {
        super("DantePC");
    }

    preload() {
        this.load.image("dantePC", "assets/screens/dantePC.png"); 
        this.load.image("shop", "assets/inputs/UI/shop/cart.png"); 
        this.load.image("shop-black", "assets/inputs/UI/shop/cart-black.png");  
        this.load.image("core-bar", "assets/inputs/UI/shop/corebar.png")  

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png"); 
        this.load.image("hack", "assets/inputs/UI/hack/hack-icon.png") 
        this.load.image("big-delfir", "assets/inputs/UI/shop/big-delfir.png") 

        //PUZZLE
        //Fileira 1
        this.load.image("vertical50", "assets/inputs/UI/hack/puzzle/vertical50.png") 
        this.load.image("vertical", "assets/inputs/UI/hack/puzzle/vertical.png")
        this.load.image("vertical-angular-left", "assets/inputs/UI/hack/puzzle/vertical-angular-left.png")

        //Fileira 2
        this.load.image("vertical-angular-top", "assets/inputs/UI/hack/puzzle/vertical-angular-top.png") 
        //vertical.png
        this.load.image("vertical-angular-right", "assets/inputs/UI/hack/puzzle/vertical-angular-right.png")
        
        //Fileira 3
        this.load.image("vertical-angular-down", "assets/inputs/UI/hack/puzzle/vertical-angular-down.png")
        //vertical.png
        this.load.image("vertical50-left", "assets/inputs/UI/hack/puzzle/vertical50-left.png") 
    
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {

      this.popupOpen = false;

      this.coreBar = new CoreBar(this, 1220, 15);
      this.coreBar.container.setScale(3.0)

      this.coinBar = new CoinBar(this, 980, 50); 
      this.coinBar.container.setScale(1.1)

      this.add.image(700, 450 ,"dantePC"); 

      //Screen Pixel
      //this.screenPixel = this.add.rectangle(635, 275, 650, 350, 0x00000).setOrigin(0.5);

      this.preesE = this.add.text(230, 15, "Pressione E para sair do computador", 
     { fontSize: "22px", fill: "#FFFFFF", fontFamily: 'monospace',}).setOrigin(0.5);

      this.textBackground = this.add.rectangle(500, 140, 330, 60, 0xFFFFFF).setOrigin(0.5);
      this.textBackground.setAlpha(0.8);

      this.title = this.add.text(410, 130, "Capítulo 1", 
      { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5);

      this.description = this.add.text(430, 155, "Lançamento de DIANA", 
      { fontSize: "16px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5); 

      this.textBackground2 = this.add.rectangle(500, 220, 330, 60, 0xFFFFFF).setOrigin(0.5);
      this.textBackground2.setAlpha(0.8);

      this.title2 = this.add.text(410, 210, "Capítulo 2", 
      { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5); 

      this.description2 = this.add.text(430, 235, "Economia em colapso", 
      { fontSize: "16px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5); 

      this.textBackground3 = this.add.rectangle(500, 300, 330, 60, 0xFFFFFF).setOrigin(0.5);
      this.textBackground3.setAlpha(0.8); 

      this.title3 = this.add.text(410, 290, "Capítulo 3", 
      { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5); 

      this.textBackground4 = this.add.rectangle(500, 380, 330, 60, 0xFFFFFF).setOrigin(0.5);
      this.textBackground4.setAlpha(0.8); 

      this.title4 = this.add.text(410, 370, "Capítulo 4", 
      { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5); 

      this.shopBackground = this.add.rectangle(815, 190, 250, 150, 0xC5C5C5).setOrigin(0.5).setInteractive(); 
      this.add.image(810, 170, "shop-black").setScale();
      this.shopText = this.add.text(815, 230, "Shop", 
        { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5); 

      // Shop
      this.shopBackground.on("pointerdown", () => {
        if (!this.popupOpen) {
            this.openShop();
            }
        });

      this.puzzleBackground = this.add.rectangle(815, 350, 250, 150, 0xC5C5C5).setOrigin(0.5).setInteractive();

      this.add.image(815, 350, "hack").setScale(0.4); 

      this.puzzleBackground.on("pointerdown", () => {
        if (!this.popupOpen) {
            this.openPuzzle();
        }
        });
} 

    openShop() {
        this.popupOpen = true;

        this.shopPopup = this.add.rectangle(635, 275, 650, 350, 0x9E9AA6).setDepth(10);
    
        this.closeButton = this.add.text(922, 100, "X", {
            fontSize: "32px",
            fill: "#ffffff",
            fontFamily: "monospace",
            backgroundColor: "#ff0000",
            padding: { x: 10, y: 5 }
        }).setInteractive().setDepth(11).on("pointerdown", () => {
            this.closeShop();
        });
    
        const shopData = [
            {name: "Recarregar Core",
                
                icon: "core-bar",
                price: "R$ 4,90",
                scale: 0.8
            },
            {
                name: "500 Delfir",
                icon: "big-delfir",
                price: "R$ 4,90 ",
            },
            {
                name: "2000 Delfir",
                icon: "big-delfir",
                price: "R$ 10,90",
            },
            {
                name: "10000 Delfir",
                icon: "big-delfir",
                price: "R$ 19,90",
            }
        ];
    
        const startX = 430;
        const spacing = 140;
        this.shopItems = [];
    
        shopData.forEach((itemData, i) => {
            const x = startX + i * spacing;
    
            const bg = this.add.rectangle(x, 280, 110, 300, 0xffffff).setDepth(10);
            const icon = this.add.image(x, 230, itemData.icon)
            .setScale(itemData.scale || 1.0)
            .setDepth(11);

        
            const label = this.add.text(x, 310, itemData.name, {
                fontSize: "12px",
                fill: "#000",
                fontFamily: "monospace"
            }).setOrigin(0.5).setDepth(11);
    
            const price = this.add.text(x, 340, itemData.price, {
                fontSize: "14px",
                fill: "#333",
                fontFamily: "monospace"
            }).setOrigin(0.5).setDepth(11);
    
            
            bg.setInteractive();

            bg.on("pointerdown", () => {
                console.log(`Clique em: ${itemData.name}`); 

                if (itemData.name === "Recarregar Core") {
                    this.coreBar.resetCores();
                    console.log("Cores recarregadas!");
                    return;
                }
            
                const delfirMap = {
                    "500 Delfir": 500,
                    "2000 Delfir": 2000,
                    "10000 Delfir": 10000,
                };
            
                if (delfirMap[itemData.name]) {
                    const amount = delfirMap[itemData.name];
    
                    GameState.addCoins("delfir", amount);
                    this.coinBar._refreshDisplay();
            
                    console.log(`Adicionados ${amount} Delfir`) 
            }});
    
            this.shopItems.push(bg, icon, label, price);
        });
    }

    closeShop() {
        this.popupOpen = false;

        this.shopPopup.destroy();
        this.closeButton.destroy();
        this.shopItems.forEach(item => item.destroy()); 
    }

    openPuzzle() {

        this.popupOpen = true;

        this.puzzlePopup = this.add.rectangle(635, 275, 650, 350, 0x4B3559).setDepth(10);
    
        this.closePuzzleButton = this.add.text(922, 100, "X", {
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

        this.puzzleLabel = this.add.text(420, 110, "Conecte os circuitos", { 
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
            } else {
                this.feedbackText = this.add.text(635, 390, "Hackeamento falho", {
                    fontSize: "18px",
                    fill: "#ff0000",
                    fontFamily: "monospace"
                }).setOrigin(0.5).setDepth(12);
                this.coreBar.loseCore();
            }
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
            window.lastScene = "DantePC";
            this.scene.start("Lobby");
        }
    }
}