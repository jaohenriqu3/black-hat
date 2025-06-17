export function preloadCoffeeClient(scene) {
    scene.load.image('coffeeClient1', 'assets/sprites/coffeeshop/coffeeClient/1/client-sit.png');  
    scene.load.image('coffeeClient1.2', 'assets/sprites/coffeeshop/coffeeClient/1/client-sit-2.png');  

}

export function CoffeeClientAnimation(scene) {
    if (scene.anims.exists('coffeeClient')) return;

    scene.anims.create({
        key: 'coffeeClient',
        frames: [
            { key: 'coffeeClient1' },
            { key: 'coffeeClient1.2' }
        ],
        frameRate: 0.6,
        repeat: -1
    });
}
