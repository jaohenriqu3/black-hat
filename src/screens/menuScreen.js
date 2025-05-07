export default class Menu extends Phaser.Scene {

    constructor() {
        super("Menu");
        this.returnTo = null;
    }

    init(data) {
        this.returnTo = data.returnTo; 
        console.log("Cena que chamou o menu:", this.returnTo);
    }

    preload() {
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

        const closeButton = this.add.image((width / 2) - 650 + 20, (height / 2) - 350 + 20, 'closeIcon')
        .setOrigin(0, 0)
        .setScale(2.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { 
            this.returnToGame();
    }); 

    this.input.keyboard.on('keydown-ESC', () => {
        this.returnToGame();
    });

        // MENU
        const title = this.add.text(width / 2, 150, 'MENU', {
            fontSize: '99px',
            fontFamily: 'Lucida Console',
            color: '#FFFFFF', 
            stroke: '#000000',
            trokeThickness: 6,
            shadow: {
            offsetX: 2,
            offsetY: 2,
            color: '#000000',
            blur: 0,
            fill: true
            }
        }).setOrigin(0.5);


        // Botões
        const buttons = ['Ajustes', 'Controles', 'Sobre Black Hat', 'Sair'];
        const buttonActions = ['Settings', 'Controls', 'About', 'Exit'];

        buttons.forEach((label, index) => {
            const y = 280 + index * 100;

            const button = this.add.rectangle(width / 2, y, 400, 60, 0x6C6C6C, 0.7)
                .setStrokeStyle(3, 0x000000)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => button.setFillStyle(0x4A4A4A, 0.7))
                .on('pointerout', () => button.setFillStyle(0x6C6C6C, 0.7))
                .on('pointerdown', () => this.handleButton(buttonActions[index]));

            this.add.text(width / 2, y, label, {
                fontSize: '24px',
                fontFamily: 'monospace',
                color: '#ffffff',
            }).setOrigin(0.5);
        });

    } 

    returnToGame() {
        if (this.returnTo) {
            this.scene.resume(this.returnTo);
            this.scene.stop();
        }
    }

    handleButton(action) {
        switch (action) {
            case 'Settings':
                console.log("Abrir Ajustes");
                break;
            case 'Controls':
                console.log("Mostrar controles");
                break;
            case 'About':
                window.open('https://joaos-organization-54.gitbook.io/black-hat', '_blank');
                break;
            case 'Exit':
                this.showExitConfirmation();
                break;
        }
    }

    showExitConfirmation() {
        const width = 1400;
        const height = 800;
    
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.6).setOrigin(0).setDepth(999);
    
        const popup = this.add.rectangle(width / 2, height / 2, 500, 300, 0x2f2f2f)
            .setStrokeStyle(3, 0xffffff)
            .setDepth(1000);
    
        const question = this.add.text(width / 2, height / 2 - 80, 'Deseja sair do jogo?', {
            fontSize: '32px',
            fontFamily: 'monospace',
            color: '#ffffff',
        }).setOrigin(0.5).setDepth(1000);
    
        // "Sim"
        const yesButton = this.add.rectangle(width / 2 - 100, height / 2 + 50, 120, 50, 0x555555)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => yesButton.setFillStyle(0x777777))
            .on('pointerout', () => yesButton.setFillStyle(0x555555))
            .on('pointerdown', () => {
                window.close()


                // Fallback: redirecionar pra uma tela final ou URL
                // window.location.href = "https://google.com"; // ou qualquer outra página
            })
            .setDepth(1000);
    
        const yesText = this.add.text(width / 2 - 100, height / 2 + 50, 'Sim', {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setDepth(1000);
    
        // "Não"
        const noButton = this.add.rectangle(width / 2 + 100, height / 2 + 50, 120, 50, 0x555555)
            .setInteractive({ useHandCursor: true })
            .on('pointerover', () => noButton.setFillStyle(0x777777))
            .on('pointerout', () => noButton.setFillStyle(0x555555))
            .on('pointerdown', () => {
                overlay.destroy();
                popup.destroy();
                question.destroy();
                yesButton.destroy();
                yesText.destroy();
                noButton.destroy();
                noText.destroy();
            })
            .setDepth(1000);
    
        const noText = this.add.text(width / 2 + 100, height / 2 + 50, 'Não', {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setDepth(1000);
    }
    

    update() {    
    }
}
