/* Regras das três Lendas jogáveis — lógica independente da interface */
(function(){'use strict';
const {Core}=window.DOL;
const species={
 flarim:{id:'flarim',name:'Flarim',type:'fogo',label:'FOGO',role:'Investida e chamas',sub:'A chama que não teme a escuridão',lore:'Rápido, destemido e inquieto. Flarim guarda uma centelha da Primeira Luz em sua cauda. Seu entusiasmo pode iluminar os caminhos mais difíceis.',image:'assets/lendas/flarim.png',color:'#ffad6b',glow:'rgba(242,119,76,.34)',base:{hp:52,energy:32,attack:19,defense:11,speed:21},skills:[{id:'f1',name:'Garra Incandescente',cost:0,power:23,effect:'',desc:'Ataque direto de fogo.'},{id:'f2',name:'Fulgor Escarlate',cost:9,power:38,effect:'burn',desc:'Ataque forte · pode queimar.'},{id:'f3',name:'Manto de Brasas',cost:7,power:0,effect:'shield',desc:'Cria escudo protetor.'},{id:'f4',name:'Chama Interior',cost:10,power:0,effect:'heal',desc:'Recupera vida e energia.'}]},
 aqualin:{id:'aqualin',name:'Aqualin',type:'agua',label:'ÁGUA',role:'Fluxo e proteção',sub:'A corrente que conduz a esperança',lore:'Sereno e observador, Aqualin percebe as mudanças da água antes de todos. Suas nadadeiras espalham correntes luminosas que protegem seus aliados.',image:'assets/lendas/aqualin.svg',color:'#8de8f2',glow:'rgba(88,187,239,.32)',base:{hp:64,energy:39,attack:16,defense:15,speed:16},skills:[{id:'a1',name:'Jato das Marés',cost:0,power:24,effect:'',desc:'Ataque fluido e preciso.'},{id:'a2',name:'Onda Abissal',cost:10,power:37,effect:'slow',desc:'Ataque forte · reduz o ímpeto.'},{id:'a3',name:'Névoa Restauradora',cost:9,power:0,effect:'heal',desc:'Recupera vida e energia.'},{id:'a4',name:'Bolha Guardiã',cost:6,power:0,effect:'shield',desc:'Cria escudo aquático.'}]},
 terron:{id:'terron',name:'Terron',type:'terra',label:'TERRA',role:'Resistência e muralhas',sub:'O rochedo que sustenta a vida',lore:'Paciente e inabalável, Terron carrega pequenas plantas e inscrições antigas na carapaça. É o primeiro a se colocar entre seus amigos e o perigo.',image:'assets/lendas/terron.svg',color:'#c8e197',glow:'rgba(134,174,97,.31)',base:{hp:78,energy:30,attack:15,defense:23,speed:9},skills:[{id:'t1',name:'Investida Rochosa',cost:0,power:23,effect:'',desc:'Um golpe firme como pedra.'},{id:'t2',name:'Terremoto',cost:11,power:39,effect:'slow',desc:'Ataque forte · reduz o ímpeto.'},{id:'t3',name:'Muralha Viva',cost:7,power:0,effect:'shield',desc:'Cria um escudo rochoso.'},{id:'t4',name:'Raízes Restauradoras',cost:8,power:0,effect:'heal',desc:'Recupera vida e energia.'}]}
};

Object.assign(species,{
 "lavolvo": {
  "id": "lavolvo",
  "name": "Lavolvo",
  "type": "fogo",
  "label": "FOGO",
  "role": "Carapaça de magma",
  "sub": "Carapaça de magma",
  "lore": "Um tatu de pedra vulcânica que atravessa a rocha aquecida com suas garras de obsidiana.",
  "image": "assets/lendas/lavolvo.png",
  "color": "#ffba72",
  "glow": "rgba(255,126,55,.3)",
  "base": {
   "hp": 73,
   "energy": 28,
   "attack": 19,
   "defense": 23,
   "speed": 10
  },
  "price": {
   "coins": 125,
   "shards": 3,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "la1",
    "name": "Garra de Escória",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "la2",
    "name": "Fenda Magmática",
    "cost": 11,
    "power": 43,
    "effect": "burn",
    "desc": "Ataque e aplica burn."
   },
   {
    "id": "la3",
    "name": "Couraça de Lava",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "la4",
    "name": "Cinza Recuperadora",
    "cost": 10,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "cinerix": {
  "id": "cinerix",
  "name": "Cinérix",
  "type": "fogo",
  "label": "FOGO",
  "role": "Dança das brasas",
  "sub": "Dança das brasas",
  "lore": "Ave de longas pernas e asas escarlates que desenha espirais de fogo no céu noturno.",
  "image": "assets/lendas/cinerix.png",
  "color": "#ffba72",
  "glow": "rgba(255,126,55,.3)",
  "base": {
   "hp": 49,
   "energy": 43,
   "attack": 21,
   "defense": 10,
   "speed": 27
  },
  "price": {
   "coins": 135,
   "shards": 3,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "ci1",
    "name": "Bicada Solar",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "ci2",
    "name": "Chuva de Fagulhas",
    "cost": 12,
    "power": 42,
    "effect": "burn",
    "desc": "Ataque e aplica burn."
   },
   {
    "id": "ci3",
    "name": "Voo Restaurador",
    "cost": 9,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   },
   {
    "id": "ci4",
    "name": "Vento Ardente",
    "cost": 7,
    "power": 26,
    "effect": "slow",
    "desc": "Ataque e aplica slow."
   }
  ]
 },
 "nautyra": {
  "id": "nautyra",
  "name": "Nautyra",
  "type": "agua",
  "label": "ÁGUA",
  "role": "Marés ancestrais",
  "sub": "Marés ancestrais",
  "lore": "Pequeno cefalópode que abriga na concha translúcida o reflexo das marés antigas.",
  "image": "assets/lendas/nautyra.png",
  "color": "#8bdcf9",
  "glow": "rgba(83,176,224,.31)",
  "base": {
   "hp": 69,
   "energy": 45,
   "attack": 16,
   "defense": 21,
   "speed": 13
  },
  "price": {
   "coins": 150,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "na1",
    "name": "Jato de Tinta",
    "cost": 0,
    "power": 22,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "na2",
    "name": "Pulso Oceânico",
    "cost": 10,
    "power": 37,
    "effect": "slow",
    "desc": "Ataque e aplica slow."
   },
   {
    "id": "na3",
    "name": "Câmara de Coral",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "na4",
    "name": "Maré Curativa",
    "cost": 10,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "coravela": {
  "id": "coravela",
  "name": "Coravela",
  "type": "agua",
  "label": "ÁGUA",
  "role": "Espinhais de coral",
  "sub": "Espinhais de coral",
  "lore": "Dragão-marinho gracioso com barbatanas como velas e um jardim de corais vivos.",
  "image": "assets/lendas/coravela.png",
  "color": "#8bdcf9",
  "glow": "rgba(83,176,224,.31)",
  "base": {
   "hp": 60,
   "energy": 43,
   "attack": 18,
   "defense": 16,
   "speed": 20
  },
  "price": {
   "coins": 180,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "co1",
    "name": "Agulha Marinha",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "co2",
    "name": "Vórtice de Coral",
    "cost": 12,
    "power": 42,
    "effect": "slow",
    "desc": "Ataque e aplica slow."
   },
   {
    "id": "co3",
    "name": "Turbilhão Restaurador",
    "cost": 10,
    "power": 0,
    "effect": "regen",
    "desc": "Técnica de suporte."
   },
   {
    "id": "co4",
    "name": "Escama do Recife",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "brontmus": {
  "id": "brontmus",
  "name": "Brontmus",
  "type": "terra",
  "label": "TERRA",
  "role": "Protetor do bosque",
  "sub": "Protetor do bosque",
  "lore": "Bisão monumental cujos chifres de madeira e musgo abrigam pequenos cogumelos.",
  "image": "assets/lendas/brontmus.png",
  "color": "#b8d89d",
  "glow": "rgba(155,187,110,.3)",
  "base": {
   "hp": 89,
   "energy": 29,
   "attack": 18,
   "defense": 25,
   "speed": 8
  },
  "price": {
   "coins": 220,
   "shards": 5,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "br1",
    "name": "Carga Silvestre",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "br2",
    "name": "Impacto Raiz",
    "cost": 11,
    "power": 42,
    "effect": "slow",
    "desc": "Ataque e aplica slow."
   },
   {
    "id": "br3",
    "name": "Raízes Guardiãs",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "br4",
    "name": "Seiva da Floresta",
    "cost": 10,
    "power": 0,
    "effect": "regen",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "cristrix": {
  "id": "cristrix",
  "name": "Cristrix",
  "type": "terra",
  "label": "TERRA",
  "role": "Gecko cristalino",
  "sub": "Gecko cristalino",
  "lore": "Lagarto baixo e veloz; cristais esmeralda crescem ao longo de suas costas.",
  "image": "assets/lendas/cristrix.svg",
  "color": "#b8d89d",
  "glow": "rgba(155,187,110,.3)",
  "base": {
   "hp": 57,
   "energy": 38,
   "attack": 21,
   "defense": 17,
   "speed": 23
  },
  "price": {
   "coins": 190,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "cr1",
    "name": "Mordida de Quartzo",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "cr2",
    "name": "Estilhaço Verde",
    "cost": 11,
    "power": 41,
    "effect": "poison",
    "desc": "Ataque e aplica poison."
   },
   {
    "id": "cr3",
    "name": "Pele Mineral",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "cr4",
    "name": "Regeneração Geológica",
    "cost": 10,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "zephira": {
  "id": "zephira",
  "name": "Zephira",
  "type": "ar",
  "label": "AR",
  "role": "Manta dos ventos",
  "sub": "Manta dos ventos",
  "lore": "Arraia voadora de asas imensas que plana sobre cânions sem fazer um único som.",
  "image": "assets/lendas/zephira.svg",
  "color": "#c6e9ff",
  "glow": "rgba(132,201,246,.3)",
  "base": {
   "hp": 52,
   "energy": 45,
   "attack": 19,
   "defense": 12,
   "speed": 28
  },
  "price": {
   "coins": 170,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "ze1",
    "name": "Corte de Brisa",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "ze2",
    "name": "Ciclone Alto",
    "cost": 11,
    "power": 40,
    "effect": "slow",
    "desc": "Ataque e aplica slow."
   },
   {
    "id": "ze3",
    "name": "Abrigo de Nuvens",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "ze4",
    "name": "Fluxo Revigorante",
    "cost": 9,
    "power": 0,
    "effect": "regen",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "auravio": {
  "id": "auravio",
  "name": "Aurávio",
  "type": "ar",
  "label": "AR",
  "role": "Coruja do firmamento",
  "sub": "Coruja do firmamento",
  "lore": "Coruja crepuscular de olhos redondos que observa os fluxos aéreos nas montanhas.",
  "image": "assets/lendas/auravio.svg",
  "color": "#c6e9ff",
  "glow": "rgba(132,201,246,.3)",
  "base": {
   "hp": 63,
   "energy": 40,
   "attack": 17,
   "defense": 17,
   "speed": 22
  },
  "price": {
   "coins": 205,
   "shards": 5,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "au1",
    "name": "Rajada de Plumas",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "au2",
    "name": "Turbilhão Lunar",
    "cost": 11,
    "power": 41,
    "effect": "paralysis",
    "desc": "Ataque e aplica paralysis."
   },
   {
    "id": "au3",
    "name": "Asas de Guarda",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "au4",
    "name": "Vigília Revigorante",
    "cost": 9,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "fulgarra": {
  "id": "fulgarra",
  "name": "Fulgarra",
  "type": "eletrico",
  "label": "ELÉTRICO",
  "role": "Besouro-tempestade",
  "sub": "Besouro-tempestade",
  "lore": "Besouro encouraçado de chifre dividido que guarda relâmpagos entre suas placas.",
  "image": "assets/lendas/fulgarra.svg",
  "color": "#ffe178",
  "glow": "rgba(248,201,91,.3)",
  "base": {
   "hp": 75,
   "energy": 32,
   "attack": 23,
   "defense": 22,
   "speed": 12
  },
  "price": {
   "coins": 250,
   "shards": 6,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "fu1",
    "name": "Chifre Estático",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "fu2",
    "name": "Descarga Trovejante",
    "cost": 12,
    "power": 43,
    "effect": "paralysis",
    "desc": "Ataque e aplica paralysis."
   },
   {
    "id": "fu3",
    "name": "Carapaça Isolante",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "fu4",
    "name": "Polarização",
    "cost": 10,
    "power": 0,
    "effect": "regen",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "faiscote": {
  "id": "faiscote",
  "name": "Faiscote",
  "type": "eletrico",
  "label": "ELÉTRICO",
  "role": "Lebre-relâmpago",
  "sub": "Lebre-relâmpago",
  "lore": "Lebre inquieta com orelhas como antenas e patas que estalam durante a corrida.",
  "image": "assets/lendas/faiscote.svg",
  "color": "#ffe178",
  "glow": "rgba(248,201,91,.3)",
  "base": {
   "hp": 50,
   "energy": 40,
   "attack": 22,
   "defense": 11,
   "speed": 29
  },
  "price": {
   "coins": 240,
   "shards": 6,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "fa1",
    "name": "Patada Elétrica",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "fa2",
    "name": "Salto de Tensão",
    "cost": 10,
    "power": 40,
    "effect": "paralysis",
    "desc": "Ataque e aplica paralysis."
   },
   {
    "id": "fa3",
    "name": "Impulso Luminoso",
    "cost": 7,
    "power": 27,
    "effect": "slow",
    "desc": "Ataque e aplica slow."
   },
   {
    "id": "fa4",
    "name": "Carga Vital",
    "cost": 9,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "petalume": {
  "id": "petalume",
  "name": "Petalume",
  "type": "fada",
  "label": "FADA",
  "role": "Cervo das flores",
  "sub": "Cervo das flores",
  "lore": "Um cervo feérico de pequenas galhadas florais que faz jardins brotarem à noite.",
  "image": "assets/lendas/petalume.svg",
  "color": "#f7c5eb",
  "glow": "rgba(235,131,212,.3)",
  "base": {
   "hp": 64,
   "energy": 44,
   "attack": 17,
   "defense": 17,
   "speed": 19
  },
  "price": {
   "coins": 300,
   "shards": 7,
   "diamonds": 8
  },
  "skills": [
   {
    "id": "pe1",
    "name": "Pétalas Cortantes",
    "cost": 0,
    "power": 23,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "pe2",
    "name": "Flor do Encanto",
    "cost": 12,
    "power": 40,
    "effect": "poison",
    "desc": "Ataque e aplica poison."
   },
   {
    "id": "pe3",
    "name": "Jardim Sereno",
    "cost": 10,
    "power": 0,
    "effect": "regen",
    "desc": "Técnica de suporte."
   },
   {
    "id": "pe4",
    "name": "Véu de Pétalas",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "miralume": {
  "id": "miralume",
  "name": "Miralume",
  "type": "fada",
  "label": "FADA",
  "role": "Mariposa-lanterna",
  "sub": "Mariposa-lanterna",
  "lore": "Mariposa encantada cujas asas deixam constelações coloridas no ar.",
  "image": "assets/lendas/miralume.svg",
  "color": "#f7c5eb",
  "glow": "rgba(235,131,212,.3)",
  "base": {
   "hp": 55,
   "energy": 50,
   "attack": 19,
   "defense": 13,
   "speed": 23
  },
  "price": {
   "coins": 320,
   "shards": 7,
   "diamonds": 10
  },
  "skills": [
   {
    "id": "mi1",
    "name": "Pó Estelar",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "mi2",
    "name": "Espiral da Lua",
    "cost": 12,
    "power": 41,
    "effect": "paralysis",
    "desc": "Ataque e aplica paralysis."
   },
   {
    "id": "mi3",
    "name": "Luz Reparadora",
    "cost": 10,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   },
   {
    "id": "mi4",
    "name": "Casulo Luminoso",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "nocira": {
  "id": "nocira",
  "name": "Nocira",
  "type": "sombras",
  "label": "SOMBRAS",
  "role": "Aranha de ametista",
  "sub": "Aranha de ametista",
  "lore": "Aranha ancestral com abdômen de cristal que tece linhas entre sonhos esquecidos.",
  "image": "assets/lendas/nocira.svg",
  "color": "#d3a6ff",
  "glow": "rgba(161,109,215,.3)",
  "base": {
   "hp": 62,
   "energy": 38,
   "attack": 21,
   "defense": 17,
   "speed": 20
  },
  "price": {
   "coins": 360,
   "shards": 8,
   "diamonds": 12
  },
  "skills": [
   {
    "id": "no1",
    "name": "Teia Cortante",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "no2",
    "name": "Veneno Onírico",
    "cost": 11,
    "power": 40,
    "effect": "poison",
    "desc": "Ataque e aplica poison."
   },
   {
    "id": "no3",
    "name": "Casulo da Névoa",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "no4",
    "name": "Trama de Sombra",
    "cost": 9,
    "power": 0,
    "effect": "regen",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "corvumbra": {
  "id": "corvumbra",
  "name": "Corvumbra",
  "type": "sombras",
  "label": "SOMBRAS",
  "role": "Corvo do ocaso",
  "sub": "Corvo do ocaso",
  "lore": "Corvo alto de penas negras, bico alongado e passos silenciosos entre ruínas.",
  "image": "assets/lendas/corvumbra.svg",
  "color": "#d3a6ff",
  "glow": "rgba(161,109,215,.3)",
  "base": {
   "hp": 53,
   "energy": 43,
   "attack": 22,
   "defense": 12,
   "speed": 27
  },
  "price": {
   "coins": 380,
   "shards": 8,
   "diamonds": 15
  },
  "skills": [
   {
    "id": "co1",
    "name": "Bico do Crepúsculo",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "co2",
    "name": "Corte Noturno",
    "cost": 12,
    "power": 43,
    "effect": "poison",
    "desc": "Ataque e aplica poison."
   },
   {
    "id": "co3",
    "name": "Asa Silenciosa",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   },
   {
    "id": "co4",
    "name": "Sussurro Sombrio",
    "cost": 10,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   }
  ]
 },
 "velmora": {
  "id": "velmora",
  "name": "Velmora",
  "type": "sombras",
  "label": "SOMBRAS",
  "role": "Espectro das marés",
  "sub": "Espectro das marés",
  "lore": "Ser flutuante de véu translúcido e tentáculos cintilantes que surge no nevoeiro.",
  "image": "assets/lendas/velmora.svg",
  "color": "#d3a6ff",
  "glow": "rgba(161,109,215,.3)",
  "base": {
   "hp": 66,
   "energy": 48,
   "attack": 20,
   "defense": 18,
   "speed": 17
  },
  "price": {
   "coins": 430,
   "shards": 9,
   "diamonds": 18
  },
  "skills": [
   {
    "id": "ve1",
    "name": "Toque do Véu",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Técnica ofensiva."
   },
   {
    "id": "ve2",
    "name": "Eclipse Fluido",
    "cost": 12,
    "power": 42,
    "effect": "paralysis",
    "desc": "Ataque e aplica paralysis."
   },
   {
    "id": "ve3",
    "name": "Névoa Restauradora",
    "cost": 10,
    "power": 0,
    "effect": "heal",
    "desc": "Técnica de suporte."
   },
   {
    "id": "ve4",
    "name": "Manto do Abismo",
    "cost": 9,
    "power": 0,
    "effect": "shield",
    "desc": "Técnica de suporte."
   }
  ]
 }
});
// Doze novas espécies originais; cada arte é um arquivo independente.
Object.assign(species,{
 "ignekar": {
  "id": "ignekar",
  "name": "Ignekar",
  "type": "fogo",
  "label": "FOGO",
  "role": "Dragão-fornalha",
  "sub": "Dragão-fornalha",
  "lore": "Uma criatura vulcânica de corpo dracônico. O calor acumulado em suas placas de obsidiana alimenta rajadas de chamas.",
  "image": "assets/lendas/ignekar.png",
  "color": "#ffbd71",
  "glow": "rgba(255,134,79,.32)",
  "base": {
   "hp": 65,
   "energy": 34,
   "attack": 24,
   "defense": 15,
   "speed": 17
  },
  "price": {
   "coins": 175,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "ign1",
    "name": "Presa Vulcânica",
    "cost": 0,
    "power": 26,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "ign2",
    "name": "Erupção Ressonante",
    "cost": 13,
    "power": 44,
    "effect": "burn",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "ign3",
    "name": "Vigor Incandescente",
    "cost": 8,
    "power": 0,
    "effect": "focus",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "ign4",
    "name": "Sopro de Cinzas",
    "cost": 7,
    "power": 27,
    "effect": "weak",
    "desc": "Ataque elemental com efeito especial."
   }
  ]
 },
 "ocearco": {
  "id": "ocearco",
  "name": "Ocearco",
  "type": "agua",
  "label": "ÁGUA",
  "role": "Caçador das correntes",
  "sub": "Caçador das correntes",
  "lore": "Um predador das correntes oceânicas que rasga a água com barbatanas cristalinas.",
  "image": "assets/lendas/ocearco.png",
  "color": "#88dbf8",
  "glow": "rgba(79,168,224,.32)",
  "base": {
   "hp": 57,
   "energy": 39,
   "attack": 22,
   "defense": 13,
   "speed": 26
  },
  "price": {
   "coins": 170,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "oce1",
    "name": "Mordida Marinha",
    "cost": 0,
    "power": 26,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "oce2",
    "name": "Maré Cortante",
    "cost": 11,
    "power": 42,
    "effect": "slow",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "oce3",
    "name": "Corrente Vital",
    "cost": 9,
    "power": 0,
    "effect": "regen",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "oce4",
    "name": "Mergulho Fantasma",
    "cost": 8,
    "power": 0,
    "effect": "evade",
    "desc": "Habilidade de suporte."
   }
  ]
 },
 "glacira": {
  "id": "glacira",
  "name": "Glacira",
  "type": "agua",
  "label": "ÁGUA",
  "role": "Guardião glacial",
  "sub": "Guardião glacial",
  "lore": "Uma fera de pelo azulado, cristais de gelo e fôlego invernal. Protege os rios gelados da Primeira Luz.",
  "image": "assets/lendas/glacira.png",
  "color": "#88dbf8",
  "glow": "rgba(79,168,224,.32)",
  "base": {
   "hp": 73,
   "energy": 40,
   "attack": 18,
   "defense": 22,
   "speed": 14
  },
  "price": {
   "coins": 175,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "gla1",
    "name": "Garras de Geada",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "gla2",
    "name": "Nevasca Lacerante",
    "cost": 11,
    "power": 39,
    "effect": "slow",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "gla3",
    "name": "Escudo Invernal",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "gla4",
    "name": "Orvalho Limpo",
    "cost": 9,
    "power": 0,
    "effect": "cleanse",
    "desc": "Habilidade de suporte."
   }
  ]
 },
 "granleon": {
  "id": "granleon",
  "name": "Granleon",
  "type": "terra",
  "label": "TERRA",
  "role": "Leão de cristal",
  "sub": "Leão de cristal",
  "lore": "Leão de rochas solares com juba mineral e cauda em forma de lasca de âmbar.",
  "image": "assets/lendas/granleon.png",
  "color": "#cee39b",
  "glow": "rgba(125,161,101,.31)",
  "base": {
   "hp": 78,
   "energy": 29,
   "attack": 24,
   "defense": 20,
   "speed": 12
  },
  "price": {
   "coins": 180,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "gra1",
    "name": "Garra de Quartzo",
    "cost": 0,
    "power": 26,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "gra2",
    "name": "Martelo Solar",
    "cost": 13,
    "power": 44,
    "effect": "pierce",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "gra3",
    "name": "Postura da Montanha",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "gra4",
    "name": "Pulso de Pedra",
    "cost": 7,
    "power": 27,
    "effect": "slow",
    "desc": "Ataque elemental com efeito especial."
   }
  ]
 },
 "musgarg": {
  "id": "musgarg",
  "name": "Musgarg",
  "type": "terra",
  "label": "TERRA",
  "role": "Réptil da mata ancestral",
  "sub": "Réptil da mata ancestral",
  "lore": "Réptil colossal com placas de pedra tomadas por musgos e raízes.",
  "image": "assets/lendas/musgarg.png",
  "color": "#cee39b",
  "glow": "rgba(125,161,101,.31)",
  "base": {
   "hp": 82,
   "energy": 35,
   "attack": 19,
   "defense": 26,
   "speed": 9
  },
  "price": {
   "coins": 190,
   "shards": 5,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "mus1",
    "name": "Cauda Petrificada",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "mus2",
    "name": "Ruptura do Solo",
    "cost": 12,
    "power": 43,
    "effect": "slow",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "mus3",
    "name": "Raízes de Cura",
    "cost": 9,
    "power": 0,
    "effect": "regen",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "mus4",
    "name": "Casca Ancestral",
    "cost": 8,
    "power": 0,
    "effect": "shield",
    "desc": "Habilidade de suporte."
   }
  ]
 },
 "virandor": {
  "id": "virandor",
  "name": "Virandor",
  "type": "ar",
  "label": "AR",
  "role": "Cervo das folhas aéreas",
  "sub": "Cervo das folhas aéreas",
  "lore": "Um cervo de penas e folhas que atravessa as copas sem tocar o chão.",
  "image": "assets/lendas/virandor.png",
  "color": "#cce7fa",
  "glow": "rgba(135,183,213,.29)",
  "base": {
   "hp": 61,
   "energy": 42,
   "attack": 19,
   "defense": 14,
   "speed": 25
  },
  "price": {
   "coins": 175,
   "shards": 4,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "vir1",
    "name": "Chifres de Brisa",
    "cost": 0,
    "power": 24,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "vir2",
    "name": "Ciclone Verde",
    "cost": 11,
    "power": 40,
    "effect": "weak",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "vir3",
    "name": "Vento Revigorante",
    "cost": 9,
    "power": 0,
    "effect": "heal",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "vir4",
    "name": "Passos de Nuvem",
    "cost": 8,
    "power": 0,
    "effect": "evade",
    "desc": "Habilidade de suporte."
   }
  ]
 },
 "aerogrif": {
  "id": "aerogrif",
  "name": "Aerogrif",
  "type": "ar",
  "label": "AR",
  "role": "Grifo da tempestade",
  "sub": "Grifo da tempestade",
  "lore": "Grifo de plumagem azul, garras poderosas e asas que fazem a atmosfera estremecer.",
  "image": "assets/lendas/aerogrif.png",
  "color": "#cce7fa",
  "glow": "rgba(135,183,213,.29)",
  "base": {
   "hp": 64,
   "energy": 37,
   "attack": 24,
   "defense": 14,
   "speed": 24
  },
  "price": {
   "coins": 195,
   "shards": 5,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "aer1",
    "name": "Garras do Céu",
    "cost": 0,
    "power": 27,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "aer2",
    "name": "Mergulho Tempestuoso",
    "cost": 12,
    "power": 46,
    "effect": "pierce",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "aer3",
    "name": "Olhos do Vendaval",
    "cost": 8,
    "power": 0,
    "effect": "focus",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "aer4",
    "name": "Sopro de Altitude",
    "cost": 8,
    "power": 27,
    "effect": "slow",
    "desc": "Ataque elemental com efeito especial."
   }
  ]
 },
 "voltaris": {
  "id": "voltaris",
  "name": "Voltaris",
  "type": "eletrico",
  "label": "ELÉTRICO",
  "role": "Ave relâmpago",
  "sub": "Ave relâmpago",
  "lore": "Ave serpentina que rasga nuvens de tempestade, deixando um rastro de faíscas douradas.",
  "image": "assets/lendas/voltaris.png",
  "color": "#ffe08b",
  "glow": "rgba(246,192,56,.3)",
  "base": {
   "hp": 53,
   "energy": 46,
   "attack": 23,
   "defense": 11,
   "speed": 29
  },
  "price": {
   "coins": 195,
   "shards": 5,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "vol1",
    "name": "Bicada Estática",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "vol2",
    "name": "Arco Celeste",
    "cost": 12,
    "power": 43,
    "effect": "paralysis",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "vol3",
    "name": "Carga Magnética",
    "cost": 8,
    "power": 0,
    "effect": "focus",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "vol4",
    "name": "Corte de Raio",
    "cost": 10,
    "power": 37,
    "effect": "pierce",
    "desc": "Ataque elemental com efeito especial."
   }
  ]
 },
 "relampor": {
  "id": "relampor",
  "name": "Relampor",
  "type": "eletrico",
  "label": "ELÉTRICO",
  "role": "Felino trovão",
  "sub": "Felino trovão",
  "lore": "Grande felino com presas reluzentes e correntes elétricas percorrendo a juba.",
  "image": "assets/lendas/relampor.png",
  "color": "#ffe08b",
  "glow": "rgba(246,192,56,.3)",
  "base": {
   "hp": 69,
   "energy": 35,
   "attack": 26,
   "defense": 16,
   "speed": 23
  },
  "price": {
   "coins": 210,
   "shards": 5,
   "diamonds": 0
  },
  "skills": [
   {
    "id": "rel1",
    "name": "Bote de Choque",
    "cost": 0,
    "power": 26,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "rel2",
    "name": "Trovão Rugidor",
    "cost": 13,
    "power": 46,
    "effect": "paralysis",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "rel3",
    "name": "Rugido Intimidante",
    "cost": 8,
    "power": 0,
    "effect": "weak",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "rel4",
    "name": "Ímpeto Elétrico",
    "cost": 9,
    "power": 35,
    "effect": "drain",
    "desc": "Ataque elemental com efeito especial."
   }
  ]
 },
 "lumifae": {
  "id": "lumifae",
  "name": "Lumifae",
  "type": "fada",
  "label": "FADA",
  "role": "Raposa encantada",
  "sub": "Raposa encantada",
  "lore": "Pequena raposa de asas transparentes que guarda os caminhos iluminados por cristais.",
  "image": "assets/lendas/lumifae.png",
  "color": "#f5c9f5",
  "glow": "rgba(213,126,216,.34)",
  "base": {
   "hp": 56,
   "energy": 47,
   "attack": 18,
   "defense": 13,
   "speed": 26
  },
  "price": {
   "coins": 185,
   "shards": 4,
   "diamonds": 3
  },
  "skills": [
   {
    "id": "lum1",
    "name": "Pó de Estrelas",
    "cost": 0,
    "power": 23,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "lum2",
    "name": "Feixe Lunar",
    "cost": 11,
    "power": 40,
    "effect": "weak",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "lum3",
    "name": "Luz de Cura",
    "cost": 9,
    "power": 0,
    "effect": "heal",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "lum4",
    "name": "Asas de Ilusão",
    "cost": 8,
    "power": 0,
    "effect": "evade",
    "desc": "Habilidade de suporte."
   }
  ]
 },
 "florivela": {
  "id": "florivela",
  "name": "Florivela",
  "type": "fada",
  "label": "FADA",
  "role": "Cervo das flores eternas",
  "sub": "Cervo das flores eternas",
  "lore": "Cervo de galhos floridos que faz jardins renascerem mesmo na terra castigada.",
  "image": "assets/lendas/florivela.png",
  "color": "#f5c9f5",
  "glow": "rgba(213,126,216,.34)",
  "base": {
   "hp": 69,
   "energy": 44,
   "attack": 18,
   "defense": 18,
   "speed": 19
  },
  "price": {
   "coins": 195,
   "shards": 5,
   "diamonds": 3
  },
  "skills": [
   {
    "id": "flo1",
    "name": "Pétala Cortante",
    "cost": 0,
    "power": 23,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "flo2",
    "name": "Flor do Alvorecer",
    "cost": 11,
    "power": 39,
    "effect": "drain",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "flo3",
    "name": "Primavera Eterna",
    "cost": 9,
    "power": 0,
    "effect": "regen",
    "desc": "Habilidade de suporte."
   },
   {
    "id": "flo4",
    "name": "Abraço das Raízes",
    "cost": 7,
    "power": 0,
    "effect": "shield",
    "desc": "Habilidade de suporte."
   }
  ]
 },
 "umbraxis": {
  "id": "umbraxis",
  "name": "Umbraxis",
  "type": "sombras",
  "label": "SOMBRAS",
  "role": "Draco da penumbra",
  "sub": "Draco da penumbra",
  "lore": "Um dragão de asas sombrias que atravessa portais entre reflexos de luar.",
  "image": "assets/lendas/umbraxis.png",
  "color": "#ccacff",
  "glow": "rgba(139,101,211,.33)",
  "base": {
   "hp": 67,
   "energy": 43,
   "attack": 25,
   "defense": 14,
   "speed": 23
  },
  "price": {
   "coins": 240,
   "shards": 6,
   "diamonds": 4
  },
  "skills": [
   {
    "id": "umb1",
    "name": "Garra Obscura",
    "cost": 0,
    "power": 25,
    "effect": "",
    "desc": "Ataque direto."
   },
   {
    "id": "umb2",
    "name": "Portal do Abismo",
    "cost": 13,
    "power": 45,
    "effect": "poison",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "umb3",
    "name": "Essência Roubada",
    "cost": 10,
    "power": 36,
    "effect": "drain",
    "desc": "Ataque elemental com efeito especial."
   },
   {
    "id": "umb4",
    "name": "Manto Fantasma",
    "cost": 8,
    "power": 0,
    "effect": "evade",
    "desc": "Habilidade de suporte."
   }
  ]
 }
});
// Evoluções: forma Inicial (níveis 1–17), Intermediária (18–34), Avançada (35–50).
const EVOLUTION_NAMES={
 "flarim": [
  "Flarion",
  "Flaragnar",
  "Julgamento Ígneo"
 ],
 "aqualin": [
  "Aquariel",
  "Aqualith",
  "Maré da Primeira Luz"
 ],
 "terron": [
  "Terragron",
  "Terralume",
  "Coração da Montanha"
 ],
 "lavolvo": [
  "Lavarmad",
  "Obsidracon",
  "Casco do Vulcão"
 ],
 "cinerix": [
  "Cinerion",
  "Cineraphix",
  "Aurora das Cinzas"
 ],
 "nautyra": [
  "Nautilis",
  "Nautilarca",
  "Espiral das Marés"
 ],
 "coravela": [
  "Coralina",
  "Coravélion",
  "Coroa dos Recifes"
 ],
 "brontmus": [
  "Brontasso",
  "Brontossilva",
  "Colosso das Raízes"
 ],
 "cristrix": [
  "Cristomor",
  "Cristaran",
  "Julgamento de Quartzo"
 ],
 "zephira": [
  "Zefirion",
  "Zefiralis",
  "Dança dos Quatro Ventos"
 ],
 "auravio": [
  "Auravento",
  "Auravalis",
  "Horizonte Celeste"
 ],
 "fulgarra": [
  "Fulgárion",
  "Fulgarrus",
  "Rugido da Tempestade"
 ],
 "faiscote": [
  "Faíscarus",
  "Voltifúria",
  "Salto Trovejante"
 ],
 "petalume": [
  "Petalora",
  "Petalúmina",
  "Jardim do Luar"
 ],
 "miralume": [
  "Miraflora",
  "Mirassolene",
  "Bênção do Crepúsculo"
 ],
 "nocira": [
  "Noctária",
  "Noctaracne",
  "Teia do Eclipse"
 ],
 "corvumbra": [
  "Corvélix",
  "Corvumbriel",
  "Sentença do Ocaso"
 ],
 "velmora": [
  "Velmuriel",
  "Velmorath",
  "Véu da Meia-noite"
 ],
 "ignekar": [
  "Ignikar",
  "Ignekarion",
  "Erupção Ancestral"
 ],
 "ocearco": [
  "Oceárion",
  "Ocearcan",
  "Mandíbula do Abismo"
 ],
 "glacira": [
  "Glacirion",
  "Glaciarca",
  "Coroa da Nevasca"
 ],
 "granleon": [
  "Granligre",
  "Granleônix",
  "Trono do Cristal"
 ],
 "musgarg": [
  "Musgaros",
  "Musgarron",
  "Ruína Viva"
 ],
 "virandor": [
  "Virandeo",
  "Virandalis",
  "Passo do Zéfiro"
 ],
 "aerogrif": [
  "Aerogrifo",
  "Aerogrifon",
  "Garras do Horizonte"
 ],
 "voltaris": [
  "Voltarion",
  "Voltarionis",
  "Pássaro do Relâmpago"
 ],
 "relampor": [
  "Relamprax",
  "Relamporion",
  "Rugido de Zeus"
 ],
 "lumifae": [
  "Lumifélix",
  "Lumifária",
  "Prisma da Aurora"
 ],
 "florivela": [
  "Floráurea",
  "Florivélia",
  "Primavera Eterna"
 ],
 "umbraxis": [
  "Umbraxor",
  "Umbraxion",
  "Abertura do Véu"
 ]
};
const evolutionLevels=[1,18,35];
const evolutionLabels=['Inicial','Intermediária','Avançada'];
for(const [key,def] of Object.entries(EVOLUTION_NAMES)){
 const entry=species[key];
 if(!entry)throw Error('Linha evolutiva sem espécie: '+key);
 entry.forms=[entry.name,def[0],def[1]];
 entry.signature=def[2];
 entry.images=[`assets/lendas/${key}.png`,`assets/evolucoes/${key}-2.png`,`assets/evolucoes/${key}-3.png`];
}
function stageOf(inst){return Math.max(0,Math.min(2,Math.trunc(Number(inst?.stage)||0)));}
function formName(inst){return species[inst.species].forms[stageOf(inst)];}
function artwork(inst){return species[inst.species].images[stageOf(inst)];}
function skillsFor(inst){const s=species[inst.species],stage=stageOf(inst);
 return s.skills.map((skill,i)=>{
  const v={...skill};
  if(stage>0){
   v.power=Math.round((v.power||0)*(1+stage*.17));
   if(i===1&&v.power>0){v.name=stage===1?`${skill.name} II`:s.signature;v.cost+=stage*2;}
   if(i===0&&v.power>0)v.power+=stage*2;
   if(i===3&&stage===2&&v.power>0)v.name=s.signature;
  }
  return v;
 });
}

// As 30 espécies possuem ilustrações PNG individuais, sem modelos vetoriais genéricos.
for(const s of Object.values(species))s.image=`assets/lendas/${s.id}.png`;
function stats(instance){const s=species[instance.species];if(!s)throw Error('Lenda desconhecida');const lv=Core.clamp(instance.level,1,50),stage=stageOf(instance);return {maxHp:Math.round((s.base.hp+lv*8)*(1+stage*.18)),maxEnergy:s.base.energy+lv*3+stage*10,attack:Math.round((s.base.attack+lv*3)*(1+stage*.15)),defense:Math.round((s.base.defense+lv*2)*(1+stage*.16)),speed:Math.round((s.base.speed+lv*2)*(1+stage*.10))};}
function normalise(inst){const st=stats(inst);inst.hp=Core.clamp(inst.hp,0,st.maxHp);inst.energy=Core.clamp(inst.energy,0,st.maxEnergy);return inst;}
function make(speciesId,level=5){const uid='lenda-'+speciesId+'-'+Date.now()+'-'+Math.floor(Math.random()*99999);const c={uid,species:speciesId,level,stage:0,exp:0,hp:999,energy:999,bond:20,wins:0};return normalise(c);}
function expNeeded(level){return 45+level*17;}
function gainExp(inst,xp){const old=inst.level;inst.exp+=xp;while(inst.exp>=expNeeded(inst.level)&&inst.level<50){inst.exp-=expNeeded(inst.level);inst.level++;}if(inst.level===50)inst.exp=0;const oldMax=stats({...inst,level:old}).maxHp;const max=stats(inst).maxHp;inst.hp=Math.min(max,inst.hp+(max-oldMax));inst.energy=Math.min(stats(inst).maxEnergy,inst.energy+8);return inst.level-old;}
function advantage(attackType,defenderType){if(attackType===defenderType)return 1;const strengths={fogo:['terra','fada'],agua:['fogo'],terra:['eletrico'],ar:['terra'],eletrico:['agua','ar'],fada:['sombras'],sombras:['fada','ar']};if((strengths[attackType]||[]).includes(defenderType))return 1.35;if((strengths[defenderType]||[]).includes(attackType))return .75;return 1;}
function fighter(instance){const st=stats(instance);return {uid:instance.uid,species:instance.species,level:instance.level,name:formName(instance),stage:stageOf(instance),stats:st,hp:Math.max(1,Math.min(st.maxHp,instance.hp)),energy:Math.max(0,Math.min(st.maxEnergy,instance.energy)),shield:0,burn:0,slow:0,poison:0,paralysis:0,regen:0,defending:false};}
function move(actor,target,skill){if(!actor||actor.hp<=0||!target||target.hp<=0)return {ok:false,reason:'Lenda indisponível.'};if(actor.energy<skill.cost)return {ok:false,reason:'Energia insuficiente.'};actor.energy-=skill.cost;actor.energy=Math.min(actor.stats.maxEnergy,actor.energy+(skill.cost===0?4:0));let report={ok:true,actor:actor.name,target:target.name,skill:skill.name,effect:skill.effect,damage:0,healed:0,shield:0,status:'',advantage:1};
 if(skill.effect==='regen'){actor.regen=Math.max(actor.regen,3);report.status='regeneração';return report;}
 if(skill.effect==='heal'){const amount=Math.round(actor.stats.maxHp*.27+actor.level*1.3);report.healed=Math.min(amount,actor.stats.maxHp-actor.hp);actor.hp+=report.healed;actor.energy=Math.min(actor.stats.maxEnergy,actor.energy+3);return report;}
 if(skill.effect==='shield'){report.shield=Math.round(16+actor.level*2.4);actor.shield=Math.min(actor.stats.maxHp,actor.shield+report.shield);return report;}
 report.advantage=advantage(species[actor.species].type,species[target.species].type);
 const random=0.91+Math.random()*.16;
 const raw=(skill.power+actor.stats.attack*.66-target.stats.defense*.39)*report.advantage*random*(actor.slow>0?.84:1);
 let dmg=Math.max(5,Math.round(raw*(target.defending?.58:1)));
 const block=Math.min(target.shield,dmg);target.shield-=block;dmg-=block;report.blocked=block;
 report.damage=Math.min(target.hp,dmg);target.hp=Math.max(0,target.hp-dmg);target.defending=false;
 if(skill.effect==='burn'&&Math.random()<.6&&target.hp>0){target.burn=2;report.status='queimadura';}
 if(skill.effect==='slow'&&target.hp>0){target.slow=2;report.status='lentidão';}
 if(skill.effect==='poison'&&target.hp>0){target.poison=Math.max(2,target.poison);report.status='veneno';}
 if(skill.effect==='paralysis'&&target.hp>0&&Math.random()<.7){target.paralysis=2;report.status='paralisia';}
 return report;
}
function tick(f){const events=[];if(f.burn>0&&f.hp>0){const dmg=Math.max(2,Math.round(f.stats.maxHp*.055));f.hp=Math.max(0,f.hp-dmg);f.burn--;events.push(`${f.name} sofreu ${dmg} de queimadura.`);}if(f.poison>0&&f.hp>0){const damage=Math.max(2,Math.round(f.stats.maxHp*.065));f.hp=Math.max(0,f.hp-damage);f.poison--;events.push(`${f.name} sofreu ${damage} de veneno.`);}if(f.regen>0&&f.hp>0){const healed=Math.min(f.stats.maxHp-f.hp,Math.max(3,Math.round(f.stats.maxHp*.07)));f.hp+=healed;f.regen--;events.push(`${f.name} regenerou ${healed} PV.`);}if(f.slow>0)f.slow--;f.defending=false;return events;}
function chooseAI(actor,target){const s=skillsFor(actor);const options=s.filter(x=>x.cost<=actor.energy);if(actor.hp<actor.stats.maxHp*.39&&options.some(x=>x.effect==='heal'))return options.find(x=>x.effect==='heal');if(actor.hp<actor.stats.maxHp*.6&&actor.regen===0&&options.some(x=>x.effect==='regen')&&Math.random()<.4)return options.find(x=>x.effect==='regen');if(actor.shield===0&&actor.hp<actor.stats.maxHp*.55&&Math.random()<.25&&options.some(x=>x.effect==='shield'))return options.find(x=>x.effect==='shield');const attacks=options.filter(x=>x.power>0).sort((a,b)=>b.power-a.power);if(target.hp<24&&attacks.some(s=>s.cost===0))return attacks.find(s=>s.cost===0);if(attacks.length>1&&Math.random()<.23)return attacks.at(-1);return attacks[0]||options[0]||s[0];}
function evolve(uid){const c=Core.byUid(uid);if(!c)return {ok:false,reason:'Lenda não encontrada.'};
 const oldStage=stageOf(c),next=oldStage+1;if(next>2)return {ok:false,reason:'A forma avançada já foi alcançada.'};
 if(c.level<evolutionLevels[next])return {ok:false,reason:`É necessário alcançar o nível ${evolutionLevels[next]}.`};
 const oldStats=stats(c);c.stage=next;const newStats=stats(c);
 c.hp=Math.min(newStats.maxHp,c.hp+(newStats.maxHp-oldStats.maxHp));
 c.energy=Math.min(newStats.maxEnergy,c.energy+(newStats.maxEnergy-oldStats.maxEnergy));
 Core.commit();return {ok:true,stage:next,message:`${species[c.species].forms[oldStage]} evoluiu para ${formName(c)}! Novos atributos e técnicas desbloqueados.`};
}
function adopt(id){const st=Core.state;if(!st)return {ok:false,reason:'Comece uma jornada.'};if(!species[id])return {ok:false,reason:'Esta espécie ainda não está disponível.'};if(st.collection.some(c=>c.species===id))return {ok:false,reason:'Esta espécie já está na sua coleção.'};const price=species[id].price||{coins:100,shards:2,diamonds:0};if(st.coins<price.coins||st.shards<price.shards||st.diamonds<(price.diamonds||0))return {ok:false,reason:'Recursos insuficientes para esta adoção.'};const c=make(id,5);st.coins-=price.coins;st.shards-=price.shards;st.diamonds-=(price.diamonds||0);st.collection.push(c);if(st.team.length<3)st.team.push(c.uid);Core.commit();return {ok:true,companion:c};}
function care(uid,action){const st=Core.state,c=Core.byUid(uid);if(!st||!c)return {ok:false,reason:'Lenda não encontrada.'};const all=stats(c);if(action==='feed'){
  if(st.coins<20)return {ok:false,reason:'Moedas insuficientes.'};if(c.bond>=100&&c.energy>=all.maxEnergy)return {ok:false,reason:'Vínculo e energia já estão no máximo.'};st.coins-=20;c.bond=Math.min(100,c.bond+8);c.energy=Math.min(all.maxEnergy,c.energy+8);Core.commit();return {ok:true,message:`${species[c.species].name} se alimentou! Vínculo +8, energia recuperada.`};
 }if(action==='rest'){
  if(c.hp>=all.maxHp&&c.energy>=all.maxEnergy)return {ok:false,reason:'Esta Lenda já está descansada.'};c.hp=all.maxHp;c.energy=all.maxEnergy;Core.commit();return {ok:true,message:`${species[c.species].name} descansou e recuperou completamente a energia e a vida.`};
 }if(action==='train'){
  if(st.coins<30)return {ok:false,reason:'Moedas insuficientes.'};st.coins-=30;const old=c.level;const gains=gainExp(c,25);st.stats.training++;Core.recordDaily('training');Core.commit();return {ok:true,message:`${species[c.species].name} ganhou 25 de experiência! ${gains?`Subiu para o nível ${c.level}!`:''}`};
 }return {ok:false,reason:'Ação desconhecida.'};}
window.DOL.Lendas={species,stats,normalise,make,expNeeded,gainExp,advantage,fighter,move,tick,chooseAI,adopt,care,evolve,stageOf,formName,artwork,skillsFor,evolutionLevels,evolutionLabels};
})();
