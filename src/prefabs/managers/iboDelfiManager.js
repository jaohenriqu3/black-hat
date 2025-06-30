import IboAttendantPrefab from "../NPCs/iboAttendant/iboAttendantPrefab.js";
import { IboAttendantAnimations } from "../NPCs/iboAttendant/iboAttendantaAnimation.js";

export function spawnAllNpcs(scene) {
    IboAttendantAnimations(scene);

    scene.attendant = new IboAttendantPrefab(scene, 460, 140).setDepth(4);

    return {
        attendant: scene.attendant
    };
}
