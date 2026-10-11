/**
 * DIGI-AETHER — ARENA & CAMPEONATO DIGITAL
 * Motor do Jogo com Renderização 2D em Canvas, Animações em Tempo Real e Combate por Turnos
 */

(() => {
  "use strict";

  const STORAGE_KEY = "digi_aether_save_data_v5";

  // Base com 30 espécies e arquétipos visuais únicos
  const SPECIES_DATABASE = [
    { id: 0, name: "Ignidramon", type: "Fogo", bodyType: "dragon", desc: "Dragão reptiliano com chamas concentradas nas gavras.", forms: ["Ignidramon", "Flaremon", "WarIgnidramon"] },
    { id: 1, name: "Aqualyx", type: "Água", bodyType: "serpent", desc: "Ser aquático dos mares digitais com aura de cura.", forms: ["Aqualyx", "Oceamon", "Leviathanmon"] },
    { id: 2, name: "Terratitan", type: "Planta", bodyType: "golem", desc: "Guardião ancestral blindado por raízes rígidas.", forms: ["Terratitan", "Golemon", "GaiaTitanmon"] },
    { id: 3, name: "Voltohm", type: "Elétrico", bodyType: "beast", desc: "Lobo carregado com descargas de alta voltagem.", forms: ["Voltohm", "Raikoumon", "ThunderGodmon"] },
    { id: 4, name: "Ferroclaw", type: "Metal", bodyType: "mecha", desc: "Ciborgue feito de ligas de aço e armas plasma.", forms: ["Ferroclaw", "Cybermon", "Dreadnoughtmon"] },
    { id: 5, name: "Sombragon", type: "Trevas", bodyType: "demon", desc: "Demônio noturno que se oculta em dados escuros.", forms: ["Sombragon", "Shadowmon", "DemonLordmon"] },
    { id: 6, name: "Luminais", type: "Luz", bodyType: "angel", desc: "Ser celestial com asas reluzentes de fótons.", forms: ["Luminais", "Angemon", "Seraphmon"] },
    { id: 7, name: "Glaciraptor", type: "Gelo", bodyType: "bird", desc: "Predador dos picos congelados digitais.", forms: ["Glaciraptor", "Frostmon", "IceWyrmmon"] },
    { id: 8, name: "Zephyrix", type: "Vento", bodyType: "bird", desc: "Béstia voadora que manipula lâminas de ar.", forms: ["Zephyrix", "Skylordmon", "Garudamon"] },
    { id: 9, name: "Bitbugmon", type: "Digital", bodyType: "bug", desc: "Besouro cibernético construído em matriz binária.", forms: ["Bitbugmon", "Matrixbugmon", "CyberBeetlemon"] },
    { id: 10, name: "Pyrokitsune", type: "Fogo", bodyType: "kitsune", desc: "Raposa mística que manipula chamas azuis.", forms: ["Pyrokitsune", "Kyubimon", "NineTailmon"] },
    { id: 11, name: "Hydroserpent", type: "Água", bodyType: "serpent", desc: "Serpente aquática de veneno congelante.", forms: ["Hydroserpent", "Hydramon", "Poseidonmon"] },
    { id: 12, name: "Floraarch", type: "Planta", bodyType: "golem", desc: "Flor arcana com esporos paralisantes.", forms: ["Floraarch", "Blossommon", "FloraGoddessmon"] },
    { id: 13, name: "Sparkpup", type: "Elétrico", bodyType: "beast", desc: "Cão hiperativo envolto em trovões.", forms: ["Sparkpup", "Voltnoxmon", "ZeusPuppymon"] },
    { id: 14, name: "Gravelgolem", type: "Terra", bodyType: "golem", desc: "Gigante rochoso inabalável.", forms: ["Gravelgolem", "Titanmon", "EarthShattermon"] },
    { id: 15, name: "Cryoowl", type: "Gelo", bodyType: "bird", desc: "Coruja das neves que enxerga tempestades.", forms: ["Cryoowl", "Strixmon", "FrostQueenmon"] },
    { id: 16, name: "Anemoknight", type: "Vento", bodyType: "angel", desc: "Guerreiro do vento cortante.", forms: ["Anemoknight", "Zephyrmon", "StormSamuraimon"] },
    { id: 17, name: "Mechaarachnid", type: "Metal", bodyType: "bug", desc: "Aranha robótica disparadora de teias de aço.", forms: ["Mechaarachnid", "CyberSpider", "IronWebmon"] },
    { id: 18, name: "Solarwing", type: "Luz", bodyType: "angel", desc: "Borboleta dourada com poderes curativos.", forms: ["Solarwing", "Auroramon", "SunGoddessmon"] },
    { id: 19, name: "Nightcrawler", type: "Trevas", bodyType: "bug", desc: "Escorpião venenoso das cavernas digitais.", forms: ["Nightcrawler", "Venommon", "AbyssKingmon"] },
    { id: 20, name: "Dataworm", type: "Digital", bodyType: "pixel", desc: "Entidade de dados que absorve arquivos corrompidos.", forms: ["Dataworm", "Bugmon", "VirusMastermon"] },
    { id: 21, name: "Magmabear", type: "Fogo", bodyType: "beast", desc: "Urso vulcânico com garras de lava.", forms: ["Magmabear", "Infernomon", "VolcanoBearmon"] },
    { id: 22, name: "Coralshell", type: "Água", bodyType: "golem", desc: "Caranguejo revestido por recifes marinhos.", forms: ["Coralshell", "Reefmon", "OceanShieldmon"] },
    { id: 23, name: "Sproutmole", type: "Planta", bodyType: "beast", desc: "Pequeno guardião que cultiva flora em suas costas.", forms: ["Sproutmole", "Moleon", "ForestTitanmon"] },
    { id: 24, name: "Thundercat", type: "Elétrico", bodyType: "beast", desc: "Felino com garras energizadas.", forms: ["Thundercat", "Volttigermon", "RaijinTigermon"] },
    { id: 25, name: "Ironrhino", type: "Metal", bodyType: "mecha", desc: "Rinoceronte com chifre broca de aço.", forms: ["Ironrhino", "Ironcladmon", "DestroyerRhinomon"] },
    { id: 26, name: "Phantomcat", type: "Trevas", bodyType: "demon", desc: "Gato fantasmagórico incorpóreo.", forms: ["Phantomcat", "Grimmon", "ShadowReapermon"] },
    { id: 27, name: "Auralion", type: "Luz", bodyType: "kitsune", desc: "Leão dourado com juba de luz cintilante.", forms: ["Auralion", "Solarmon", "HyperionLionmon"] },
    { id: 28, name: "Frostbite", type: "Gelo", bodyType: "beast", desc: "Lobo do gelo com sopro congelante.", forms: ["Frostbite", "Fenrirmon", "BlizzardWolfmon"] },
    { id: 29, name: "Pixelmon", type: "Digital", bodyType: "pixel", desc: "Ser feito de pixels retro-iluminados.", forms: ["Pixelmon", "Masterpixelmon", "OmniPixelmon"] }
  ];

  // Tabela de Efetividade Elemental
  const TYPE_CHART = {
    Fogo: { Planta: 1.5, Gelo: 1.5, Água: 0.7, Terra: 0.7 },
    Água: { Fogo: 1.5, Terra: 1.5, Planta: 0.7, Elétrico: 0.7 },
    Planta: { Água: 1.5, Terra: 1.5, Fogo: 0.7, Metal: 0.7 },
    Elétrico: { Água: 1.5, Vento: 1.5, Terra: 0.7 },
    Terra: { Elétrico: 1.5, Metal: 1.5, Vento: 0.7 },
    Gelo: { Vento: 1.5, Planta: 1.5, Fogo: 0.7 },
    Vento: { Planta: 1.5, Terra: 0.7 },
    Metal: { Gelo: 1.5, Luz: 0.7 },
    Luz: { Trevas: 1.5, Digital: 1.2 },
    Trevas: { Luz: 1.5, Digital: 1.2 },
    Digital: { Digital: 1.2 }
  };

  const SHOP_ITEMS = {
    potion: { name: "Poção Vital", price: 25, icon: "🧪", desc: "Recupera 40 PV da sua béstia.", type: "heal" },
    food: { name: "Ração Digital", price: 20, icon: "🍎", desc: "Reduz a fome e aumenta o vínculo.", type: "food" },
    soap: { name: "Sabão Antisséptico", price: 15, icon: "🧼", desc: "Restaura a higiene do monstro.", type: "clean" },
    energy: { name: "Energético Aether", price: 30, icon: "⚡", desc: "Recupera 40 de Energia.", type: "energy" },
    evo_crystal: { name: "Núcleo Evolutivo", price: 100, icon: "💎", desc: "Catalisador para a metamorfose evolutiva.", type: "evo" }
  };

  let state = {
    player: { name: "Tamer Mestre", coins: 150, wins: 0, losses: 0, tournamentsWon: 0, level: 1, xp: 0 },
    team: [],
    inventory: { potion: 2, food: 3, soap: 2, energy: 1, evo_crystal: 0 },
    discovered: [],
    activeMonsterIndex: 0,
    tournament: null
  };

  let currentBattle = null;
  let activeBattleTab = "wild";
  let globalAnimTimer = 0;

  // Sound Synthesizer
  const soundSynth = {
    ctx: null,
    init() { if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); },
    playTone(freq, type, duration) {
      try {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type || "square";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {}
    },
    playHit() { this.playTone(110, "sawtooth", 0.15); },
    playAttack() { this.playTone(420, "square", 0.12); },
    playWin() { this.playTone(580, "triangle", 0.35); }
  };

  // MOTOR GRÁFICO CANVAS 2D COM ANIMAÇÃO DE RESPIRAÇÃO E MOVIMENTO
  function drawDigiMonster(canvas, speciesId, stage = 1, animTime = 0) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const spec = SPECIES_DATABASE[speciesId] || SPECIES_DATABASE[0];
    const type = spec.type;
    const bType = spec.bodyType;
    const cx = w / 2;
    
    // Animação contínua de elevação/respiração (Idle Breathing)
    const breathY = Math.sin(animTime * 0.005) * 4;
    const cy = h / 2 + 8 + breathY;
    const scale = 0.75 + (stage * 0.22);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Cores por elemento
    let cPrimary = "#3b82f6";
    let cSecondary = "#00f0ff";
    if (type === "Fogo") { cPrimary = "#ef4444"; cSecondary = "#f97316"; }
    else if (type === "Planta") { cPrimary = "#22c55e"; cSecondary = "#84cc16"; }
    else if (type === "Elétrico") { cPrimary = "#eab308"; cSecondary = "#fef08a"; }
    else if (type === "Metal") { cPrimary = "#94a3b8"; cSecondary = "#00f0ff"; }
    else if (type === "Trevas") { cPrimary = "#a855f7"; cSecondary = "#4c1d95"; }
    else if (type === "Luz") { cPrimary = "#fef08a"; cSecondary = "#ffffff"; }
    else if (type === "Gelo") { cPrimary = "#38bdf8"; cSecondary = "#e0f2fe"; }

    // Sombra / Aura de Fundo
    ctx.fillStyle = cPrimary + "25";
    ctx.beginPath();
    ctx.arc(0, 15, 38, 0, Math.PI * 2);
    ctx.fill();

    // DESENHAR CORPO POR BIOTIPO
    if (bType === "dragon") {
      const wingAngle = Math.sin(animTime * 0.006) * 0.15;
      // Asas de Dragão com Batimento
      ctx.fillStyle = cSecondary;
      ctx.save();
      ctx.rotate(wingAngle);
      ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(-40, -32); ctx.lineTo(-20, 2); ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.rotate(-wingAngle);
      ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(40, -32); ctx.lineTo(20, 2); ctx.fill();
      ctx.restore();
      // Cauda
      ctx.strokeStyle = cPrimary; ctx.lineWidth = 8; ctx.beginPath();
      ctx.moveTo(0, 10); ctx.quadraticCurveTo(25 + Math.sin(animTime * 0.005) * 5, 20, 32, 5); ctx.stroke();
      // Corpo Dragão
      ctx.fillStyle = cPrimary; ctx.beginPath(); ctx.arc(0, -5, 25, 0, Math.PI * 2); ctx.fill();
      // Chifres
      ctx.fillStyle = cSecondary; ctx.beginPath();
      ctx.moveTo(-10, -25); ctx.lineTo(-16, -42); ctx.lineTo(-4, -28); ctx.fill();
      ctx.beginPath();
      ctx.moveTo(10, -25); ctx.lineTo(16, -42); ctx.lineTo(4, -28); ctx.fill();

    } else if (bType === "serpent") {
      // Corpo de Serpente Aquática Fluida
      const wave = Math.sin(animTime * 0.006) * 8;
      ctx.strokeStyle = cPrimary; ctx.lineWidth = 22; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-15 + wave, 20); ctx.quadraticCurveTo(0, -20, 15 - wave, 20); ctx.stroke();
      // Nadadeira
      ctx.fillStyle = cSecondary; ctx.beginPath();
      ctx.moveTo(0, -20); ctx.lineTo(-16, -36); ctx.lineTo(16, -36); ctx.fill();
      // Cabeça
      ctx.fillStyle = cPrimary; ctx.beginPath(); ctx.arc(0, -10, 18, 0, Math.PI * 2); ctx.fill();

    } else if (bType === "beast") {
      // Quadrupede / Lobo / Fera
      ctx.fillStyle = cPrimary;
      ctx.fillRect(-22, -10, 44, 24);
      ctx.fillStyle = cSecondary;
      ctx.fillRect(-20, 14, 8, 12); ctx.fillRect(-8, 14, 8, 12);
      ctx.fillRect(2, 14, 8, 12); ctx.fillRect(14, 14, 8, 12);
      ctx.beginPath(); ctx.arc(-16, -18, 16, 0, Math.PI * 2); ctx.fill();
      // Orelhas de Raio
      ctx.beginPath(); ctx.moveTo(-22, -30); ctx.lineTo(-14, -42); ctx.lineTo(-10, -30); ctx.fill();

    } else if (bType === "mecha") {
      // Robô Metálico com Reator Pulso
      ctx.fillStyle = "#64748b"; ctx.fillRect(-20, -18, 40, 36);
      ctx.fillStyle = cSecondary; ctx.fillRect(-12, -12, 24, 12);
      ctx.fillStyle = cPrimary;
      ctx.beginPath(); ctx.arc(-22, -16, 10, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(22, -16, 10, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#334155"; ctx.fillRect(-14, -36, 28, 18);
      ctx.fillStyle = "#00f0ff"; ctx.fillRect(-10, -32, 20, 6);

    } else if (bType === "angel") {
      // Asas Celestiais Animadas
      const flap = Math.sin(animTime * 0.008) * 0.2;
      ctx.fillStyle = "#ffffff";
      ctx.save(); ctx.rotate(flap);
      ctx.beginPath(); ctx.ellipse(-26, -20, 26, 9, -Math.PI/3, 0, Math.PI*2); ctx.fill();
      ctx.restore();
      ctx.save(); ctx.rotate(-flap);
      ctx.beginPath(); ctx.ellipse(26, -20, 26, 9, Math.PI/3, 0, Math.PI*2); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = cPrimary; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(0, -36, 16, 5, 0, 0, Math.PI*2); ctx.stroke();
      ctx.fillStyle = cPrimary; ctx.beginPath(); ctx.arc(0, -5, 20, 0, Math.PI*2); ctx.fill();

    } else if (bType === "demon") {
      // Asas de Morcego
      ctx.fillStyle = cSecondary;
      ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(-38, -25); ctx.lineTo(-25, 5); ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(38, -25); ctx.lineTo(25, 5); ctx.fill();
      ctx.fillStyle = cPrimary; ctx.beginPath(); ctx.arc(0, -5, 22, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = "#ef4444";
      ctx.beginPath(); ctx.moveTo(-8, -22); ctx.lineTo(-16, -38); ctx.lineTo(-2, -26); ctx.fill();
      ctx.beginPath(); ctx.moveTo(8, -22); ctx.lineTo(16, -38); ctx.lineTo(2, -26); ctx.fill();

    } else if (bType === "kitsune") {
      // Caudas de Raposa
      ctx.fillStyle = cSecondary;
      for (let i = -3; i <= 3; i++) {
        const tailOffset = Math.sin(animTime * 0.005 + i) * 3;
        ctx.beginPath();
        ctx.ellipse(i * 8 + tailOffset, 12, 6, 22, (i * 0.2), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = cPrimary; ctx.beginPath(); ctx.arc(0, -8, 20, 0, Math.PI*2); ctx.fill();

    } else {
      ctx.fillStyle = cPrimary; ctx.fillRect(-18, -20, 36, 36);
      ctx.fillStyle = cSecondary; ctx.fillRect(-12, -14, 10, 10); ctx.fillRect(2, -14, 10, 10);
    }

    // Olhos Digitais
    if (bType !== "mecha") {
      ctx.fillStyle = "#000000"; ctx.fillRect(-9, -12, 6, 7); ctx.fillRect(3, -12, 6, 7);
      ctx.fillStyle = cSecondary; ctx.fillRect(-7, -10, 3, 3); ctx.fillRect(5, -10, 3, 3);
    }

    // Detalhes de Estágio 3
    if (stage === 3) {
      ctx.strokeStyle = "#eab308"; ctx.lineWidth = 3;
      ctx.strokeRect(-24, -24, 48, 48);
    }

    ctx.restore();
  }

  // LOOP GLOBAL DE ANIMAÇÃO EM TEMPO REAL
  function startAnimationLoop() {
    function loop(time) {
      globalAnimTimer = time;

      // Atualiza os canvases visíveis
      const heroCanvas = document.getElementById("heroCanvas");
      if (heroCanvas && state.team.length > 0) {
        const mon = state.team[state.activeMonsterIndex] || state.team[0];
        drawDigiMonster(heroCanvas, mon.speciesId, mon.stage, globalAnimTimer);
      }

      if (currentBattle) {
        const pCvs = document.getElementById("playerCanvas");
        const eCvs = document.getElementById("enemyCanvas");
        const playerMon = state.team[state.activeMonsterIndex] || state.team[0];
        if (pCvs) drawDigiMonster(pCvs, playerMon.speciesId, playerMon.stage, globalAnimTimer);
        if (eCvs) drawDigiMonster(eCvs, currentBattle.enemy.speciesId, currentBattle.enemy.stage, globalAnimTimer);
      }

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  function drawEggCanvas(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2;

    ctx.save();
    ctx.fillStyle = "#00f0ff";
    ctx.beginPath(); ctx.ellipse(cx, cy, 38, 52, 0, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = "#a855f7";
    ctx.beginPath(); ctx.arc(cx - 12, cy - 12, 9, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + 14, cy + 10, 11, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 3; ctx.stroke();
    ctx.restore();
  }

  function createMonster(speciesId, level = 1) {
    const spec = SPECIES_DATABASE[speciesId];
    return {
      id: "m_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      speciesId: speciesId,
      name: spec.forms[0],
      type: spec.type,
      level: level,
      stage: 1,
      hp: 60 + level * 10,
      maxHp: 60 + level * 10,
      attack: 12 + level * 3,
      defense: 10 + level * 2,
      speed: 10 + level * 2,
      energy: 80,
      maxEnergy: 100,
      hunger: 20,
      cleanliness: 90,
      bond: 40,
      xp: 0
    };
  }

  function saveGame() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    const status = document.getElementById("saveStatus");
    if (status) status.textContent = "Progresso Salvo!";
  }

  function loadGame() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        state = JSON.parse(saved);
        return true;
      } catch (e) {}
    }
    return false;
  }

  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function navigateTo(pageId) {
    document.querySelectorAll("section.page").forEach(p => p.classList.remove("active"));
    document.querySelectorAll("button.nav-item").forEach(n => n.classList.remove("active"));

    const targetPage = document.getElementById(`page-${pageId}`);
    const targetNav = document.querySelector(`[data-page="${pageId}"]`);

    if (targetPage) targetPage.classList.add("active");
    if (targetNav) targetNav.classList.add("active");

    if (pageId === "team") renderTeamView();
    if (pageId === "sanctuary") renderSanctuaryView();
    if (pageId === "gb-battle") renderGbBattleStage();
    if (pageId === "shop") renderShopView();
    if (pageId === "inventory") renderInventoryView();
    if (pageId === "dex") renderDexView();
    if (pageId === "adoption") renderAdoptionView();
    if (pageId === "evolution") renderEvolutionView();
    if (pageId === "training") renderTrainingView();

    renderTopBar();
  }

  function renderTopBar() {
    document.getElementById("userCoins").textContent = state.player.coins;
    document.getElementById("userLevel").textContent = `Nível ${state.player.level} · ${state.player.xp} XP`;

    if (state.team.length > 0) {
      const activeMon = state.team[state.activeMonsterIndex] || state.team[0];
      document.getElementById("heroMonsterName").textContent = activeMon.name;
      document.getElementById("heroMonsterType").textContent = `${activeMon.type} · Nível ${activeMon.level}`;

      document.getElementById("starterSection").hidden = true;
      document.getElementById("homeDashboard").hidden = false;

      document.getElementById("dashTeamSize").textContent = `${state.team.length} / 6`;
      document.getElementById("dashWins").textContent = state.player.wins;
      document.getElementById("dashTournaments").textContent = state.player.tournamentsWon || 0;
      document.getElementById("dashDexCount").textContent = `${state.discovered.length} / 30`;
    }
  }

  function selectStarter(speciesId) {
    const starterMon = createMonster(speciesId, 1);
    state.team.push(starterMon);
    state.discovered.push(speciesId);
    saveGame();
    showToast(`Incrível! Você adotou seu ${starterMon.name}!`);
    navigateTo("sanctuary");
  }

  // MINHA EQUIPE
  function renderTeamView() {
    const grid = document.getElementById("teamCardsGrid");
    document.getElementById("teamBadgeCount").textContent = `${state.team.length} / 6 na equipe`;

    grid.innerHTML = state.team.map((mon, index) => `
      <article class="monster-card">
        <mark class="monster-type-badge">${mon.type}</mark>
        <figure class="monster-card-art">
          <canvas id="teamCanvas_${index}" width="130" height="130"></canvas>
        </figure>
        <h3>${mon.name} <small style="font-size:12px;color:var(--text-muted)">Nv. ${mon.level}</small></h3>

        <figure class="stat-bar-container">
          <figcaption class="stat-bar-label"><span>Saúde (PV)</span><span>${mon.hp}/${mon.maxHp}</span></figcaption>
          <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${(mon.hp/mon.maxHp)*100}%"></span></mark>
        </figure>

        <figure class="stat-bar-container">
          <figcaption class="stat-bar-label"><span>Energia</span><span>${mon.energy}/${mon.maxEnergy}</span></figcaption>
          <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${(mon.energy/mon.maxEnergy)*100}%;background:var(--neon-cyan)"></span></mark>
        </figure>

        <p style="font-size:11px;color:var(--text-muted);margin-top:8px;">
          ATQ: ${mon.attack} | DEF: ${mon.defense} | VEL: ${mon.speed}
        </p>

        <button class="btn-choose" style="margin-top:14px;" onclick="window.setActiveMonster(${index})">
          ${index === state.activeMonsterIndex ? "★ Líder da Equipe" : "Definir Líder"}
        </button>
      </article>
    `).join("");

    setTimeout(() => {
      state.team.forEach((mon, index) => {
        const cvs = document.getElementById(`teamCanvas_${index}`);
        if (cvs) drawDigiMonster(cvs, mon.speciesId, mon.stage, 0);
      });
    }, 50);
  }

  window.setActiveMonster = function(index) {
    state.activeMonsterIndex = index;
    saveGame();
    renderTeamView();
    showToast(`${state.team[index].name} é o novo líder de batalha!`);
  };

  // SANTUÁRIO TAMAGOTCHI
  function renderSanctuaryView() {
    const view = document.getElementById("sanctuaryView");
    const mon = state.team[state.activeMonsterIndex] || state.team[0];

    if (!mon) {
      view.innerHTML = `<p class="text-muted">Adote um monstro primeiro.</p>`;
      return;
    }

    view.innerHTML = `
      <section class="sanctuary-grid">
        <article class="panel-box">
          <header class="sanctuary-hero">
            <figure class="sanctuary-art">
              <canvas id="sanctuaryCanvas" width="130" height="130"></canvas>
            </figure>
            <hgroup>
              <span class="badge-neon">${mon.type} · Estágio ${mon.stage}</span>
              <h2 style="font-family:'Space Grotesk';font-size:28px;margin:6px 0">${mon.name}</h2>
              <p style="color:var(--text-muted);font-size:13px">Nível ${mon.level} · XP ${mon.xp}/100</p>
            </hgroup>
          </header>

          <figure class="stat-bar-container">
            <figcaption class="stat-bar-label"><span>Saúde (PV)</span><span>${mon.hp}/${mon.maxHp}</span></figcaption>
            <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${(mon.hp/mon.maxHp)*100}%"></span></mark>
          </figure>

          <figure class="stat-bar-container">
            <figcaption class="stat-bar-label"><span>Saciedade</span><span>${100 - mon.hunger}%</span></figcaption>
            <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${100 - mon.hunger}%;background:var(--neon-gold)"></span></mark>
          </figure>

          <figure class="stat-bar-container">
            <figcaption class="stat-bar-label"><span>Higiene</span><span>${mon.cleanliness}%</span></figcaption>
            <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${mon.cleanliness}%;background:var(--neon-cyan)"></span></mark>
          </figure>

          <figure class="stat-bar-container">
            <figcaption class="stat-bar-label"><span>Vínculo Tamer</span><span>${mon.bond}%</span></figcaption>
            <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${mon.bond}%;background:var(--neon-purple)"></span></mark>
          </figure>
        </article>

        <article class="panel-box">
          <h3 style="margin-bottom:16px;">Cuidados Digitais</h3>
          <section class="sanctuary-actions">
            <button class="care-btn" onclick="window.careAction('feed')">
              <span>🍎</span><b>Alimentar</b><small>Sacia a fome. Consome Ração.</small>
            </button>
            <button class="care-btn" onclick="window.careAction('clean')">
              <span>🧼</span><b>Dá Banho</b><small>Restaura a higiene do parceiro.</small>
            </button>
            <button class="care-btn" onclick="window.careAction('play')">
              <span>🎾</span><b>Brincar</b><small>Aumenta vínculo (+6%). Gasta energia.</small>
            </button>
            <button class="care-btn" onclick="window.careAction('rest')">
              <span>😴</span><b>Descansar</b><small>Recupera 40 de Energia.</small>
            </button>
            <button class="care-btn" onclick="window.careAction('heal')">
              <span>🧪</span><b>Curar</b><small>Consome 1 Poção Vital.</small>
            </button>
          </section>
        </article>
      </section>
    `;

    setTimeout(() => {
      const cvs = document.getElementById("sanctuaryCanvas");
      if (cvs) drawDigiMonster(cvs, mon.speciesId, mon.stage, 0);
    }, 50);
  }

  window.careAction = function(action) {
    const mon = state.team[state.activeMonsterIndex] || state.team[0];
    if (!mon) return;

    if (action === "feed") {
      if (state.inventory.food > 0) {
        state.inventory.food--;
        mon.hunger = Math.max(0, mon.hunger - 35);
        mon.bond = Math.min(100, mon.bond + 4);
        showToast(`Você alimentou ${mon.name}!`);
      } else showToast("Você não possui Ração Digital!");
    } else if (action === "clean") {
      mon.cleanliness = Math.min(100, mon.cleanliness + 40);
      mon.bond = Math.min(100, mon.bond + 3);
      showToast(`${mon.name} tomou um banho reforçado!`);
    } else if (action === "play") {
      if (mon.energy >= 15) {
        mon.energy -= 15;
        mon.bond = Math.min(100, mon.bond + 6);
        mon.hunger = Math.min(100, mon.hunger + 10);
        showToast(`Você brincou com ${mon.name}!`);
      } else showToast(`${mon.name} está cansado demais!`);
    } else if (action === "rest") {
      mon.energy = Math.min(mon.maxEnergy, mon.energy + 40);
      showToast(`${mon.name} descansou e recuperou energia.`);
    } else if (action === "heal") {
      if (state.inventory.potion > 0) {
        if (mon.hp >= mon.maxHp) {
          showToast(`${mon.name} já está com a vida máxima!`);
          return;
        }
        state.inventory.potion--;
        mon.hp = Math.min(mon.maxHp, mon.hp + 40);
        showToast(`${mon.name} foi curado com a Poção!`);
      } else showToast("Você não tem Poções Vitais!");
    }

    saveGame();
    renderSanctuaryView();
  };

  // ARENA DE COMBATE & CAMPEONATO
  function renderGbBattleStage() {
    const stage = document.getElementById("gbBattleStage");
    if (activeBattleTab === "wild") renderWildBattle(stage);
    else renderTournamentBracket(stage);
  }

  function renderWildBattle(stage) {
    const playerMon = state.team[state.activeMonsterIndex] || state.team[0];

    if (!playerMon) {
      stage.innerHTML = `<p>Adote um monstro digital para batalhar.</p>`;
      return;
    }

    if (!currentBattle) {
      stage.innerHTML = `
        <article class="panel-box text-center" style="max-width:540px;margin:0 auto;">
          <h2 style="font-family:'Space Grotesk';margin-bottom:12px;">⚔️ Batalha Rápida Tática</h2>
          <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px;">
            Enfrente monstros selvagens em combates por turnos com animações dinamizadas.
          </p>
          <button class="btn-primary" onclick="window.startWildBattle()">Iniciar Batalha Rápida ↗</button>
        </article>
      `;
      return;
    }

    renderModernCombatUI(stage);
  }

  function renderTournamentBracket(stage) {
    if (!state.tournament) {
      stage.innerHTML = `
        <article class="panel-box text-center" style="max-width:600px;margin:0 auto;">
          <h2 style="font-family:'Space Grotesk';margin-bottom:12px;">🏆 Campeonato Oficial Digi-Aether</h2>
          <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px;">
            Enfrente 8 Tamers em um chaveamento eliminatório (Quartas, Semifinais e Grande Final)!
          </p>
          <button class="btn-primary" onclick="window.startNewTournament()">Iniciar Novo Campeonato ↗</button>
        </article>
      `;
      return;
    }

    if (currentBattle) {
      renderModernCombatUI(stage);
      return;
    }

    const t = state.tournament;

    stage.innerHTML = `
      <article class="panel-box">
        <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-family:'Space Grotesk';">Tabela do Campeonato · ${t.roundName}</h2>
          <mark class="badge-outline">Prêmio: ◈ 250 + Troféu Tamer</mark>
        </header>

        <article class="tournament-bracket">
          <section class="bracket-round">
            <h4>Quartas de Final</h4>
            ${t.qf.map(m => `
              <article class="bracket-match ${m.active ? 'active' : ''}">
                <figcaption class="match-participant ${m.w === m.p1 ? 'winner' : ''}"><span>${m.p1}</span><b>${m.s1}</b></figcaption>
                <figcaption class="match-participant ${m.w === m.p2 ? 'winner' : ''}"><span>${m.p2}</span><b>${m.s2}</b></figcaption>
              </article>
            `).join("")}
          </section>

          <section class="bracket-round">
            <h4>Semifinais</h4>
            ${t.sf.map(m => `
              <article class="bracket-match ${m.active ? 'active' : ''}">
                <figcaption class="match-participant ${m.w === m.p1 ? 'winner' : ''}"><span>${m.p1}</span><b>${m.s1}</b></figcaption>
                <figcaption class="match-participant ${m.w === m.p2 ? 'winner' : ''}"><span>${m.p2}</span><b>${m.s2}</b></figcaption>
              </article>
            `).join("")}
          </section>

          <section class="bracket-round">
            <h4>Grande Final</h4>
            <article class="bracket-match ${t.final.active ? 'active' : ''}">
              <figcaption class="match-participant ${t.final.w === t.final.p1 ? 'winner' : ''}"><span>${t.final.p1}</span><b>${t.final.s1}</b></figcaption>
              <figcaption class="match-participant ${t.final.w === t.final.p2 ? 'winner' : ''}"><span>${t.final.p2}</span><b>${t.final.s2}</b></figcaption>
            </article>
          </section>
        </article>

        <section style="text-align:center;margin-top:20px;">
          ${t.completed ? `
            <h3 style="color:var(--neon-gold);margin-bottom:12px;">🎉 VOCÊ É O GRANDE CAMPEÃO DIGITAL!</h3>
            <button class="btn-primary" onclick="window.startNewTournament()">Iniciar Novo Torneio</button>
          ` : `
            <button class="btn-primary" onclick="window.playTournamentMatch()">Disputar Próxima Partida ↗</button>
          `}
        </section>
      </article>
    `;
  }

  // COMBATE MODERNO
  function renderModernCombatUI(stage) {
    const playerMon = state.team[state.activeMonsterIndex] || state.team[0];
    const enemy = currentBattle.enemy;
    const isPlayerTurn = currentBattle.turnState === "PLAYER_TURN";

    stage.innerHTML = `
      <article class="modern-arena">
        <mark class="turn-banner ${!isPlayerTurn ? 'enemy-turn' : ''}">
          ${isPlayerTurn ? '⚡ SEU TURNO - ESCOLHA UMA AÇÃO' : '⏳ TURNO DO OPONENTE - PROCESSANDO...'}
        </mark>

        <section class="arena-stage" id="arenaStageBox">
          <!-- Oponente -->
          <article class="arena-fighter">
            <header class="fighter-hud">
              <h4><span>${enemy.name}</span><small>Nv.${enemy.level}</small></h4>
              <figure class="stat-bar-container" style="margin-top:6px;">
                <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${(enemy.hp/enemy.maxHp)*100}%;background:var(--neon-red)"></span></mark>
              </figure>
              <small style="color:var(--text-muted)">PV: ${enemy.hp} / ${enemy.maxHp}</small>
            </header>
            <figure class="fighter-canvas-wrap">
              <canvas id="enemyCanvas" width="160" height="160"></canvas>
            </figure>
          </article>

          <!-- Jogador -->
          <article class="arena-fighter">
            <figure class="fighter-canvas-wrap">
              <canvas id="playerCanvas" width="160" height="160"></canvas>
            </figure>
            <header class="fighter-hud">
              <h4><span>${playerMon.name}</span><small>Nv.${playerMon.level}</small></h4>
              <figure class="stat-bar-container" style="margin-top:6px;">
                <mark class="stat-bar-track"><span class="stat-bar-fill" style="width:${(playerMon.hp/playerMon.maxHp)*100}%"></span></mark>
              </figure>
              <small style="color:var(--text-muted)">PV: ${playerMon.hp} / ${playerMon.maxHp} | Energia: ${playerMon.energy}</small>
            </header>
          </article>
        </section>

        <article class="arena-log-box">${currentBattle.log}</article>

        <section class="arena-action-panel">
          <button class="battle-action-btn" onclick="window.executePlayerTurn('attack')" ${!isPlayerTurn || currentBattle.ended ? 'disabled' : ''}>
            <b>⚔️ Ataque Rápido</b>
            <small>Causa dano físico direto ao inimigo.</small>
          </button>
          <button class="battle-action-btn" onclick="window.executePlayerTurn('special')" ${!isPlayerTurn || currentBattle.ended || playerMon.energy < 20 ? 'disabled' : ''}>
            <b>✦ Poder Elemental (${playerMon.type})</b>
            <small>Gasta 20 de energia. Dano aumentado.</small>
          </button>
          <button class="battle-action-btn" onclick="window.executePlayerTurn('heal')" ${!isPlayerTurn || currentBattle.ended || state.inventory.potion <= 0 ? 'disabled' : ''}>
            <b>🧪 Poção Vital (x${state.inventory.potion})</b>
            <small>Restaura 40 de PV no seu turno.</small>
          </button>
          <button class="battle-action-btn" onclick="window.executePlayerTurn('run')" ${!isPlayerTurn || currentBattle.ended ? 'disabled' : ''}>
            <b>🏃 Fugir da Arena</b>
            <small>Abandona o combate atual.</small>
          </button>
        </section>
      </article>
      ${currentBattle.ended ? `<section style="text-align:center;margin-top:20px;"><button class="btn-primary" onclick="window.endBattle()">Finalizar Batalha</button></section>` : ''}
    `;
  }

  function triggerPopup(targetCanvasId, text, isHeal = false) {
    const cvs = document.getElementById(targetCanvasId);
    if (!cvs) return;
    const parent = cvs.parentElement;
    const popup = document.createElement("span");
    popup.className = `damage-popup ${isHeal ? 'heal' : ''}`;
    popup.textContent = text;
    parent.appendChild(popup);
    setTimeout(() => popup.remove(), 800);
  }

  window.startWildBattle = function() {
    const playerMon = state.team[state.activeMonsterIndex] || state.team[0];
    const randSpeciesId = Math.floor(Math.random() * SPECIES_DATABASE.length);
    const enemyMon = createMonster(randSpeciesId, Math.max(1, playerMon.level));

    if (!state.discovered.includes(randSpeciesId)) state.discovered.push(randSpeciesId);

    currentBattle = {
      enemy: enemyMon,
      turn: 1,
      turnState: "PLAYER_TURN",
      log: `Combate iniciado! É a sua vez de agir.`,
      ended: false,
      isTournament: false
    };

    renderGbBattleStage();
  };

  window.startNewTournament = function() {
    const tamers = ["Tamer Alex", "Tamer Beatrix", "Tamer Carlos", "Tamer Diana", "Tamer Erik", "Tamer Flora", "Tamer Gabriel"];
    state.tournament = {
      roundName: "Quartas de Final",
      completed: false,
      step: 1,
      qf: [
        { p1: state.player.name, p2: tamers[0], s1: "-", s2: "-", w: null, active: true },
        { p1: tamers[1], p2: tamers[2], s1: "2", s2: "1", w: tamers[1], active: false },
        { p1: tamers[3], p2: tamers[4], s1: "0", s2: "2", w: tamers[4], active: false },
        { p1: tamers[5], p2: tamers[6], s1: "2", s2: "0", w: tamers[5], active: false }
      ],
      sf: [
        { p1: "Aguardando", p2: tamers[1], s1: "-", s2: "-", w: null, active: false },
        { p1: tamers[4], p2: tamers[5], s1: "-", s2: "-", w: null, active: false }
      ],
      final: { p1: "Aguardando", p2: "Aguardando", s1: "-", s2: "-", w: null, active: false }
    };

    saveGame();
    renderGbBattleStage();
  };

  window.playTournamentMatch = function() {
    const t = state.tournament;
    const playerMon = state.team[state.activeMonsterIndex] || state.team[0];
    const randSpeciesId = Math.floor(Math.random() * SPECIES_DATABASE.length);
    const enemyMon = createMonster(randSpeciesId, playerMon.level + (t.step * 2));

    currentBattle = {
      enemy: enemyMon,
      turn: 1,
      turnState: "PLAYER_TURN",
      log: `Partida do Campeonato contra ${enemyMon.name}! Sua vez.`,
      ended: false,
      isTournament: true
    };

    renderGbBattleStage();
  };

  // TURNO DO JOGADOR
  window.executePlayerTurn = function(action) {
    if (!currentBattle || currentBattle.turnState !== "PLAYER_TURN" || currentBattle.ended) return;

    const playerMon = state.team[state.activeMonsterIndex] || state.team[0];
    const enemy = currentBattle.enemy;
    const playerCanvas = document.getElementById("playerCanvas");

    if (action === "run") {
      currentBattle.log = "Você fugiu da batalha!";
      currentBattle.ended = true;
      renderGbBattleStage();
      return;
    }

    if (action === "heal") {
      if (state.inventory.potion > 0) {
        state.inventory.potion--;
        playerMon.hp = Math.min(playerMon.maxHp, playerMon.hp + 40);
        triggerPopup("playerCanvas", "+40 PV", true);
        currentBattle.log = `${playerMon.name} usou Poção e restaurou 40 de PV!`;
      }
    } else {
      let dmg = Math.max(6, playerMon.attack - Math.floor(enemy.defense / 2));
      let isSuper = false;

      if (action === "special") {
        playerMon.energy -= 20;
        const typeAdv = TYPE_CHART[playerMon.type]?.[enemy.type] || 1.0;
        dmg = Math.floor(dmg * 1.6 * typeAdv);
        if (typeAdv > 1) isSuper = true;
      }

      enemy.hp = Math.max(0, enemy.hp - dmg);
      soundSynth.playAttack();

      if (playerCanvas) playerCanvas.classList.add("anim-lunge-player");
      setTimeout(() => playerCanvas?.classList.remove("anim-lunge-player"), 400);

      triggerPopup("enemyCanvas", `-${dmg} HP`);
      currentBattle.log = `${playerMon.name} atacou e causou ${dmg} de dano! ${isSuper ? '⚡ SUPER EFETIVO!' : ''}`;
    }

    // Checar Vitória
    if (enemy.hp <= 0) {
      currentBattle.log = `Vitória! ${enemy.name} foi derrotado! +45 Fragmentos e +50 XP!`;
      currentBattle.ended = true;
      state.player.coins += 45;
      state.player.wins++;
      playerMon.xp += 50;

      if (playerMon.xp >= 100) {
        playerMon.level++;
        playerMon.xp = 0;
        playerMon.maxHp += 12;
        playerMon.hp = playerMon.maxHp;
        playerMon.attack += 3;
        playerMon.defense += 2;
      }

      if (currentBattle.isTournament && state.tournament) advanceTournamentStep();

      soundSynth.playWin();
      saveGame();
      renderGbBattleStage();
      return;
    }

    // Transição para o Turno do Inimigo
    currentBattle.turnState = "ENEMY_TURN";
    renderGbBattleStage();

    // IA do Inimigo Ataca
    setTimeout(() => {
      if (currentBattle.ended) return;

      const enemyCanvas = document.getElementById("enemyCanvas");
      let enemyDmg = Math.max(5, enemy.attack - Math.floor(playerMon.defense / 2));
      playerMon.hp = Math.max(0, playerMon.hp - enemyDmg);
      soundSynth.playHit();

      if (enemyCanvas) enemyCanvas.classList.add("anim-lunge-enemy");
      setTimeout(() => enemyCanvas?.classList.remove("anim-lunge-enemy"), 400);

      triggerPopup("playerCanvas", `-${enemyDmg} HP`);
      currentBattle.log = `${enemy.name} atacou e causou ${enemyDmg} de dano!`;

      if (playerMon.hp <= 0) {
        currentBattle.log = `${playerMon.name} desmaiou... Cuide dele no Santuário.`;
        currentBattle.ended = true;
        state.player.losses++;
      } else {
        currentBattle.turnState = "PLAYER_TURN";
        currentBattle.turn++;
      }

      saveGame();
      renderGbBattleStage();
    }, 1200);
  };

  function advanceTournamentStep() {
    const t = state.tournament;
    if (t.step === 1) {
      t.qf[0].s1 = "2"; t.qf[0].s2 = "0"; t.qf[0].w = state.player.name; t.qf[0].active = false;
      t.sf[0].p1 = state.player.name; t.sf[0].active = true;
      t.roundName = "Semifinais";
      t.step = 2;
    } else if (t.step === 2) {
      t.sf[0].s1 = "2"; t.sf[0].s2 = "1"; t.sf[0].w = state.player.name; t.sf[0].active = false;
      t.sf[1].s1 = "1"; t.sf[1].s2 = "2"; t.sf[1].w = t.sf[1].p2;
      t.final.p1 = state.player.name; t.final.p2 = t.sf[1].p2; t.final.active = true;
      t.roundName = "Grande Final";
      t.step = 3;
    } else if (t.step === 3) {
      t.final.s1 = "2"; t.final.s2 = "0"; t.final.w = state.player.name; t.final.active = false;
      t.completed = true;
      state.player.tournamentsWon = (state.player.tournamentsWon || 0) + 1;
      state.player.coins += 250;
      showToast("🏆 PARABÉNS! VOCÊ É O CAMPEÃO DIGITAL!");
    }
  }

  window.endBattle = function() {
    currentBattle = null;
    renderGbBattleStage();
  };

  // ADOÇÃO & OVOS
  function renderAdoptionView() {
    const list = document.getElementById("adoptionDirectList");
    const available = SPECIES_DATABASE.slice(0, 8);

    list.innerHTML = available.map(sp => `
      <article style="display:flex;align-items:center;justify-content:space-between;padding:12px;border-bottom:1px solid var(--panel-border);">
        <figure style="display:flex;align-items:center;gap:12px;">
          <canvas id="adoptCvs_${sp.id}" width="60" height="60"></canvas>
          <figcaption>
            <b>${sp.forms[0]}</b>
            <small style="display:block;color:var(--text-muted);">${sp.type}</small>
          </figcaption>
        </figure>
        <button class="action-btn-small" onclick="window.adoptDirect(${sp.id})">Adotar (◈ 60)</button>
      </article>
    `).join("");

    setTimeout(() => {
      drawEggCanvas(document.getElementById("eggCanvas"));
      available.forEach(sp => {
        const cvs = document.getElementById(`adoptCvs_${sp.id}`);
        if (cvs) drawDigiMonster(cvs, sp.id, 1, 0);
      });
    }, 50);

    document.getElementById("hatchEggBtn").onclick = () => {
      if (state.player.coins >= 80) {
        if (state.team.length >= 6) {
          showToast("Sua equipe está cheia!");
          return;
        }
        state.player.coins -= 80;
        const randId = Math.floor(Math.random() * SPECIES_DATABASE.length);
        const newMon = createMonster(randId, 1);
        state.team.push(newMon);
        if (!state.discovered.includes(randId)) state.discovered.push(randId);
        saveGame();
        renderTopBar();
        showToast(`🐣 O Ovo chocou em um ${newMon.name}!`);
      } else showToast("Fragmentos insuficientes!");
    };
  }

  window.adoptDirect = function(speciesId) {
    if (state.team.length >= 6) {
      showToast("Sua equipe já possui 6 criaturas!");
      return;
    }
    if (state.player.coins >= 60) {
      state.player.coins -= 60;
      const newMon = createMonster(speciesId, 1);
      state.team.push(newMon);
      if (!state.discovered.includes(speciesId)) state.discovered.push(speciesId);
      saveGame();
      renderTopBar();
      showToast(`Você adotou um ${newMon.name}!`);
    } else showToast("Fragmentos insuficientes!");
  };

  // CÂMARA EVOLUTIVA
  function renderEvolutionView() {
    const view = document.getElementById("evolutionView");
    const mon = state.team[state.activeMonsterIndex] || state.team[0];

    if (!mon) {
      view.innerHTML = `<p>Nenhum monstro selecionado.</p>`;
      return;
    }

    const canEvolve = mon.level >= 5 && mon.bond >= 50 && state.inventory.evo_crystal > 0 && mon.stage < 3;

    view.innerHTML = `
      <article class="panel-box text-center" style="max-width:580px;margin:0 auto;">
        <h2>Metamorfose Evolutiva</h2>
        <figure style="margin:20px 0;">
          <canvas id="evoCanvas" width="160" height="160"></canvas>
        </figure>
        <h3>${mon.name} (Estágio ${mon.stage})</h3>
        <p style="color:var(--text-muted);margin:10px 0;">Requisitos: Nível 5+ | Vínculo 50%+ | 1 Núcleo Evolutivo</p>

        <section style="margin:20px 0;text-align:left;background:rgba(255,255,255,0.03);padding:14px;border-radius:var(--radius-md);">
          <p>Nível Atual: ${mon.level} ${mon.level >= 5 ? '✓' : '✕'}</p>
          <p>Vínculo Atual: ${mon.bond}% ${mon.bond >= 50 ? '✓' : '✕'}</p>
          <p>Núcleos no Inventário: ${state.inventory.evo_crystal} ${state.inventory.evo_crystal > 0 ? '✓' : '✕'}</p>
        </section>

        <button class="btn-primary" onclick="window.triggerEvolution()" ${!canEvolve ? 'disabled style="opacity:0.5"' : ''}>
          ✦ Iniciar Metamorfose ↗
        </button>
      </article>
    `;

    setTimeout(() => {
      const cvs = document.getElementById("evoCanvas");
      if (cvs) drawDigiMonster(cvs, mon.speciesId, mon.stage, 0);
    }, 50);
  }

  window.triggerEvolution = function() {
    const mon = state.team[state.activeMonsterIndex] || state.team[0];
    const spec = SPECIES_DATABASE[mon.speciesId];

    if (mon && mon.stage < 3 && state.inventory.evo_crystal > 0) {
      state.inventory.evo_crystal--;
      mon.stage++;
      mon.name = spec.forms[mon.stage - 1] || mon.name;
      mon.attack += 12;
      mon.defense += 10;
      mon.maxHp += 30;
      mon.hp = mon.maxHp;

      soundSynth.playWin();
      saveGame();
      renderEvolutionView();
      showToast(`✨ Sensacional! ${mon.name} evoluiu para o Estágio ${mon.stage}!`);
    }
  };

  // MERCADO
  function renderShopView() {
    document.getElementById("shopCoinsDisplay").textContent = state.player.coins;
    const grid = document.getElementById("shopGrid");

    grid.innerHTML = Object.entries(SHOP_ITEMS).map(([key, item]) => `
      <article class="monster-card">
        <span style="font-size:36px;display:block;margin-bottom:10px;">${item.icon}</span>
        <h3>${item.name}</h3>
        <p style="font-size:12px;color:var(--text-muted);min-height:36px;">${item.desc}</p>
        <mark style="display:block;color:var(--neon-gold);font-weight:bold;margin:12px 0;background:transparent;">◈ ${item.price} Fragmentos</mark>
        <button class="btn-choose" onclick="window.buyItem('${key}')">Comprar Item</button>
      </article>
    `).join("");
  }

  window.buyItem = function(key) {
    const item = SHOP_ITEMS[key];
    if (state.player.coins >= item.price) {
      state.player.coins -= item.price;
      state.inventory[key] = (state.inventory[key] || 0) + 1;
      saveGame();
      renderShopView();
      showToast(`Você comprou 1x ${item.name}!`);
    } else showToast("Fragmentos insuficientes!");
  };

  // INVENTÁRIO
  function renderInventoryView() {
    const container = document.getElementById("inventoryContainer");
    const entries = Object.entries(state.inventory).filter(([_, count]) => count > 0);

    if (entries.length === 0) {
      container.innerHTML = `<p class="text-muted">Sua mochila está vazia.</p>`;
      return;
    }

    container.innerHTML = `
      <article class="panel-box">
        ${entries.map(([key, count]) => {
          const item = SHOP_ITEMS[key] || { name: key, icon: "📦", desc: "" };
          return `
            <figure style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--panel-border);">
              <figcaption style="display:flex;align-items:center;gap:12px;">
                <span style="font-size:28px;">${item.icon}</span>
                <hgroup>
                  <b>${item.name} (x${count})</b>
                  <small style="display:block;color:var(--text-muted);">${item.desc}</small>
                </hgroup>
              </figcaption>
            </figure>
          `;
        }).join("")}
      </article>
    `;
  }

  // TREINAMENTO
  function renderTrainingView() {
    const view = document.getElementById("trainingView");
    const mon = state.team[state.activeMonsterIndex] || state.team[0];

    if (!mon) {
      view.innerHTML = `<p>Selecione um monstro para treinar.</p>`;
      return;
    }

    view.innerHTML = `
      <article class="panel-box">
        <h3>Treino Intensivo para ${mon.name}</h3>
        <p style="color:var(--text-muted);font-size:13px;margin-bottom:20px;">Custo: ◈ 15 Fragmentos por treino.</p>

        <section style="display:grid;grid-template-columns:repeat(2, 1fr);gap:12px;">
          <button class="care-btn" onclick="window.trainStat('attack')">
            <span>⚔️</span><b>Treinar Ataque</b><small>+2 Atq permanente</small>
          </button>
          <button class="care-btn" onclick="window.trainStat('defense')">
            <span>🛡️</span><b>Treinar Defesa</b><small>+2 Def permanente</small>
          </button>
          <button class="care-btn" onclick="window.trainStat('speed')">
            <span>⚡</span><b>Treinar Velocidade</b><small>+2 Vel permanente</small>
          </button>
          <button class="care-btn" onclick="window.trainStat('maxHp')">
            <span>❤️</span><b>Treinar Resistência</b><small>+10 PV Máximo</small>
          </button>
        </section>
      </article>
    `;
  }

  window.trainStat = function(stat) {
    const mon = state.team[state.activeMonsterIndex] || state.team[0];
    if (state.player.coins >= 15) {
      state.player.coins -= 15;
      const boost = stat === 'maxHp' ? 10 : 2;
      mon[stat] += boost;
      saveGame();
      renderTrainingView();
      showToast(`O status de ${mon.name} foi aprimorado!`);
    } else showToast("Fragmentos insuficientes!");
  };

  // DIGIDEX
  function renderDexView() {
    const grid = document.getElementById("dexGrid");
    const search = (document.getElementById("dexSearchInput")?.value || "").toLowerCase();
    const typeFilter = document.getElementById("dexTypeFilter")?.value || "ALL";

    document.getElementById("dexCountBadge").textContent = `${state.discovered.length} / 30 Descobertas`;

    const filtered = SPECIES_DATABASE.filter(sp => {
      const matchName = sp.forms[0].toLowerCase().includes(search);
      const matchType = typeFilter === "ALL" || sp.type === typeFilter;
      return matchName && matchType;
    });

    grid.innerHTML = filtered.map(sp => {
      const isKnown = state.discovered.includes(sp.id);
      return `
        <article class="monster-card" style="${!isKnown ? 'filter:grayscale(1);opacity:0.5;' : ''}">
          <mark class="monster-type-badge">${isKnown ? sp.type : '???'}</mark>
          <figure class="monster-card-art">
            <canvas id="dexCanvas_${sp.id}" width="110" height="110"></canvas>
          </figure>
          <h3>${isKnown ? sp.forms[0] : 'Desconhecido'}</h3>
          <p style="font-size:11px;color:var(--text-muted);">${isKnown ? sp.desc : 'Espécie não registrada.'}</p>
        </article>
      `;
    }).join("");

    setTimeout(() => {
      filtered.forEach(sp => {
        const cvs = document.getElementById(`dexCanvas_${sp.id}`);
        if (cvs && state.discovered.includes(sp.id)) drawDigiMonster(cvs, sp.id, 1, 0);
      });
    }, 50);
  }

  function downloadProjectTxt() {
    showToast("Gerando arquivo do projeto...");
    const htmlCode = document.documentElement.outerHTML;

    Promise.all([
      fetch('style.css').then(r => r.text()),
      fetch('game.js').then(r => r.text())
    ]).then(([cssCode, jsCode]) => {
      const fileBlob = new Blob([
        `=== INDEX.HTML ===\n\n${htmlCode}\n\n=== STYLE.CSS ===\n\n${cssCode}\n\n=== GAME.JS ===\n\n${jsCode}`
      ], { type: "text/plain;charset=utf-8" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileBlob);
      link.download = "DIGI_AETHER_PROJETO.txt";
      link.click();
      URL.revokeObjectURL(link.href);
      showToast("Projeto exportado com sucesso!");
    }).catch(() => showToast("Erro ao exportar o projeto."));
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    startAnimationLoop();

    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        const cvs = document.getElementById(`starterCanvas${i}`);
        if (cvs) drawDigiMonster(cvs, i, 1, 0);
      }
    }, 100);

    document.querySelectorAll("[data-page]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(btn.dataset.page);
      });
    });

    document.querySelectorAll("[data-starter]").forEach(card => {
      card.addEventListener("click", () => {
        selectStarter(parseInt(card.dataset.starter));
      });
    });

    document.getElementById("tabBattleWild")?.addEventListener("click", () => {
      activeBattleTab = "wild";
      document.getElementById("tabBattleWild").classList.add("active");
      document.getElementById("tabBattleTournament").classList.remove("active");
      renderGbBattleStage();
    });

    document.getElementById("tabBattleTournament")?.addEventListener("click", () => {
      activeBattleTab = "tournament";
      document.getElementById("tabBattleTournament").classList.add("active");
      document.getElementById("tabBattleWild").classList.remove("active");
      renderGbBattleStage();
    });

    document.getElementById("dexSearchInput")?.addEventListener("input", renderDexView);
    document.getElementById("dexTypeFilter")?.addEventListener("change", renderDexView);

    document.getElementById("resetGameBtn")?.addEventListener("click", () => {
      if (confirm("Deseja apagar todo o seu progresso?")) {
        localStorage.removeItem(STORAGE_KEY);
        location.reload();
      }
    });

    document.getElementById("downloadZipBtn")?.addEventListener("click", downloadProjectTxt);

    renderTopBar();
  });

})();