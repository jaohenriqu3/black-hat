import GameState from "../../state/gameState.js";

export default class CoinBar {
    constructor(scene, x, y) {
        this.scene = scene;

        const style = {
            fontSize: "14px",
            fill: "#FFFFFF",
        };

        this.delfirIcon = scene.add.image(170, 15, "delfir").setDisplaySize(16, 16).setOrigin(0.5);
        this.delfirText = scene.add.text(185, 15, GameState.getCoins("delfir"), style).setOrigin(0, 0.5);

        this.ditcoinIcon = scene.add.image(250, 15, "ditcoin").setDisplaySize(16, 16).setOrigin(0.5);
        this.ditcoinText = scene.add.text(270, 15, GameState.getCoins("ditcoin"), style).setOrigin(0.5);

        this.fichaIcon = scene.add.image(320, 15, "ficha").setDisplaySize(16, 16).setOrigin(0.5);
        this.fichaText = scene.add.text(335, 15, GameState.getCoins("ficha"), style).setOrigin(0.5);

        this.background = scene.add.rectangle(150, 15, 210, 30, 0x303030).setOrigin(0, 0.5);

        this.container = scene.add.container(x, y, [
            this.background,
            this.delfirIcon, this.delfirText,
            this.ditcoinIcon, this.ditcoinText,
            this.fichaIcon, this.fichaText
        ]).setDepth(999); 


        this._refreshDisplay();
    } 

    setPosition(x, y) {
        this.container.setPosition(x, y);
    }

    setVisible(value) {
        this.container.setVisible(value);
    }

    updateCoins(type, amount) {
        GameState.setCoin(type, amount);
        this._refreshDisplay();
    }

    addCoins(type, amount) {
        GameState.addCoin(type, amount);
        this._refreshDisplay();
    }

    getCoins(type) {
        return GameState.getCoins(type);
    }

    _refreshDisplay() {
        this.delfirText.setText(GameState.getCoins("delfir"));
        this.ditcoinText.setText(GameState.getCoins("ditcoin"));
        this.fichaText.setText(GameState.getCoins("ficha"));
    }
}
