export function preloadCoffeeAttendant3Animations(scene) {
    scene.load.image('coffeeAttendant3', 'assets/sprites/coffeeshop/coffeeAttendant3/coffeeAttendant3.png'); 
    scene.load.image('coffeeAttendant3.1', 'assets/sprites/coffeeshop/coffeeAttendant3/coffeeAttendant3.1.png'); 
}

export function CoffeeAttendant3Animations(scene) {
    if (scene.anims.exists('coffeAttendant3')) return;

    scene.anims.create({
        key: 'coffeAttendant3',
        frames: [
            { key: 'coffeeAttendant3' },
            { key: 'coffeeAttendant3.1' }
        ],
        frameRate: 0.6,
        repeat: -1
    });
}