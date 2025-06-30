import CassinoPlayerPrefab from "../NPCs/cassino/cassinoPlayer/cassinoPlayerPrefab.js";
import { CassinoPlayerAnimation } from "../NPCs/cassino/cassinoPlayer/cassinoPlayerAnimation.js";
import CassinoAttendantPrefab from "../NPCs/cassino/cassinoAttendant/cassinoAttendantPrefab.js";
import { CassinoAttendantAnimation } from "../NPCs/cassino/cassinoAttendant/cassinoAttendantAnimation.js";
import CassinoAttendant2Prefab from "../NPCs/cassino/cassinoAttendant2/cassinoAttendant2Prefab.js";
import { CassinoAttendantAnimation2 } from "../NPCs/cassino/cassinoAttendant2/cassinoAttendant2Animation.js";
import BlackNestMemberPrefab from "../NPCs/cassino/blackNestMember/blackNestMemberPrefab.js";
import { BlackNestMemberAnimation } from "../NPCs/cassino/blackNestMember/blackNestMemberAnimation.js";

export function spawnAllNpcs(scene) {
    CassinoPlayerAnimation(scene);
    CassinoAttendantAnimation(scene);
    CassinoAttendantAnimation2(scene);
    BlackNestMemberAnimation(scene);

    scene.cassinoPlayer = new CassinoPlayerPrefab(scene, 133, 360);
    scene.cassinoAttendant = new CassinoAttendantPrefab(scene, 70, 60).setDepth(2);
    scene.cassinoAttendant2 = new CassinoAttendant2Prefab(scene, 200, 75).setDepth(3);
    scene.blackNestMember = new BlackNestMemberPrefab(scene, 485, 265).setVisible(false);

    return {
        cassinoPlayer: scene.cassinoPlayer,
        cassinoAttendant: scene.cassinoAttendant,
        cassinoAttendant2: scene.cassinoAttendant2,
        blackNestMember: scene.blackNestMember
    };
}
