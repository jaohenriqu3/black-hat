import VictorPrefab from "../NPCs/victor/victorPrefab.js";
import { VictorAnimation } from "../NPCs/victor/animationVictor.js";

import DianaPrefab from "../NPCs/diana/dianaPrefab.js";
import { dianaAnimation } from "../NPCs/diana/dianaAnimation.js"; 

import DoodleFanPrefab from "../NPCs/doodle/1/doodleFanPrefab.js";
import { doodleFanAnimation } from "../NPCs/doodle/1/doodleFanAnimation.js";

import DoodleFan2Prefab from "../NPCs/doodle/2/doodleFanPrefab.js";
import { doodleFan2Animation } from "../NPCs/doodle/2/doodleFan2Animation.js";

import DoodleFan3Prefab from "../NPCs/doodle/3/doodleFan3Prefab.js";
import { doodleFan3Animation } from "../NPCs/doodle/3/doodleFan3Animation.js";

import DoodleFan4Prefab from "../NPCs/doodle/4/doodleFan4Prefab.js";
import { doodleFan4Animation } from "../NPCs/doodle/4/doodleFan4Animation.js";

import DoodleFan5Prefab from "../NPCs/doodle/5/doodleFan5Prefab.js";
import { doodleFan5Animation } from "../NPCs/doodle/5/doodleFan5Animation.js";

import DoodleFan6Prefab from "../NPCs/doodle/6/doodleFan6Prefab.js";
import { doodleFan6Animation } from "../NPCs/doodle/6/doodleFan6Animation.js";

import DoodleFan7Prefab from "../NPCs/doodle/7/doodleFan7Prefab.js";
import { doodleFan7Animation } from "../NPCs/doodle/7/doodleFan7Animation.js";

import DoodleFan8Prefab from "../NPCs/doodle/8/doodleFan8Prefab.js";
import { doodleFan8Animation } from "../NPCs/doodle/8/doodleFan8Animation.js";

import DoodleFan9Prefab from "../NPCs/doodle/9/doodleFan9Prefab.js";
import { doodleFan9Animation } from "../NPCs/doodle/9/doodleFan9Animation.js";

export function spawnAllNpcs(scene) {
    VictorAnimation(scene);
    dianaAnimation(scene);
    doodleFanAnimation(scene);
    doodleFan2Animation(scene); 
    doodleFan3Animation(scene);
    doodleFan4Animation(scene); 
    doodleFan5Animation(scene);
    doodleFan6Animation(scene);
    doodleFan7Animation(scene);
    doodleFan8Animation(scene);
    doodleFan9Animation(scene);

    scene.victor = new VictorPrefab(scene, 375, 107).setDepth(3);
    scene.diana = new DianaPrefab(scene, 422, 107).setDepth(3);
    scene.doodleFan = new DoodleFanPrefab(scene, 422, 200).setDepth(3);
    scene.doodleFan2 = new DoodleFan2Prefab(scene, 400, 210).setDepth(3);
    scene.doodleFan3 = new DoodleFan3Prefab(scene, 370, 200).setDepth(3);
    scene.doodleFan4 = new DoodleFan4Prefab(scene, 450, 180).setDepth(3);
    scene.doodleFan5 = new DoodleFan5Prefab(scene, 470, 200).setDepth(3);
    scene.doodleFan6 = new DoodleFan6Prefab(scene, 380, 240).setDepth(3);
    scene.doodleFan7 = new DoodleFan7Prefab(scene, 420, 230).setDepth(3);
    scene.doodleFan8 = new DoodleFan8Prefab(scene, 350, 230).setDepth(3);
    scene.doodleFan9 = new DoodleFan9Prefab(scene, 450, 230).setDepth(3);

    return {
        victor: scene.victor,
        diana: scene.diana,
        doodleFan: scene.doodleFan,
        doodleFan2: scene.doodleFan2,
        doodleFan3: scene.doodleFan3,
        doodleFan4: scene.doodleFan4,
        doodleFan5: scene.doodleFan5,
        doodleFan6: scene.doodleFan6,
        doodleFan7: scene.doodleFan7,
        doodleFan8: scene.doodleFan8,
        doodleFan9: scene.doodleFan9
    };
}
