const GameState = {
    data: {
        chapter: 0,
        currentScene: "Lobby",
        core: 10,
        maxCore: 10,
        coins: {
            delfir: 800,
            ditcoin: 0,
            ficha: 0
        },
        inventory: []
    },

    // ==== Capítulo & Progresso ====

    setChapter(chapter) {
        this.data.chapter = chapter;
        this.save();
    },

    getChapter() {
        return this.data.chapter;
    },

    // ==== Cena Atual ====

    setScene(sceneKey) {
        this.data.currentScene = sceneKey;
        this.save();
    },

    getScene() {
        return this.data.currentScene;
    },

    // ==== Core (Energia Hacker) ====

    setCore(value) {
        this.data.core = Phaser.Math.Clamp(value, 0, this.data.maxCore);
        this.save();
    },

    modifyCore(amount) {
        this.setCore(this.data.core + amount);
    },

    resetCore() {
        this.setCore(this.data.maxCore);
    }, 

    loseCore() {
        if (this.data.core > 0) {
            this.data.core--;
            this.save();
        }
    },
    

    getCore() {
        return this.data.core;
    },

    getMaxCore() {
        return this.data.maxCore;
    },

    // ==== Moedas ====

    addCoins(type, amount) {
        if (this.data.coins[type] !== undefined) {
            this.data.coins[type] += amount;
            this.save();
        }
    },

    setCoins(type, value) {
        if (this.data.coins[type] !== undefined) {
            this.data.coins[type] = value;
            this.save();
        }
    },

    getCoins(type) {
        return this.data.coins[type] || 0;
    },

    resetCoins() {
        this.data.coins = {
            delfir: 800,
            ditcoin: 0,
            ficha: 0
        };
        this.save();
    },

    // ==== Inventário ====

    addItem(item) {
        this.data.inventory.push(item);
        this.save();
    },

    removeItem(item) {
        const index = this.data.inventory.indexOf(item);
        if (index > -1) {
            this.data.inventory.splice(index, 1);
            this.save();
        }
    },

    getInventory() {
        return [...this.data.inventory]; // retorna cópia
    },

    clearInventory() {
        this.data.inventory = [];
        this.save();
    },

    // ==== Save / Load ====

    save() {
        localStorage.setItem("blackHatSave", JSON.stringify(this.data));
    },

    load() {
        const saved = localStorage.getItem("blackHatSave");
        if (saved) {
            this.data = JSON.parse(saved);
        }
    },

    resetAll() {
        this.data = {
            chapter: 0,
            currentScene: "Lobby",
            core: 10,
            maxCore: 10,
            coins: {
                delfir: 800,
                ditcoin: 0,
                ficha: 0
            },
            inventory: []
        };
        this.save();
    }
};

export default GameState;
