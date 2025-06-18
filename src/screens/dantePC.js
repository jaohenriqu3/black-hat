import CoreBar from "../components/coreBar/coreBar.js";
import CoinBar from "../components/coinBar/coinBar.js";

import GameState from "../state/gameState.js";
import systemMessage from "../components/systemMessage/systemMessage.js"; 

export default class DantePC extends Phaser.Scene {

    constructor() {
        super("DantePC");
    }

    preload() {
        this.load.image("dantePC", "assets/screens/dantePC.png");
        this.load.image("shop", "assets/inputs/UI/shop/cart.png");
        this.load.image("shop-black", "assets/inputs/UI/shop/cart-black.png");

        this.load.image("core-bar-icon", "assets/coreBar/coreBar.png")

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png"); 
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");
        this.load.image("news", "assets/inputs/UI/icons/news.jpg")

        this.load.image("big-delfir", "assets/inputs/UI/shop/big-delfir.png") 
        this.load.image("big-ditcoin", "assets/inputs/UI/shop/big-ditcoin.png")
        
        this.load.image("arrow", "assets/inputs/UI/arrow/arrow.png");

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

      this.description3 = this.add.text(410, 315, "Slots e golpes",
      { fontSize: "16px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5);

      this.textBackground4 = this.add.rectangle(500, 380, 330, 60, 0xFFFFFF).setOrigin(0.5);
      this.textBackground4.setAlpha(0.8);

      this.title4 = this.add.text(410, 370, "Capítulo 4",
      { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5);

      this.description4 = this.add.text(470, 395, "Projeto Nexus e Node Central",
      { fontSize: "16px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5);

     const chapter = GameState.getChapter();

    // Capítulo 1 
    this.textBackground.setInteractive().on("pointerdown", () => {
    this.startChapter(1);
    });

    // Capítulo 2
    if (chapter >= 2) {
    this.textBackground2.setInteractive().on("pointerdown", () => {
        this.startChapter(2);
    });
    } else {
    this.textBackground2.setFillStyle(0xaaaaaa); 
    this.title2.setText("???");
    this.description2.setVisible(false)
    }

    // Capítulo 3
    if (chapter >= 3) {
    this.textBackground3.setInteractive().on("pointerdown", () => {
        this.startChapter(3);
    });
    } else {
    this.textBackground3.setFillStyle(0xaaaaaa);
    this.title3.setText("???"); 
    this.description3.setVisible(false)
    }

    // Capítulo 4
    if (chapter >= 4) {
    this.textBackground4.setInteractive().on("pointerdown", () => {
        this.startChapter(4);
    });
    } else {
    this.textBackground4.setFillStyle(0xaaaaaa);
    this.title4.setText("???"); 
    this.description4.setVisible(false)
    }

      this.shopBackground = this.add.rectangle(815, 190, 250, 150, 0xC5C5C5).setOrigin(0.5).setInteractive();
      this.add.image(810, 170, "shop-black").setScale();
      this.shopText = this.add.text(815, 230, "Shop",
      { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5);

      this.arrowPointer = this.add.image(0, 0, 'arrow').setVisible(false).setDepth(1002);
      this.arrowPointer.setScale(4.0);
      this.arrowPointer.setAngle(75);

      // Shop
      this.shopBackground.on("pointerdown", () => {
        if (!this.popupOpen) {
            this.openShop();
            }
        });

      this.newsBackground = this.add.rectangle(815, 350, 250, 150, 0xC5C5C5).setOrigin(0.5).setInteractive();
      this.add.image(815, 340, "news").setScale(0.25);
      this.newsText = this.add.text(815, 400, "News",
      { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5);

      this.newsBackground.on("pointerdown", () => {
        if (!this.popupOpen) {
            window.open('https://joaos-organization-54.gitbook.io/black-hat', '_blank');
            }
        });

        console.log("Chapter:" [chapter])
        
    }

    startChapter(chapterNumber) {
        if (this.popupOpen) return; 

        window.lastScene = 'DantePC'

        this.cameras.main.fadeOut(1000, 0, 0, 0);

        this.cameras.main.once("camerafadeoutcomplete", () => {
            GameState.setChapter(chapterNumber);

            this.scene.start(`Chapter${chapterNumber}Cutscene`);
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

        const chapter = GameState.getChapter(); 

        const ditcoinPrices = {
            1: "300 Delfirs",
            2: "1000 Delfirs",
            3: "5000 Delfirs",
            4: "20000 Delfirs", 
            0: "300 Delfirs"
        };

        const shopData = [
            {   name: "Recarregar Core",
                icon: "core-bar-icon",
                price: "R$ 4,90",
                scale: 0.8
            },
            {
                name: "500 Delfirs",
                icon: "big-delfir",
                price: "R$ 4,90 ",
            },
            {
                name: "2000 Delfirs",
                icon: "big-delfir",
                price: "R$ 10,90",
            },
            {
                name: "1 Ditcoin",
                icon: "big-ditcoin",
                price: ditcoinPrices[chapter],
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

                const chapter = GameState.getChapter();
                
                if (itemData.name === "1 Ditcoin") {
                  if (chapter <= 2) {
                    if (!this.noWallet) {
                        this.textInsufficientBackground = this.add.rectangle(x, 370, 380, 20, 0x000000)
                            .setOrigin(0.5)
                            .setDepth(10)
                            .setVisible(true);
                        this.noWallet = this.add.text(x, 370, "Você ainda não tem uma carteira de criptoativos", {
                            fontSize: "14px",
                            fill: "#FFFFFF",
                            fontFamily: "monospace",
                        }).setOrigin(0.5).setDepth(11).setVisible(true);

                        this.time.delayedCall(1500, () => {
                            this.textInsufficientBackground.destroy();
                            this.noWallet.destroy();
                            this.textInsufficientBackground = null;
                            this.noWallet = null;
                        });
                    }
                    return;
                } 

                const ditcoinPriceMap = {
                    2: 1000,
                    3: 5000,
                    4: 20000
                };

                const price = ditcoinPriceMap[chapter];
                const currentDelfirs = GameState.getCoins("delfir");

                if (currentDelfirs >= price) {
                    GameState.addCoins("ditcoin", 1);
                    GameState.addCoins("delfir", -price);
                    this.coinBar._refreshDisplay();
                } else {
                     if (!this.insufficient) {
                    this.textInsufficientBackground = this.add.rectangle(x, 370, 200, 20, 0x000000).setOrigin(0.5).setDepth(10); 
                    this.insufficient = this.add.text(x, 370, "Delfirs insuficientes!", {
                        fontSize: "14px",
                        fill: "#FFFFFF",
                        fontFamily: "monospace",
                    }).setOrigin(0.5).setDepth(11);
            
                    this.time.delayedCall(1500, () => {
                        this.textInsufficientBackground.destroy()
                        this.insufficient.destroy();
                        this.insufficient = null;
                        }); 
                      }
                    } return;
                }

                if (itemData.name === "Recarregar Core") {
                    this.coreBar.resetCores();
                    console.log("Cores recarregadas!");
                    return;
                }

                const delfirMap = {
                    "500 Delfirs": 500,
                    "2000 Delfirs": 2000,
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