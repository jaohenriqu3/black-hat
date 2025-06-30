import VictorPrefab from "../NPCs/victor/victorPrefab.js";
import { VictorAnimation } from "../NPCs/victor/animationVictor.js";
import DianaPrefab from "../NPCs/diana/dianaPrefab.js";
import { dianaAnimation } from "../NPCs/diana/dianaAnimation.js";

export function spawnAllNpcs(scene) {
    VictorAnimation(scene);
    dianaAnimation(scene);

    scene.victor = new VictorPrefab(scene, 375, 107).setDepth(3);
    scene.diana = new DianaPrefab(scene, 422, 107).setDepth(3);

    return {
        victor: scene.victor,
        diana: scene.diana
    };
}
