export default class Map extends Phaser.Scene {

    constructor() {
        super("Map");
        this.returnTo = null;
    }

    init(data) {
        this.returnTo = data.returnTo; 
        console.log("Cena que chamou o mapa:", this.returnTo);
    }

    preload() {
        this.load.image('Mapa', 'assets/images/Map.png'); 
        this.load.image('closeIcon', 'assets/inputs/UI/close/close.png');
    }

    create() { 
        this.scene.bringToTop();

        const width = 1400;
        const height = 800;

        // Background
        this.add.rectangle(0, 0, width, height, 0x000000, 0.5)
            .setOrigin(0);

        const panel = this.add.rectangle(width / 2, height / 2, 1300, 700, 0xAD7E51)

        this.mapImage = this.add.image(700, 400, 'Mapa')

        const closeButton = this.add.image((width / 2) - 650 + 20, (height / 2) - 350 + 20, 'closeIcon')
        .setOrigin(0, 0)
        .setScale(2.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { 
            this.returnToGame();
        }); 

    this.input.keyboard.on('keydown-M', () => {
        this.returnToGame();
     });
    } 

    returnToGame() {
        if (this.returnTo) {
            this.scene.resume(this.returnTo);
            this.scene.stop();
        }
    }

    update() {    
    }
}
