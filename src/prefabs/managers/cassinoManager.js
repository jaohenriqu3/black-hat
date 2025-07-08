import CassinoPlayerPrefab from "../NPCs/cassino/cassinoPlayer/cassinoPlayerPrefab.js";
import { CassinoPlayerAnimation } from "../NPCs/cassino/cassinoPlayer/cassinoPlayerAnimation.js";
import CassinoAttendantPrefab from "../NPCs/cassino/cassinoAttendant/cassinoAttendantPrefab.js";
import { CassinoAttendantAnimation } from "../NPCs/cassino/cassinoAttendant/cassinoAttendantAnimation.js";
import CassinoAttendant2Prefab from "../NPCs/cassino/cassinoAttendant2/cassinoAttendant2Prefab.js";
import { CassinoAttendantAnimation2 } from "../NPCs/cassino/cassinoAttendant2/cassinoAttendant2Animation.js";
import BlackNestMemberPrefab from "../NPCs/cassino/blackNestMember/blackNestMemberPrefab.js";
import { BlackNestMemberAnimation } from "../NPCs/cassino/blackNestMember/blackNestMemberAnimation.js";
import C1Prefab from "../NPCs/cassino/1/c1Prefab.js";
import { C1Animation } from "../NPCs/cassino/1/c1Animation.js";
import C2Prefab from "../NPCs/cassino/2/c2Prefab.js";
import { C2Animation } from "../NPCs/cassino/2/c2Animation.js";
import C3Prefab from "../NPCs/cassino/3/c3Prefab.js";
import { C3Animation } from "../NPCs/cassino/3/c3Animation.js";
import C4Prefab from "../NPCs/cassino/4/c4Prefab.js";
import { C4Animation } from "../NPCs/cassino/4/c4Animation.js";
import C5Prefab from "../NPCs/cassino/5/c5Prefab.js";
import { C5Animation } from "../NPCs/cassino/5/c5Animation.js";
import C6Prefab from "../NPCs/cassino/6/c6Prefab.js";
import { C6Animation } from "../NPCs/cassino/6/c6Animation.js";
import C7Prefab from "../NPCs/cassino/7/c7Prefab.js";
import { C7Animation } from "../NPCs/cassino/7/c7Animation.js";
import C8Prefab from "../NPCs/cassino/8/c8Prefab.js";
import { C8Animation } from "../NPCs/cassino/8/c8Animation.js";
import C9Prefab from "../NPCs/cassino/9/c9Prefab.js";
import { C9Animation } from "../NPCs/cassino/9/c9Animation.js";
import singerPrefab from "../NPCs/cassino/singer/singerPrefab.js";
import { SingerAnimation } from "../NPCs/cassino/singer/singerAnimation.js";

export function spawnAllNpcs(scene) {
    CassinoPlayerAnimation(scene);
    CassinoAttendantAnimation(scene);
    CassinoAttendantAnimation2(scene);
    BlackNestMemberAnimation(scene);
    C1Animation(scene);
    C2Animation(scene);
    C3Animation(scene);
    C4Animation(scene);
    C5Animation(scene);
    C6Animation(scene);
    C7Animation(scene);
    C8Animation(scene);
    C9Animation(scene);
    SingerAnimation(scene); 

    scene.cassinoPlayer = new CassinoPlayerPrefab(scene, 133, 360);
    scene.cassinoAttendant = new CassinoAttendantPrefab(scene, 70, 60).setDepth(2);
    scene.cassinoAttendant2 = new CassinoAttendant2Prefab(scene, 200, 75).setDepth(3);
    scene.blackNestMember = new BlackNestMemberPrefab(scene, 485, 265).setVisible(false)
    scene.c1 = new C1Prefab(scene, 212, 360);
    scene.c2 = new C2Prefab(scene, 356, 360);
    scene.c3 = new C3Prefab(scene, 453, 360);
    scene.c4 = new C4Prefab(scene, 420, 360);
    scene.c5 = new C5Prefab(scene, 453, 310);
    scene.c6 = new C6Prefab(scene, 420, 310);
    scene.c7 = new C7Prefab(scene, 420, 310);
    scene.c8 = new C8Prefab(scene, 356, 310); 
    scene.c9 = new C9Prefab(scene, 212, 310);
    scene.singer = new singerPrefab(scene, 352, 80).setDepth(3)

    return {
        cassinoPlayer: scene.cassinoPlayer,
        cassinoAttendant: scene.cassinoAttendant,
        cassinoAttendant2: scene.cassinoAttendant2,
        blackNestMember: scene.blackNestMember,
        singer: scene.singer,
        c1: scene.c1,
        c2: scene.c2,
        c3: scene.c3,
        c4: scene.c4,
        c5: scene.c5,
        c6: scene.c6,
        c7: scene.c7,
        c8: scene.c8,
        c9: scene.c9
    };
}
