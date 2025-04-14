export function preloadMenuButton(scene) {
  scene.load.image('menuIcon', 'assets/inputs/UI/menu/menu.png');
}

export function addMenuButton(scene) { 

    const camera = scene.cameras.main;
    const icon = scene.add.image(camera.worldView.x + 10, camera.worldView.y + 10, 'menuIcon') 
      .setOrigin(0, 0)
      .setScale(1)
      .setInteractive({ useHandCursor: true }) 
      .setDepth(1000)
      .on('pointerdown', () => {
        const currentScene = scene.scene.key;
        scene.scene.pause(currentScene);
        scene.scene.launch('Menu', { returnTo: currentScene }); 
      });
  
      scene.menuButton = icon;
  }
  