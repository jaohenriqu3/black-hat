import TelaInicial from './screens/initialScreen.js';
import Menu from './screens/menuScreen.js'; 
import DantePC from './screens/dantePC.js';

import Preload from './scenes/preload.js'

import DelfiCity from './scenes/globals/delfiCity.js';
import Lobby from './scenes/globals/lobby.js'; 
import Coffe from './scenes/globals/coffeshop.js';
import Doodle from './scenes/cap1/doodle.js'; 
import DataCenter from './scenes/cap1/dataCenter.js';
import IboDelfi from './scenes/cap2/ibodelfi.js'; 
import IboOffice from './scenes/cap2/iboOffice.js'; 
import Cassino from './scenes/globals/cassino.js';
import CassinoOffice from './scenes/cap3/cassinoOffice.js'; 


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

	game.scene.add("TelaInicial", TelaInicial); 
	game.scene.add("Menu", Menu);
	game.scene.add("DantePC", DantePC)

	game.scene.add("Preload", Preload);
	game.scene.add("Boot", Boot, true);
	game.scene.add("Lobby", Lobby )
	game.scene.add("Level", DelfiCity );
	game.scene.add("Coffe", Coffe);
	game.scene.add("Doodle", Doodle)
	game.scene.add("DataCenter", DataCenter);
	game.scene.add("IboDelfi", IboDelfi)
	game.scene.add("IboOffice", IboOffice)
	game.scene.add("Cassino", Cassino)
	game.scene.add("CassinoOffice", CassinoOffice)
	
	window.lastScene = null;
});

class Boot extends Phaser.Scene {

	preload() {
	
	}

	create() {
		this.scene.start("Preload");
	}
}