export default class DantePC extends Phaser.Scene { 

    constructor() {
        super("DantePC");
    }

    preload() {
        this.load.image("dantePC", "assets/screens/dantePC.png"); 
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    create() {
      this.add.image(700, 450 ,"dantePC");
    } 

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.eKey)) {
            this.scene.start("Lobby");
        }
    }
}