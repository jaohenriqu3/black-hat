import CoreBar from "../components/coreBar/coreBar.js";

import CoinBar from "../components/coinBar/coinBar.js";
import Wallet from "../components/coinBar/walletState.js";

export default class DantePC extends Phaser.Scene { 

    constructor() {
        super("DantePC");
    }

    preload() {
        this.load.image("dantePC", "assets/screens/dantePC.png"); 
        this.load.image("shop", "assets/inputs/UI/shop/cart.png"); 
        this.load.image("shop-black", "assets/inputs/UI/shop/cart-black.png");  

        this.load.image("delfir", "assets/inputs/UI/coins/delfir.png");
        this.load.image("ditcoin", "assets/inputs/UI/coins/ditcoin.png");
        this.load.image("ficha", "assets/inputs/UI/coins/ficha.png");

        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {

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

      this.shopBackground = this.add.rectangle(815, 190, 250, 150, 0xC5C5C5).setOrigin(0.5); 
      this.add.image(810, 170, "shop-black").setScale();
      this.shopText = this.add.text(815, 230, "Shop", 
        { fontSize: "24px", fill: "#000000", fontFamily: 'monospace',}).setOrigin(0.5); 

      this.puzzleBackground = this.add.rectangle(815, 350, 250, 150, 0xC5C5C5).setOrigin(0.5);

    } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            window.lastScene = "DantePC";
            this.scene.start("Lobby");
        }
    }
}