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
        this.load.image('controls', 'assets/screens/controls.png')
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
            strokeThickness: 2,
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
        this.menuButtons = [];

        buttons.forEach((label, index) => {
            const y = 280 + index * 100;

            const button = this.add.rectangle(width / 2, y, 400, 60, 0x6C6C6C, 0.7)
                .setStrokeStyle(3, 0x000000)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => button.setFillStyle(0x4A4A4A, 0.7))
                .on('pointerout', () => button.setFillStyle(0x6C6C6C, 0.7))
                .on('pointerdown', () => this.handleButton(buttonActions[index]));

            this.menuButtons.push(button);

            this.add.text(width / 2, y, label, {
                fontSize: '24px',
                fontFamily: 'monospace',
                color: '#ffffff',
            }).setOrigin(0.5);
        });

        // Carregar filtro de daltonismo se existir
        this.loadDaltonismFilter();

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
                this.showSettings();
                break;
            case 'Controls':
                this.showControls()
                break;
            case 'About':
                window.open('https://joaos-organization-54.gitbook.io/black-hat', '_blank');
                break;
            case 'Exit':
                this.showExitConfirmation();
                break;
        }
    }

    showSettings(){
        this.scene.bringToTop();

        const width = 1400;
        const height = 800;

        this.settingsPanel = this.add.rectangle(width / 2, height / 2, 1300, 700, 0xAD7E51);

        this.closeSettingsButton = this.add.image((width / 2) - 650 + 20, (height / 2) - 350 + 20, 'closeIcon')
            .setOrigin(0, 0)
            .setScale(2.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => { 
                this.closeSettings();
            }); 

        this.settingsTitle = this.add.text(width / 2, 150, 'AJUSTES', {
            fontSize: '99px',
            fontFamily: 'Lucida Console',
            color: '#FFFFFF', 
            stroke: '#000000',
            strokeThickness: 2,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#000000',
                blur: 0,
                fill: true
            }
        }).setOrigin(0.5);

        const settingsOptions = ['Volume Geral', 'Ativar Tela Cheia', "Modo Daltonismo"];
        this.settingsButtons = [];

        settingsOptions.forEach((label, index) => {
            const y = 280 + index * 80;

            const optionText = this.add.text((width / 2) - 250, y, label, {
                fontSize: '20px',
                fontFamily: 'monospace',
                color: '#ffffff',
            }).setOrigin(0, 0.5).setDepth(1);
            // Verificar se é o botão de Tela Cheia
            if (label === 'Ativar Tela Cheia') {
                // Para Tela Cheia, centralizar o texto e tornar o container clicável
                optionText.setPosition(width / 2, y);
                optionText.setOrigin(0.5);
                
                const optionContainer = this.add.rectangle(width / 2, y, 600, 50, 0x6C6C6C, 0.7)
                    .setStrokeStyle(2, 0x000000)
                    .setInteractive({ useHandCursor: true })
                    .on('pointerover', () => optionContainer.setFillStyle(0x4A4A4A, 0.7))
                    .on('pointerout', () => optionContainer.setFillStyle(0x6C6C6C, 0.7))
                    .on('pointerdown', () => {
                        this.scale.startFullscreen();
                    });

                this.settingsButtons.push({ 
                    container: optionContainer, 
                    text: optionText
                });
            } else if (label === 'Modo Daltonismo') {
                // Para Modo Daltonismo, criar subtítulo e sub-opções
                optionText.setPosition(1000 / 2, y);
                optionText.setOrigin(0.5);
                optionText.setStyle({
                    fontSize: '24px',
                    fontFamily: 'monospace',
                    color: '#000000',
                });
                
                // Criar sub-opções de daltonismo
                const daltonismOptions = ['Protanopia', 'Deuteranopia', 'Tritanopia'];
                const daltonismY = y + 40;
                
                daltonismOptions.forEach((daltonismLabel, daltonismIndex) => {
                    const subY = daltonismY + daltonismIndex * 35;
                    
                    // Criar bolinha (círculo vazio)
                    const radioButton = this.add.circle((1070 / 2) - 120, subY, 8, 0xAD7E51)
                        .setStrokeStyle(2, 0x000000)
                        .setInteractive({ useHandCursor: true })
                        .on('pointerdown', () => {
                            this.toggleDaltonism(daltonismLabel, radioButton, subText);
                        });

                    // Texto da sub-opção
                    const subText = this.add.text((1080 / 2) - 100, subY, daltonismLabel, {
                        fontSize: '20px',
                        fontFamily: 'monospace',
                        color: '#ffffff',
                    }).setOrigin(0, 0.5);

                    // Verificar se esta opção está ativa
                    const activeDaltonism = localStorage.getItem('blackHat_daltonism');
                    if (activeDaltonism === daltonismLabel) {
                        radioButton.setFillStyle(0x3152A6);
                      //  subText.setText(`✓ ${daltonismLabel}`);
                    }

                    this.settingsButtons.push({ 
                        radioButton: radioButton,
                        text: subText,
                        type: 'daltonism',
                        option: daltonismLabel
                    });
                });

                this.settingsButtons.push({ 
                    text: optionText,
                    type: 'subtitle'
                });
            } else {
                // Para Volume Geral, manter o slider
                const optionContainer = this.add.rectangle(width / 2, y, 600, 50, 0x6C6C6C, 0.7)
                    .setStrokeStyle(2, 0x000000);

                const slider = this.add.rectangle((width / 2) + 170, y, 200, 20, 0x4A4A4A)
                    .setStrokeStyle(1, 0x000000);

                // Posição inicial do indicador (direita = volume máximo)
                const sliderStartX = (width / 2) + 270; // Posição final do slider
                const sliderEndX = (width / 2) + 70;   // Posição inicial do slider
                
                // Carregar posição salva do localStorage ou usar posição padrão
                let savedVolume = 1.0; // Volume padrão (máximo)
                if (label === 'Volume Geral') {
                    const savedVolumeData = localStorage.getItem('blackHat_volume');
                    if (savedVolumeData) {
                        savedVolume = parseFloat(savedVolumeData);
                    }
                }
                
                // Calcular posição X baseada no volume salvo
                const savedPositionX = sliderEndX + (savedVolume * (sliderStartX - sliderEndX));
                
                const sliderIndicator = this.add.rectangle(savedPositionX, y, 15, 30, 0x3152A6)
                    .setStrokeStyle(1, 0x000000)
                    .setInteractive({ useHandCursor: true })
                    .setData('sliderStartX', sliderStartX)
                    .setData('sliderEndX', sliderEndX)
                    .setData('currentVolume', savedVolume);

                // Adicionar funcionalidade de drag para Volume Geral
                if (label === 'Volume Geral') {
                    this.input.setDraggable(sliderIndicator);
                    
                    sliderIndicator.on('drag', (pointer, dragX) => {
                        // Limitar o movimento do indicador dentro do slider
                        const clampedX = Phaser.Math.Clamp(dragX, sliderEndX, sliderStartX);
                        sliderIndicator.x = clampedX;
                        
                        // Calcular volume baseado na posição (0 = esquerda, 1 = direita)
                        const volume = (clampedX - sliderEndX) / (sliderStartX - sliderEndX);
                        sliderIndicator.setData('currentVolume', volume);
                        
                        // Salvar volume no localStorage
                        localStorage.setItem('blackHat_volume', volume.toString());
                        
                        // Aplicar volume ao jogo
                        this.setGameVolume(volume);
                    });
                    
                    // Aplicar volume salvo ao jogo quando abrir o pop-up
                    this.setGameVolume(savedVolume);
                } else {
                    // Para outras opções, manter apenas o clique
                    sliderIndicator.on('pointerdown', () => {
                        console.log(`Ajustando ${label}`);
                    });
                }

                this.settingsButtons.push({ 
                    container: optionContainer, 
                    text: optionText,
                    slider: slider, 
                    indicator: sliderIndicator 
                });
            }
        });

        this.menuButtons.forEach(btn => btn.disableInteractive({ useHandCursor: false }));
    }

    setGameVolume(volume) {
        // Aplicar volume a todos os sons do jogo
        if (this.game.sound) {
            this.game.sound.setVolume(volume);
        }
        
        // Se você tiver sons específicos, pode ajustá-los individualmente aqui
        // Exemplo: this.game.sound.get('nomeDoSom').setVolume(volume);
        
        console.log(`Volume ajustado para: ${Math.round(volume * 100)}%`);
    }

    toggleDaltonism(daltonismType, radioButton, text) {
        const activeDaltonism = localStorage.getItem('blackHat_daltonism');
        
        // Se clicou na mesma opção que já está ativa, desativar
        if (activeDaltonism === daltonismType) {
            // Desativar filtro
            this.removeDaltonismFilter();
            localStorage.removeItem('blackHat_daltonism');
            
            // Resetar aparência do radio button
            radioButton.setFillStyle(0xAD7E51);
            text.setText(daltonismType);
            
            console.log(`Modo ${daltonismType} desativado`);
        } else {
            // Ativar novo filtro
            this.applyDaltonismFilter(daltonismType);
            localStorage.setItem('blackHat_daltonism', daltonismType);
            
            // Atualizar aparência de todos os radio buttons
            this.settingsButtons.forEach(button => {
                if (button.type === 'daltonism') {
                    if (button.option === daltonismType) {
                        button.radioButton.setFillStyle(0x3152A6);
                     //   button.text.setText(`✓ ${daltonismType}`);
                    } else {
                        button.radioButton.setFillStyle(0xAD7E51);
                        button.text.setText(button.option);
                    }
                }
            });
            
            console.log(`Modo ${daltonismType} ativado`);
        }
    }

    applyDaltonismFilter(daltonismType) {
        // Remover filtro anterior se existir
        this.removeDaltonismFilter();
        
        // Aplicar filtro diretamente ao canvas do Phaser
        const canvas = this.game.canvas;
        if (canvas) {
            switch (daltonismType) {
                case 'Protanopia':
                    // Filtro para protanopia (dificuldade com vermelho)
                    canvas.style.filter = 'contrast(1.3) saturate(0.6) hue-rotate(5deg) brightness(1.1) sepia(0.1)';
                    break;
                case 'Deuteranopia':
                    // Filtro para deuteranopia (dificuldade com verde)
                    canvas.style.filter = 'contrast(1.2) saturate(0.5) hue-rotate(-5deg) brightness(1.05) sepia(0.15)';
                    break;
                case 'Tritanopia':
                    // Filtro para tritanopia (dificuldade com azul)
                    canvas.style.filter = 'contrast(1.4) saturate(0.4) hue-rotate(-15deg) brightness(0.9) sepia(0.2)';
                    break;
            }

            console.log(`Filtro ${daltonismType} aplicado ao canvas`);
        } else {
            console.error('Canvas do Phaser não encontrado');
        }
    }

    removeDaltonismFilter() {
        // Remover filtro do canvas do Phaser
        const canvas = this.game.canvas;
        if (canvas) {
            canvas.style.filter = 'none';
                    
            console.log('Filtro de daltonismo removido');
        }
    }

    loadDaltonismFilter() {
        const activeDaltonism = localStorage.getItem('blackHat_daltonism');
        if (activeDaltonism) {
            this.applyDaltonismFilter(activeDaltonism);
            console.log(`Filtro de daltonismo carregado: ${activeDaltonism}`);
        }
    }

    closeSettings(){ 
        if (this.settingsBackground) this.settingsBackground.destroy();
        if (this.settingsPanel) this.settingsPanel.destroy();
        if (this.closeSettingsButton) this.closeSettingsButton.destroy();
        if (this.settingsTitle) this.settingsTitle.destroy();

        // Remover botões de ajustes
        if (this.settingsButtons) {
            this.settingsButtons.forEach(button => {
                if (button.container) button.container.destroy();
                if (button.text) button.text.destroy();
                if (button.slider) button.slider.destroy();
                if (button.indicator) button.indicator.destroy();
                if (button.radioButton) button.radioButton.destroy();
            });
        }

        this.menuButtons.forEach(btn => btn.setInteractive({ useHandCursor: true }));
    }

    showControls(){ 
        this.scene.bringToTop();

        const width = 1400;
        const height = 800;

        this.controlsImage = this.add.image(700, 400, "controls")

        this.closeControlsButton = this.add.image((width / 2) - 650 + 20, (height / 2) - 350 + 20, 'closeIcon')
        .setOrigin(0, 0)
        .setScale(2.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => { 
            this.closeControls();
        }); 

        this.menuButtons.forEach(btn => btn.disableInteractive({ useHandCursor: false }));
    }

    closeControls(){ 
        this.controlsImage.destroy();
        this.closeControlsButton.destroy();

        this.menuButtons.forEach(btn => btn.setInteractive({ useHandCursor: true }));
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
