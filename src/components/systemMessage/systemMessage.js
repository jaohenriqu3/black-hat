import GameState from "../../state/gameState.js";

export default function systemMessage(scene, text) {
    if (scene.messageBox) {
        scene.messageBox.destroy(); 
    } 

    const FINAL_TUTORIAL_INDEX = 6;

    const { width, height } = scene.cameras.main;

    let boxWidth = 550; 
    let boxHeight = 70; 
    let boxX = 290; 
    let boxY = 290; 
    let fontSize = "14px"  

    if (scene.scene.key === "DantePC") {
        boxWidth = 1250;
        boxHeight = 100;
        boxX = width / 2;
        boxY = height - 110;  
        fontSize = "18px"
    }

    scene.messageBox = scene.add.container();

    const background = scene.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0xFFFFFF, 0.9)
        .setOrigin(0.5)
        .setStrokeStyle(2, 0x000000)
        .setDepth(1000);

    const textStyle = {
        fontFamily: "Arial",
        fontSize: fontSize,
        wordWrap: { width: boxWidth - 40 },
        color: "#000000",
        align: "left",
        delay: 90
    };

    const content = scene.add.text(boxX - boxWidth / 2 + 20, boxY - boxHeight / 2 + 10, text, textStyle)
        .setOrigin(0, 0)
        .setDepth(1001);

    scene.messageBox.add([background, content]); 

    console.log("Exibindo mensagem:", text); 

    if (text === "Use as setas do teclado (⬅️➡️⬆️⬇️) para andar pelo ambiente.") {
        scene.waitingForMove = true;
        return;
    }

    scene.input.keyboard.once('keydown-ENTER', () => {
    scene.dialogIndex++;

    GameState.setTutorialProgress(scene.dialogIndex);

    if (scene.scene.key === "DantePC") {
        scene.localDialogIndex++;

        if (scene.localDialogIndex < scene.dialogs.length) {
            systemMessage(scene, scene.dialogs[scene.localDialogIndex]);
        } else {
            scene.messageBox.destroy();
            if (GameState.getTutorialProgress() >= FINAL_TUTORIAL_INDEX) {
                GameState.setTutorialSeen(true);
                scene.tutorialActive = false;
            }
        } return; }

        if (scene.dialogIndex < scene.dialogs.length) {
        systemMessage(scene, scene.dialogs[scene.dialogIndex]);
        } else {
            scene.messageBox.destroy();
        if (GameState.getTutorialProgress() >= FINAL_TUTORIAL_INDEX) {
            GameState.setTutorialSeen(true);
            scene.tutorialActive = false;
        }
    }
}); }
