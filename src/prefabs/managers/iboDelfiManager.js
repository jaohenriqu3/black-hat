import IboAttendantPrefab from "../NPCs/iboAttendant/iboAttendantPrefab.js";
import { IboAttendantAnimations } from "../NPCs/iboAttendant/iboAttendantaAnimation.js";

import IboPrefab from "../NPCs/iboDelfi/1/iboPrefab.js";
import { IboAnimation } from "../NPCs/iboDelfi/1/iboAnimation.js";

import Ibo2Prefab from "../NPCs/iboDelfi/2/ibo2Prefab.js";
import { Ibo2Animation } from "../NPCs/iboDelfi/2/ibo2Animation.js";

import Ibo3Prefab from "../NPCs/iboDelfi/3/ibo3Prefab.js";
import { Ibo3Animation } from "../NPCs/iboDelfi/3/ibo3Animation.js";

import Ibo4Prefab from "../NPCs/iboDelfi/4/ibo4Prefab.js";
import { Ibo4Animation } from "../NPCs/iboDelfi/4/ibo4Animation.js";

import Ibo5Prefab from "../NPCs/iboDelfi/5/ibo5Prefab.js";
import { Ibo5Animation } from "../NPCs/iboDelfi/5/ibo5Animation.js";

import Ibo6Prefab from "../NPCs/iboDelfi/6/ibo6Prefab.js";
import { Ibo6Animation } from "../NPCs/iboDelfi/6/ibo6Animation.js";

import Ibo7Prefab from "../NPCs/iboDelfi/7/ibo7Prefab.js";
import { Ibo7Animation } from "../NPCs/iboDelfi/7/ibo7Animation.js";

import Ibo8Prefab from "../NPCs/iboDelfi/8/ibo8Prefab.js";
import { Ibo8Animation } from "../NPCs/iboDelfi/8/ibo8Animation.js";

import Ibo9Prefab from "../NPCs/iboDelfi/9/ibo9Prefab.js";
import { Ibo9Animation } from "../NPCs/iboDelfi/9/ibo9Animation.js";

import Ibo10Prefab from "../NPCs/iboDelfi/10/ibo10Prefab.js";
import { Ibo10Animation } from "../NPCs/iboDelfi/10/ibo10Animation.js";

import Ibo11Prefab from "../NPCs/iboDelfi/11/ibo11Prefab.js";
import { Ibo11Animation } from "../NPCs/iboDelfi/11/ibo11Animation.js";

export function spawnAllNpcs(scene) {
    IboAttendantAnimations(scene);
    IboAnimation(scene);
    Ibo2Animation(scene);
    Ibo3Animation(scene);
    Ibo4Animation(scene);
    Ibo5Animation(scene);
    Ibo6Animation(scene);
    Ibo7Animation(scene);
    Ibo8Animation(scene);
    Ibo9Animation(scene);
    Ibo10Animation(scene);
    Ibo11Animation(scene);
    
    scene.attendant = new IboAttendantPrefab(scene, 460, 140).setDepth(4);
    scene.ibo = new IboPrefab(scene, 341, 155).setDepth(4);
    scene.ibo2 = new Ibo2Prefab(scene, 261, 155).setDepth(4);
    scene.ibo3 = new Ibo3Prefab(scene, 181, 155).setDepth(4);
    scene.ibo4 = new Ibo4Prefab(scene, 101, 155).setDepth(4);
    scene.ibo5 = new Ibo5Prefab(scene, 101, 220).setDepth(4);
    scene.ibo6 = new Ibo6Prefab(scene, 261, 220).setDepth(4);
    scene.ibo7 = new Ibo7Prefab(scene, 341, 220).setDepth(4);
    scene.ibo8 = new Ibo8Prefab(scene, 101, 95).setDepth(4);
    scene.ibo9 = new Ibo9Prefab(scene, 261, 95).setDepth(4);
    scene.ibo10 = new Ibo10Prefab(scene, 355, 55).setDepth(4);
    scene.ibo11 = new Ibo11Prefab(scene, 175, 50).setDepth(4);
    
    return {
        attendant: scene.attendant,
        ibo: scene.ibo,
        ibo2: scene.ibo2,
        ibo3: scene.ibo3,
        ibo4: scene.ibo4,
        ibo5: scene.ibo5,
        ibo6: scene.ibo6,
        ibo7: scene.ibo7,
        ibo8: scene.ibo8,
        ibo9: scene.ibo9,
        ibo10: scene.ibo10,
        ibo11: scene.ibo11
    };
}
