export function preloadCoffeeClient5(scene) {
    scene.load.image('coffeeClient5', 'assets/sprites/coffeeshop/coffeeClient/5/client-sit-4.1.png');  
    scene.load.image('coffeeClient5.1', 'assets/sprites/coffeeshop/coffeeClient/5/client-sit-4.2.png');  
}

export function CoffeeClient5Animation(scene) {
    if (scene.anims.exists('coffeeClient5')) return;

    scene.anims.create({
        key: 'coffeeClient5',
        frames: [
            { key: 'coffeeClient5' },
            { key: 'coffeeClient5.1' }
        ],
        frameRate: 0.8,
        repeat: -1
    });
}
