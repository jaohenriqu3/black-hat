export default function systemMessage(scene, text) {
    if (scene.messageBox) {
        scene.messageBox.destroy(); 
    }

    const { width, height } = scene.cameras.main;
    const boxWidth = width * 0.9;
    const boxHeight = 70;
    const boxX = width / 2;
    const boxY = height - boxHeight / 2 - 10;

    scene.messageBox = scene.add.container();

    const background = scene.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0x000000, 0.7)
        .setOrigin(0.5)
        .setStrokeStyle(2, 0xffffff)
        .setDepth(1000);

    const textStyle = {
        fontFamily: "Arial",
        fontSize: "14px",
        wordWrap: { width: boxWidth - 40 },
        color: "#ffffff",
        align: "left"
    };

    const content = scene.add.text(boxX - boxWidth / 2 + 20, boxY - boxHeight / 2 + 10, text, textStyle)
        .setOrigin(0, 0)
        .setDepth(1001);

    scene.messageBox.add([background, content]); 

    console.log("Exibindo mensagem:", text);

    scene.input.keyboard.once('keydown-ENTER', () => {
        scene.dialogIndex++;
        if (scene.dialogIndex < scene.dialogs.length) {
            systemMessage(scene, scene.dialogs[scene.dialogIndex]);
        } else {
            scene.messageBox.destroy();
            GameState.setTutorialSeen(true);
            scene.tutorialActive = false;
        }
    });
}
