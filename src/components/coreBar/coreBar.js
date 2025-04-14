export default class CoreBar {
    constructor(scene, x, y, maxCores = 10) {
        this.scene = scene;
        this.maxCores = maxCores;
        this.currentCores = maxCores;
        this.margin = 10;

        // Container principal
        this.container = scene.add.container(x, y).setDepth(1000);

        // Fundo da barra
        const barWidth = 50;
        const barHeight = 10;
        const background = scene.add.rectangle(0, 0, barWidth, barHeight, 0x222222)
            .setOrigin(0, 0)
            .setStrokeStyle(1.5, 0x988774);
        this.container.add(background);

        // Retângulos dos cores
        this.coreRects = [];
        const coreWidth = (barWidth - (maxCores + 1) * 2) / maxCores;
        const coreHeight = barHeight - 4;
        for (let i = 0; i < maxCores; i++) {
            const rect = scene.add.rectangle(2 + i * (coreWidth + 2), 2, coreWidth, coreHeight, 0x1ec988)
                .setOrigin(0, 0);
            this.container.add(rect);
            this.coreRects.push(rect);
        }
    }

    setPosition(x, y) {
        this.container.setPosition(x, y);
    }

    // Atualiza a quantidade de cores exibidos
    updateCores(newCount) {
        this.currentCores = Phaser.Math.Clamp(newCount, 0, this.maxCores);
        for (let i = 0; i < this.maxCores; i++) {
            this.coreRects[i].setVisible(i < this.currentCores);
        }
    }

    // Reduz um core
    loseCore() {
        if (this.currentCores > 0) {
            this.updateCores(this.currentCores - 1);
        }
    }

    // Restaura todos os cores
    resetCores() {
        this.updateCores(this.maxCores);
    }
}
