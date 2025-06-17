import GameState from "../../state/gameState.js";

export const delfiCityDialog = [
  "Essa é Delfi City, uma cidade tranquila e amigável, referéncia como polo de tecnologia e inovações digitais, onde cada código é uma história, cada sistema é um universo e cada rede é uma conexão, uma cidade que intercala entre o fisíco e o cibernético diariamente. Explore Delfi City e veja o que ela tem a lhe mostrar!",
  "Dante é um profissional de CyberSegurança, sua vida resume apenas em encontrar falhas e vulnerabilidade em sistemas, e claro, nunca dispensa um bom café...",
];

const defaultConfig = {
  boxWidth: 1100,
  boxHeight: 80,
  boxX: 700,
  boxY: 200,
  fontSize: "18px",
};

const sceneConfigs = {
  Level: { boxY: 650, labelX: 920, labelY: 60 },
  Coffe: { boxWidth: 500, boxHeight: 65, boxY: 520, fontSize: "14px", labelX: 320, labelY: 45 },
  Lobby: { boxWidth: 500, boxHeight: 80, boxY: 500, fontSize: "14px", labelX: 320, labelY: 60 },
  DantePC: { boxWidth: 1250, boxHeight: 100, boxY: -110 },
  Chapter1Cutscene: { boxWidth: 1250, boxHeight: 100, boxY: -110, labelX: 1050, labelY: 80 },
  Chapter1GameOver: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Chapter1Corvus: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Chapter2Cutscene: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Chapter2Cassino: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Chapter3Cutscene: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Chapter3Nexus: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Final1: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Final2: { boxWidth: 1250, boxHeight: 100, boxY: -110, fontSize: "22px", labelX: 1050, labelY: 80 },
  Doodle: { boxWidth: 550, boxHeight: 80, boxY: 520, fontSize: "14px", labelX: 360, labelY: 60 },
  DataCenter: { boxWidth: 450, boxHeight: 60, boxY: 520, fontSize: "14px", labelX: 270, labelY: 42 },
  IboDelfi: { boxWidth: 450, boxHeight: 60, boxY: 520, fontSize: "14px", labelX: 270, labelY: 42 },
  IboOffice: { boxWidth: 500, boxHeight: 60, boxY: 520, fontSize: "14px", labelX: 320, labelY: 42 },
  Cassino: { boxWidth: 550, boxHeight: 65, boxY: 520, fontSize: "14px", labelX: 360, labelY: 45 },
  CassinoOffice: { boxWidth: 550, boxHeight: 65, boxY: 520, fontSize: "14px", labelX: 360, labelY: 45 },
  BlackOffice: { boxWidth: 500, boxHeight: 75, boxY: 520, fontSize: "14px", labelX: 320, labelY: 58 },
};

export default function systemMessage(scene, text) {
  if (scene.messageBox) scene.messageBox.destroy();

  const { width, height } = scene.cameras.main;
  const key = scene.scene.key;''

  const config = { ...defaultConfig, ...sceneConfigs[key] };

  const boxX = config.boxX ?? width / 2;
  const boxY = config.boxY < 0 ? height + config.boxY : config.boxY;

  scene.messageBox = scene.add.container().setDepth(1003);
  scene.children.bringToTop(scene.messageBox);

  const background = scene.add.rectangle(
    boxX, boxY, config.boxWidth, config.boxHeight, 0xffffff, 0.9
  ).setOrigin(0.5)
   .setStrokeStyle(2, 0x000000)
   .setDepth(1000)
   .setScrollFactor(0);

  const textStyle = {
    fontFamily: "Arial",
    fontSize: config.fontSize,
    wordWrap: { width: config.boxWidth - 40 },
    color: "#000000",
    align: "left",
    delay: 90,
  };

  const labelStyle = {
    fontFamily: "Arial",
    fontSize: "12px",
    wordWrap: { width: config.boxWidth - 40 },
    color: "#000000",
    align: "left",
    delay: 90,
  };

  const content = scene.add.text(
    boxX - config.boxWidth / 2 + 20,
    boxY - config.boxHeight / 2 + 10,
    text,
    textStyle
  ).setOrigin(0, 0)
   .setDepth(1001)
   .setScrollFactor(0);

  const label = scene.add.text(
    boxX - config.boxWidth / 2 + config.labelX,
    boxY - config.boxHeight / 2 + config.labelY,
    "Pressione ENTER para avançar",
    labelStyle
  ).setOrigin(0, 0)
   .setDepth(1002)
   .setScrollFactor(0);

  scene.messageBox.add([background, content, label]);

  console.log("Exibindo mensagem:", text);

  return scene.messageBox;
}
