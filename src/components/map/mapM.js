export function MapM(scene) {
    scene.input.keyboard.on('keydown-M', () => {
      const currentScene = scene.scene.key;
      
      if (currentScene !== 'Map') {
        scene.scene.pause(currentScene);
        scene.scene.launch('Map', { returnTo: currentScene });
      }
    });
  }
  