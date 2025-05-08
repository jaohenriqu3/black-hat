export function preloadCoffeeAttendantAnimations(scene) {
    scene.load.image('coffeeAttendant', 'assets/sprites/coffeeAttendant/turn/coffee-attendant.png'); 
    scene.load.image('coffeeAttendant2', 'assets/sprites/coffeeAttendant/turn/coffee-attendant2.png'); 
}

export function CoffeeAttendantAnimations(scene) {
    if (scene.anims.exists('turnCattendant')) return;

    scene.anims.create({
        key: 'turnCattendant',
        frames: [
            { key: 'coffeeAttendant' },
            { key: 'coffeeAttendant2' }
        ],
        frameRate: 0.5,
        repeat: -1
    });
}
