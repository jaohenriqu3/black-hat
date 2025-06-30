import NpcPrefab from "../NPCs/test/testPrefab.js";
import { NPCAnimations } from "../NPCs/test/testAnimation.js";

export function spawnAllNpcs(scene) {
    NPCAnimations(scene);

    scene.npc = new NpcPrefab(scene, 650, 390, 'npc-test');

    return {
        npc: scene.npc
    };
}
