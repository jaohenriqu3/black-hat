export function preloadCoffeeClient4(scene) {
    scene.load.image('coffeeClient4', 'assets/sprites/coffeeshop/coffeeClient/4/client-sit-3.png');  
    scene.load.image('coffeeClient4.1', 'assets/sprites/coffeeshop/coffeeClient/4/client-sit-3.1.png');  
}

export function CoffeeClient4Animation(scene) {
    if (scene.anims.exists('coffeeClient4')) return;

    scene.anims.create({
        key: 'coffeeClient4',
        frames: [
            { key: 'coffeeClient4' },
            { key: 'coffeeClient4.1' }
        ],
        frameRate: 0.8,
        repeat: -1
    });
}
