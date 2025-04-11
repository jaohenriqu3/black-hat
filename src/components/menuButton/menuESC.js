export function EscMenu(scene) {
    scene.input.keyboard.on('keydown-ESC', () => {
      const currentScene = scene.scene.key;
      
      if (currentScene !== 'Menu') {
        scene.scene.pause(currentScene);
        scene.scene.launch('Menu', { returnTo: currentScene });
      }
    });
  }
  