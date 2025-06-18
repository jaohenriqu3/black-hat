export function preloadCoffeeClient2(scene) {
    scene.load.image('coffeeClient2', 'assets/sprites/coffeeshop/coffeeClient/2/coffeeClient1.png');  
    scene.load.image('coffeeClient2.1', 'assets/sprites/coffeeshop/coffeeClient/2/coffeeClient1.2.png');  
}

export function CoffeeClient2Animation(scene) {
    if (scene.anims.exists('coffeeClient2')) return;

    scene.anims.create({
        key: 'coffeeClient2',
        frames: [
            { key: 'coffeeClient2' },
            { key: 'coffeeClient2.1' }
        ],
        frameRate: 0.8,
        repeat: -1
    });
}
