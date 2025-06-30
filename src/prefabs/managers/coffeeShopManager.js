import CoffeeAttendantPrefab from "../../prefabs/NPCs/coffeeAttendant/coffeeAttendantPrefab.js";
import { CoffeeAttendantAnimations } from "../../prefabs/NPCs/coffeeAttendant/coffeeAttendantAnimation.js";
import CoffeeAttendant2Prefab from "../../prefabs/NPCs/coffeeshop/coffeeAttendant2/coffeeAttendant2Prefab.js";
import { CoffeeAttendant2Animations } from "../../prefabs/NPCs/coffeeshop/coffeeAttendant2/coffeeAttendant2Animation.js";
import CoffeeAttendant3Prefab from "../../prefabs/NPCs/coffeeshop/coffeeAttendant3/coffeeAttendant3Prefab.js";
import { CoffeeAttendant3Animations } from "../../prefabs/NPCs/coffeeshop/coffeeAttendant3/coffeeAttendant3Animation.js";
import CoffeeClientPrefab from "../../prefabs/NPCs/coffeeshop/coffeeClient/1/coffeeClientPrefab.js";
import { CoffeeClientAnimation } from "../../prefabs/NPCs/coffeeshop/coffeeClient/1/coffeeClientAnimation.js";
import CoffeeClient2Prefab from "../../prefabs/NPCs/coffeeshop/coffeeClient/2/coffeeClient2Prefab.js";
import { CoffeeClient2Animation } from "../../prefabs/NPCs/coffeeshop/coffeeClient/2/coffeeClient2Animation.js";

export function spawnAllNpcs(scene) {
    CoffeeAttendantAnimations(scene);
    CoffeeAttendant2Animations(scene);
    CoffeeAttendant3Animations(scene);
    CoffeeClientAnimation(scene);
    CoffeeClient2Animation(scene);

    scene.attendant = new CoffeeAttendantPrefab(scene, 205, 90);
    scene.attendant2 = new CoffeeAttendant2Prefab(scene, 255, 55).setDepth(10);
    scene.attendant3 = new CoffeeAttendant3Prefab(scene, 380, 55).setDepth(10);
    scene.client = new CoffeeClientPrefab(scene, 370, 150).setDepth(10);
    scene.client2 = new CoffeeClient2Prefab(scene, 310, 110).setDepth(10);

    return {
        attendant: scene.attendant,
        attendant2: scene.attendant2,
        attendant3: scene.attendant3,
        client: scene.client,
        client2: scene.client2
    };
}