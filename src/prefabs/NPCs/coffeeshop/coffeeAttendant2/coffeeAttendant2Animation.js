export function preloadCoffeeAttendant2Animations(scene) {
    scene.load.image('coffeeAttendant2.1', 'assets/sprites/coffeeshop/coffeeAttendant2/coffeeAttendant2.png'); 
    scene.load.image('coffeeAttendant2.2', 'assets/sprites/coffeeshop/coffeeAttendant2/coffeeAttendant2.1.png'); 
}

export function CoffeeAttendant2Animations(scene) {
    if (scene.anims.exists('coffeAttendantAnim')) return;

    scene.anims.create({
        key: 'coffeAttendantAnim',
        frames: [
            { key: 'coffeeAttendant2.1' },
            { key: 'coffeeAttendant2.2' }
        ],
        frameRate: 0.7,
        repeat: -1
    });
}
