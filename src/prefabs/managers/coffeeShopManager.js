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

import CoffeeClient3Prefab from "../../prefabs/NPCs/coffeeshop/coffeeClient/3/coffeeClient3Prefab.js";
import { CoffeeClient3Animation } from "../../prefabs/NPCs/coffeeshop/coffeeClient/3/coffeClient3Animation.js";

import CoffeeClient4Prefab from "../../prefabs/NPCs/coffeeshop/coffeeClient/4/coffeeClient4Prefab.js";
import { CoffeeClient4Animation } from "../../prefabs/NPCs/coffeeshop/coffeeClient/4/coffeeClient4Animation.js";

import CoffeeClient5Prefab from "../../prefabs/NPCs/coffeeshop/coffeeClient/5/coffeeClient5Prefab.js";
import { CoffeeClient5Animation } from "../../prefabs/NPCs/coffeeshop/coffeeClient/5/coffeeClient5Animation.js";

import CoffeeClient6Prefab from "../../prefabs/NPCs/coffeeshop/coffeeClient/6/coffeeClient6Prefab.js";
import { CoffeeClient6Animation } from "../../prefabs/NPCs/coffeeshop/coffeeClient/6/coffeeClient6Animation.js";

export function spawnAllNpcs(scene, chapter) {
    CoffeeAttendantAnimations(scene);
    CoffeeAttendant2Animations(scene);
    CoffeeAttendant3Animations(scene);
    CoffeeClientAnimation(scene);
    CoffeeClient2Animation(scene);
    CoffeeClient3Animation(scene);
    CoffeeClient4Animation(scene);
    CoffeeClient5Animation(scene);
    CoffeeClient6Animation(scene);

    scene.attendant = new CoffeeAttendantPrefab(scene, 205, 90);
    scene.attendant2 = new CoffeeAttendant2Prefab(scene, 255, 55).setDepth(10);
    scene.attendant3 = new CoffeeAttendant3Prefab(scene, 380, 55).setDepth(10);

    const clientConfigs = [
        { key: 'client', prefab: CoffeeClientPrefab, x: 370, y: 150 },
        { key: 'client2', prefab: CoffeeClient2Prefab, x: 310, y: 110 },
        { key: 'client3', prefab: CoffeeClient3Prefab, x: 450, y: 150 },
        { key: 'client4', prefab: CoffeeClient4Prefab, x: 505, y: 150 },
        { key: 'client5', prefab: CoffeeClient5Prefab, x: 370, y: 200 },
        { key: 'client6', prefab: CoffeeClient6Prefab, x: 290, y: 150 }
    ];

    const clientsToShow = Math.max(0, 6 - (chapter - 1) * 2);

    for (let i = 0; i < clientsToShow; i++) {
        const { key, prefab, x, y } = clientConfigs[i];
        scene[key] = new prefab(scene, x, y).setDepth(10);
    }

    const npcs = {
        attendant: scene.attendant,
        attendant2: scene.attendant2,
        attendant3: scene.attendant3
    };
    for (let i = 0; i < clientsToShow; i++) {
        const { key } = clientConfigs[i];
        npcs[key] = scene[key];
    }
    return npcs;
}