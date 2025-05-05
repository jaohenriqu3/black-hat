export default class PlayerState {
    static cores = 10;
    static maxCores = 10;

    static coins = {
        delfir: 0,
        ditcoin: 0,
        ficha: 0
    };

    // Atualizar Core
    static setCores(value) {
        this.cores = Phaser.Math.Clamp(value, 0, this.maxCores);
    }

    static loseCore() {
        if (this.cores > 0) {
            this.cores--;
        }
    }

    static resetCores() {
        this.cores = this.maxCores;
    }

    static getCores() {
        return this.cores;
    }

    static getMaxCores() {
        return this.maxCores;
    }

    static addCoin(type, amount) {
        if (this.coins[type] !== undefined) {
            this.coins[type] += amount;
        }
    }

    static getCoins(type) {
        return this.coins[type] || 0;
    }
}
