export function preloadCoffeeClient6(scene) {
    scene.load.image('coffeeClient6', 'assets/sprites/coffeeshop/coffeeClient/6/client-sit-5.1.png');  
    scene.load.image('coffeeClient6.1', 'assets/sprites/coffeeshop/coffeeClient/6/client-sit-5.2.png');  
}

export function CoffeeClient6Animation(scene) {
    if (scene.anims.exists('coffeeClient6')) return;

    scene.anims.create({
        key: 'coffeeClient6',
        frames: [
            { key: 'coffeeClient6' },
            { key: 'coffeeClient6.1' }
        ],
        frameRate: 0.7,
        repeat: -1
    });
}
