import Preload from './scenes/preload.js'
import Level from './scenes/level.js' 
import Lobby from './scenes/lobby.js';

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1400,
		height: 800,
		type: Phaser.AUTO,
		pixelArt: true,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}, 
		physics: { 
			default: 'arcade',
            arcade: {
                debug: false
            }
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Boot", Boot, true);
	game.scene.add("Lobby", Lobby )
	game.scene.add("Level", Level );
});

class Boot extends Phaser.Scene {

	preload() {
	
	}

	create() {

		this.scene.start("Preload");
	}
}