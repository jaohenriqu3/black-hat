import TelaInicial from './screens/initialScreen.js';
import Initial from './screens/initial.js';
import Menu from './screens/menuScreen.js'; 
import DantePC from './screens/dantePC.js'; 
import DataCenterPC from './scenes/cap1/dataCenterPC.js';
import DanteCell from './scenes/cap3/danteCell.js';
import CorvusPC from './scenes/cap4/corvusPC.js'; 
import CassinoPC from './screens/cassinoPC.js';
import CassinoGame from './screens/cassinoGame.js';

import Preload from './scenes/preload.js'
import TutorialCut from './scenes/cutscenes/cap1/tutorialcut.js';

import DelfiCity from './scenes/globals/delfiCity.js';
import Lobby from './scenes/globals/lobby.js'; 
import Coffe from './scenes/globals/coffeshop.js';
import Doodle from './scenes/cap1/doodle.js'; 
import DataCenter from './scenes/cap1/dataCenter.js';
import IboDelfi from './scenes/cap2/ibodelfi.js'; 
import IboOffice from './scenes/cap2/iboOffice.js'; 
import Cassino from './scenes/globals/cassino.js';
import CassinoOffice from './scenes/cap3/cassinoOffice.js'; 
import BlackNest from './scenes/cap4/blackNest.js';

import Chapter1Cutscene from './scenes/cutscenes/cap1/cap1-cutscene.js';
import Chapter1GameOver from './scenes/cutscenes/cap1/cap1-gameover.js';
import Chapter1Corvus from './scenes/cutscenes/cap1/cap1-corvus.js';

import Chapter2Cutscene from './scenes/cutscenes/cap2/cap2-delfir.js';
import Chapter2Cassino from './scenes/cutscenes/cap2/cap2-cassino.js'; 

import Chapter3Cutscene from './scenes/cutscenes/cap3/cap3-cassino.js';
import Chapter3Nexus from './scenes/cutscenes/cap3/cap3-nexus.js';	

import Chapter4Cutscene from './scenes/cutscenes/cap4/cap4-cutscene.js';

import BlackLock from './scenes/cap4/blackLock.js';
import BlackOffice from './scenes/cap4/blackOffice.js';

import Final1 from './scenes/cutscenes/finals/final1.js';
import Final2 from './scenes/cutscenes/finals/final2.js';

import Close from './scenes/cutscenes/finals/close.js';

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
	game.scene.add("Initial", Initial);
	game.scene.add("Menu", Menu);

	game.scene.add("DantePC", DantePC);
	game.scene.add("DataCenterPC", DataCenterPC);
	game.scene.add("DanteCell", DanteCell)
	game.scene.add("CorvusPC", CorvusPC);
	game.scene.add("CassinoPC", CassinoPC);
	game.scene.add("CassinoGame", CassinoGame)

	game.scene.add("Preload", Preload);
	game.scene.add("Boot", Boot, true);
	game.scene.add("TutorialCut", TutorialCut);
	game.scene.add("Lobby", Lobby );
	game.scene.add("Level", DelfiCity );
	game.scene.add("Coffe", Coffe);
	game.scene.add("Doodle", Doodle);
	game.scene.add("DataCenter", DataCenter);
	game.scene.add("IboDelfi", IboDelfi);
	game.scene.add("IboOffice", IboOffice);
	game.scene.add("Cassino", Cassino);
	game.scene.add("CassinoOffice", CassinoOffice);
	game.scene.add("BlackNest", BlackNest); 
	
	game.scene.add("Chapter1Cutscene", Chapter1Cutscene);
	game.scene.add("Chapter1GameOver", Chapter1GameOver);
	game.scene.add("Chapter1Corvus", Chapter1Corvus);

	game.scene.add("Chapter2Cutscene", Chapter2Cutscene);
	game.scene.add("Chapter2Cassino", Chapter2Cassino);

	game.scene.add("Chapter3Cutscene", Chapter3Cutscene); 
	game.scene.add("Chapter3Nexus", Chapter3Nexus);
	game.scene.add("BlackLock", BlackLock);
	game.scene.add("BlackOffice", BlackOffice);

	game.scene.add("Chapter4Cutscene", Chapter4Cutscene); 

	game.scene.add("Final1", Final1);
	game.scene.add("Final2", Final2);

	game.scene.add("Close", Close);

	window.lastScene = null;
});

class Boot extends Phaser.Scene {

	preload() {
	}

	create() {
		this.scene.start("Preload");
	}
}