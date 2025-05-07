import Wallet from "./walletState.js";

export default class CoinBar {
    constructor(scene, x, y) {
        this.scene = scene;

        const style = {
            fontSize: "14px",
            fill: "#FFFFFF",
        };

        this.delfirIcon = scene.add.image(170, 10, "delfir").setDisplaySize(16, 16).setOrigin(0.5);
        this.delfirText = scene.add.text(185, 0, Wallet.get("delfir"), style).setOrigin(0, 0.5);

        this.ditcoinIcon = scene.add.image(250, 0, "ditcoin").setDisplaySize(16, 16).setOrigin(0.5);
        this.ditcoinText = scene.add.text(265, 0, Wallet.get("ditcoin"), style).setOrigin(0.5);

        this.fichaIcon = scene.add.image(320, 0, "ficha").setDisplaySize(16, 16).setOrigin(0.5);
        this.fichaText = scene.add.text(335, 0, Wallet.get("ficha"), style).setOrigin(0.5);

        this.background = scene.add.rectangle(150, 15, 210, 30, 0x303030)
            .setOrigin(0, 0.5);

        this.container = scene.add.container(x, y, [
            this.background,
            this.delfirIcon, this.delfirText,
            this.ditcoinIcon, this.ditcoinText,
            this.fichaIcon, this.fichaText
        ])
        .setDepth(999);

        this.delfirIcon.y = this.delfirText.y =
        this.ditcoinIcon.y = this.ditcoinText.y =
        this.fichaIcon.y = this.fichaText.y = 15;

        this._refreshDisplay();
    }

    updateCoins(type, amount) {
        Wallet.set(type, amount);
        this._refreshDisplay();
    }

    addCoins(type, amount) {
        Wallet.add(type, amount);
        this._refreshDisplay();
    }

    getCoins(type) {
        return Wallet.get(type);
    }

    _refreshDisplay() {
        this.delfirText.setText(Wallet.get("delfir"));
        this.ditcoinText.setText(Wallet.get("ditcoin"));
        this.fichaText.setText(Wallet.get("ficha"));
    }

    setPosition(x, y) {
        this.container.setPosition(x, y);
    }
}
