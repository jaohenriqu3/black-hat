import GameState from "../../state/gameState.js";

export default class CoreBar {
    constructor(scene, x, y, maxCores = 10) {
        this.scene = scene;
        this.maxCores = maxCores;
        this.margin = 10;

        // estado global
        this.currentCores = GameState.getCore();

        this.container = scene.add.container(x, y).setDepth(1000);
        const barWidth = 50;
        const barHeight = 10;
        const background = scene.add.rectangle(0, 0, barWidth, barHeight, 0x222222)
            .setOrigin(0, 0)
            .setStrokeStyle(1.5, 0x988774);
        this.container.add(background);

        this.coreRects = [];
        const coreWidth = (barWidth - (maxCores + 1) * 2) / maxCores;
        const coreHeight = barHeight - 4;
        for (let i = 0; i < maxCores; i++) {
            const rect = scene.add.rectangle(2 + i * (coreWidth + 2), 2, coreWidth, coreHeight, 0x1ec988)
                .setOrigin(0, 0);
            this.container.add(rect);
            this.coreRects.push(rect);
        }

        this._refreshDisplay();
    }

    _refreshDisplay() {
        const currentCores = GameState.getCore();

        for (let i = 0; i < this.maxCores; i++) {
            this.coreRects[i].setFillStyle(i < currentCores ? 0x1EC988 : 0x222222);
        }
    }

    
    setPosition(x, y) {
        this.container.setPosition(x, y);
    }

    loseCore() {
        GameState.loseCore();
        this._refreshDisplay();
    }

    resetCores() {
        GameState.setCore(this.maxCores);
        this._refreshDisplay();
    }
}
