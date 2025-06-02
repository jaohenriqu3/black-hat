let coffeeTutorialSeen = false;
let lobbyIntroSeen = false;

const GameState = {
    data: {
        chapter: 0,
        currentScene: "Lobby",
        core: 10,
        maxCore: 10,
        coins: {
            delfir: 800,
            ditcoin: 0,
            ficha: 0
        },
        tutorialSeen: false, 
        currentChapter: 1,
    },

    coffeTutorialDialog: [ 
    "A boa e velha cafeteria de Delfi City, nossa segunda casa, longe de bugs e legs... Use as setas do teclado (⬅️➡️⬆️⬇️) para andar pelo ambiente e vá até o balcão para fazer o pedido",
    ], 

    coffeAtendentDialog: [
        "Atendente: “O de sempre, Dante? Um café forte para começar o dia ?”",
        "Dante: “Com certeza! dia cheio...”", 
        "Atendente: “Suas olheiras não mentem... aqui está! por conta da casa!”"
    ], 

    coffeAtendentDialog2: [
        "Dante: Olá, um café forte, por favor",
        "Atendente: Claro, fica 5 delfirs ", 
        "Aqui está, obrigado"
    ], 

    coffeAtendentDialog3: [
        "Dante: Olá, um café forte, por favor",
        "Atendente: Claro, fica 15 delfirs ", 
        "Dante: Preços subindo?",
        "Atendente: Sim, as coisas ficaram difíceis depois desse ataques do tal BlackNest",
        "Dante: Fiquei sabendo... aqui está"
    ], 

    coffeAtendentDialog4: [
        "Dante: Olá, um café forte, por favor",
        "Atendente: Claro, fica 40 delfirs ",
        "Dante: Nossa, os preços subiram muito...", 
        "Atendente: Pois é, a crise de Delfi City está absurda"
    ], 


    lobbyDialog: [ 
        "Essa é sua casa, o hackerspace perfeito para resolver os problemas de Delfi City, no seu computador você pode acessar suas tasks nos capítulos estabelecidos, além de poder comprar delfirs e checar as notícias"
    ], 

    chapter1CutsceneDialog: [
        "Na TV só se fala apenas de uma coisa, o lançamento da nova IA da Doodle, DIANA, que promete revolucionar a vida dos cidadãos de Delfi City.",
        "Dante: Hmmm... Muita coincidencia, andei investigando sobre um vazemento de dados que ocorreu recentemente em Delfi City, sobre isso a mídia não fala... com certeza a Doodle e o lançamento dessa nova IA está por trás disso, é melhor eu ir atrás de mais informações."
    ],

    doodleDialog: [
        "Dante: Muito investimento e promessas estão sendo aplicadas a essa IA, é realmente uma grande mudança para a tecnologia da cidade, monitoramento, controle de dados, reconhecimento facial, tudo isso vai entrar em nosso cotidiano...",
        "Dante: Eu preciso saber o que está acontecendo por debaixo dos panos, deve ter um Data Center e uma base de redes em algum lugar...",
        "Ache o Data Center"
    ],

    dataCenterDialog: [
        "Hackeie a base de Dados da Doodle, conecte os circuitos e veja se tem algo no caminho entre a transmição de dados "
    ],

    gameOverCap1Dialog: [
        "Você não está sozinho, o BlackNest está de olho em você"
    ], 

    corvusAttackDialog: [ 
        "Corvus: Atenção cidadãos de Delfi City, A doodle mentiu para voçês, Os dados da cidade foram roubados. Usados para lucrar. Para controlar vocês. Victor Drumand e sua DIANA jogaram sujo. Mas agora, o jogo acabou. Delfi City, prepare-se. O show começará em breve, o Black Nest te mostrará a verdade"
    ], 

    delfirNewsDialog: [
        "Com a exposição e confusão causada pelo BlackNest, a IboDelfi sentiu o impacto e a economia da cidade foi por água abaixo, nossa moeda está cada vez mais desvalorizada, o colapso realmente começou...",
        "É uma ótima hora para começar a investir em Ditcoins..."
    ], 

    iboDelfiDifalog: [
        "Vá até o balcão para abrir uma carteira de criptoativos na IboDelfi"
    ], 

    iboDelfiAttendentDialog: [
        "Atendente: Boa tarde, senhor. Devido à situação atual, estamos operando com algumas restrições. Como posso ajudá-lo?", 
        "Dante: Preciso criar uma carteira de investimentos em criptoativos. Quero aproveitar o momento de alta.", 
        "Atendente: Entendido. quanto você gostaria de aplicar para começar a investir?", 
        "Dante: 500 Delfirs", 
        "Atendente: Perfeito, sua carteira já está em funcionamento",
        "Dante: Obrigado, a gerencia está disponível? tenho umas informações que podem ser uteis para lidar com o caos que estamos enfrentando",
        "Atendente: Não está, mas nesse caso, podemos abrir uma exceção, o escritório da Maya fica na próxima porta a direita",
        "Va até o escritório"
    ],

    iboDelfiDialog2: [
        "Vá até o escritório da Maya",
    ],

    iboOfficeDialog: [
        "Maya Rios: (desligando o telefone, impaciente) — Se você for mais um investidor exigindo respostas, estou sem tempo.",
        "Dante: Não sou investidor. Mas tenho algo que você precisa ver. (Entrega um pendrive com os registros das transações anômalas.)",
        "Maya: Isso... isso não pode estar certo. De onde você conseguiu essas informações?",
        "Dante: Isso não importa. O que importa é que esse esquema foi arquitetado para drenar a economia da cidade. Essas carteiras estão desviando bilhões.", 
        "Maya: Isso explica por que os bancos estão congelando transações e os investidores estão surtando. Alguém está destruindo o sistema de dentro para fora.",
        "Dante: Exato. E não são apenas ataques aleatórios. Há um padrão. E eu sei quem está por trás disso.",
        "Maya: Quem?",
        "Dante: Um grupo chamado BlackNest.",
        "Maya: Se eles estão por trás disso, então nada do que fizermos aqui dentro será seguro. Eles podem estar monitorando todas as nossas ações.", 
        "Dante: Então eu preciso agir antes que eles sumam com o dinheiro e deixem essa cidade em cinzas.",
        "Maya: (Respira fundo) Eu não deveria confiar em você. Mas agora mesmo, você é a única pessoa que trouxe algo concreto. Apenas toma cuidado, eles podem estar observando você",
        "Dante: Obrigado "
    ], 

    cassinoCutDialog: [
        "Com a economia destruída, a população recorre ao cassino como última esperança de ganhar dinheiro. Porém, Dante descobre uma relação entre o cassino e a hiper-valorização do Ditcoin"
    ],

    cassino2CutDialog: [
        "Slots, cartas e drinks, o cassino de Delfi City está cada vez mais lotado, vamos ver o que está por trás disso tudo"
    ],

    cassinoSystemDialog: [
        "Ache alguém disposto a conversar sobre os jogos "
    ],

    cassinoPlayerDialog: [
        "Dante:  Noite difícil, hein?",
        "Apostador: Você nem imagina... perdi tudo, cara. O que mais posso fazer? O dinheiro de Delfi City não vale mais nada.",
        "Dante: Então por que continuar apostando?",
        "Apostador: (ri amargamente) — Porque aqui, se você joga com DitCoin, pode dobrar sua vida do dia pra noite. Mas se perder... Bem, digamos que o cassino não gosta de devedores.",
        "Dante: Você tem trocando moeda local por DitCoin?",
        "Apostador: Amigo, neste lugar, o dinheiro de papel vale menos do que uma ficha de pôquer. O cassino está rodando na base do DitCoin agora.",
        "Dante: Entendi, realmente não está dando para comprar muita coisa com Delfirs.",
        "Va até o escritório do cassino"
    ], 

    maxDialog: [
        "Max: Um novo jogador em minha casa? Ou um homem com perguntas demais?",
        "Dante: Só um curioso tentando entender como você transformou essa crise no seu maior lucro da história.",
        "Max: Isso se chama oportunidade, garoto. O mundo está desmoronando lá fora, mas aqui dentro? Aqui dentro, as regras são simples. Você joga, você ganha, você perde. E eu? Eu apenas faço meu trabalho.",
        "Dante: E parte desse trabalho inclui ajudar o BlackNest?",
        "Max: Eu administro um cassino, não uma conspiração global. Mas digamos que... certas pessoas façam negócios por aqui. Isso não significa que eu esteja envolvido.",
        "Dante: Você permite que o BlackNest manipule a economia dentro do seu cassino. Você realmente não vê um problema nisso?",
        "Max: Problema? O único problema que vejo são pessoas que fazem perguntas demais. Mas, como sou um homem generoso, vou lhe dar um aviso: esse jogo que você está jogando? Cuidado para não apostar alto demais.",
        "Volte para o Cassino"
    ],

    cassinoOfficeSystem: [
        "Volte para o Cassino"
    ],

    cassinoSystemDialog2: [
        "Encontre um membro do BlackNest infiltrado e se aproxime para pegar o endereçamento de ip com seu dispositivo de hackeamento"
    ], 

    blackNestMemberDialog: [
        "Dante: Muito trabalho por aqui?",
        "???: Bastante, cuidar da infra e da rede do cassino da mais trabalho do que imaginei",
        "Dante: Imagino...",
        "[IP obtido] Vá até o bar para usar o dispositivo de hackeamento disfarçadamente"
    ],

    cassinoBarDialog: [
        "BarTender: Boa noite senhor, gostaria de tomar algo?",
        "Dante: Hoje não, obrigado, só vim mandar uma mensagem pra minha esposa",
        "BarTender: Fique a vontade"
    ], 

    chapter3NexusDialog: [
        "Dante: “Raven_Nest” não é apenas um codinome. É um local físico.",
        "Dante: Isso significa que o próximo grande evento do BlackNest ocorrerá no esconderijo deles. O cassino era apenas uma peça do tabuleiro",
        "Dante: Calma aí... tem mais...",
        "Dante: O cassino não era o fim da linha. Era apenas um elo. O dinheiro desviado estava financiando algo oculto sob a cidade – um sistema chamado Nexus Grid.",
        "Dante: O Node Central… É lá que está o Covil do BlackNest. E está diretamente ligado aos túneis sob a Doodle"
    ], 

    corvusDialog: 
    [
        "Corvus: Então você conseguiu, Dante. Sempre admirei sua determinação. Mas você nunca entendeu... não sou seu inimigo. O verdadeiro inimigo está lá fora – explorando, vigiando e manipulando tudo que você vê.",
        "Dante: Você pode pintar sua causa como nobre, mas suas ações mergulharam Delfi City no caos. Pessoas estão sofrendo.",
        "Corvus:E você acha que elas não estavam sofrendo antes? Você vê o que está diante dos seus olhos, mas eu vejo o que está por trás das cortinas.",
        "Corvus: A Doodle e o governo sempre controlaram tudo: o que as pessoas veem, o que compram, onde podem ir. O DitCoin foi apenas o primeiro passo para expor esse sistema podre.",
        "Dante: Você jogou com a economia da cidade como se fosse um tabuleiro de xadrez. Fez pessoas perderem tudo. Isso não é libertação, é destruição.",
        "Corvus: Destruir? Não. Reconstruir. O DitCoin foi necessário para enfraquecer a economia centralizada e financiar a verdadeira revolução: uma internet descentralizada, sem censura, sem monopólios.",
        "Corvus: Um sistema onde o poder está nas mãos das pessoas, e não nas corporações. O que estamos prestes a ativar mudará tudo.",
        "Dante: O que exatamente vocês estão prestes a ativar?",
        "Corvus: A verdadeira liberdade, Dante. Vamos liberar a rede descentralizada. Isso apagará todas as dívidas, registros governamentais, contas bancárias...",
        "Corvus: A cidade vai cair em colapso por um tempo, sim, mas apenas para se reerguer mais forte, sem correntes. Delfi City será o epicentro da nova era digital. Livre de qualquer interferência do governo e de qualquer big tech",
        "Corvus: Mas tudo isso não vai ser feito de uma hora pra outra... preciso de tempo e de pessoas como você, então vou te dar uma escolha...",
    ],

    final1Dialog: [
        "A polícia invade o Covil do BlackNest e prende os membros.", 
        "As notícias celebram Dante como um salvador: “o homem que deteve o BlackNest e salvou Delfi City”",
        "Porém... as instituições voltam a operar como antes.",
        "Dante reflete sobre tudo que passou... enquanto pensa no próximo passo para tirar Delfi City do caos.",
    ], 

    final2Dialog: [
        "A internet descentralizada é ativada, e Delfi City mergulha no caos", 
        "O BlackNest assume o controle total",
        "Dante e corvus observam a sociedade se reorganizar lentamente, enquanto são as duas pessoas mais procuradas de Delfi City"
    ],
    

    // Capítulo
    setChapter(chapter) {
        this.currentChapter = chapter;
    },

    getChapter() {
        return this.currentChapter;
    },

    //Cena
    setScene(sceneKey) {
        this.data.currentScene = sceneKey;
        this.save();
    },

    getScene() {
        return this.data.currentScene;
    },

    // Core
    setCore(value) {
        this.data.core = Phaser.Math.Clamp(value, 0, this.data.maxCore);
        this.save();
    },

    modifyCore(amount) {
        this.setCore(this.data.core + amount);
    },

    resetCore() {
        this.setCore(this.data.maxCore);
    }, 

    loseCore() {
        if (this.data.core > 0) {
            this.data.core--;
            this.save();
        }
    }, 

    loseAllCore() {
        if (this.data.core > 0) {
            this.data.core - 10;
            this.save();
        }
    },
    
    getCore() {
        return this.data.core;
    },

    // Moedas
    getMaxCore() {
        return this.data.maxCore;
    },

    addCoins(type, amount) {
        if (this.data.coins[type] !== undefined) {
            this.data.coins[type] += amount;
            this.save();
        }
    },

    setCoins(type, value) {
        if (this.data.coins[type] !== undefined) {
            this.data.coins[type] = value;
            this.save();
        }
    },

    getCoins(type) {
        return this.data.coins[type] || 0;
    },

    resetCoins() {
        this.data.coins = {
            delfir: 800,
            ditcoin: 0,
            ficha: 0
        };
        this.save();
    },

    save() {
        localStorage.setItem("blackHatSave", JSON.stringify(this.data));
    },

    load() {
        const saved = localStorage.getItem("blackHatSave");
        if (saved) {
            this.data = JSON.parse(saved);
        }
    },

    resetAll() {
        this.data = {
            chapter: 0,
            currentScene: "Lobby",
            core: 10,
            maxCore: 10,
            coins: {
                delfir: 800,
                ditcoin: 0,
                ficha: 0
            },
        };
        this.save();
    }
};

export default GameState;
