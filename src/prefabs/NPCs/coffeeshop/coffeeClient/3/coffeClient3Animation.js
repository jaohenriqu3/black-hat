export function preloadCoffeeClient3(scene) {
    scene.load.image('coffeeClient3', 'assets/sprites/coffeeshop/coffeeClient/3/client-sit-2.1.png');  
    scene.load.image('coffeeClient3.1', 'assets/sprites/coffeeshop/coffeeClient/3/client-sit-2.2.png');  

}

export function CoffeeClient3Animation(scene) {
    if (scene.anims.exists('coffeeClient3')) return;

    scene.anims.create({
        key: 'coffeeClient3',
        frames: [
            { key: 'coffeeClient3' },
            { key: 'coffeeClient3.1' }
        ],
        frameRate: 0.8,
        repeat: -1
    });
}
