/* Centro de Adoção: pesquisa, formulários e cartões da jornada. */
(function () {
  'use strict';

  const {Core, Lendas} = window.DOL;
  const {byId: id, escapeHTML: esc, searchKey, elements} = Core;
  const dateFormat = new Intl.DateTimeFormat('pt-BR', {dateStyle: 'long'});
  const numberFormat = new Intl.NumberFormat('pt-BR');
  const paths = {
    fogo: 'Que a centelha da Primeira Luz aqueça seus novos caminhos.',
    agua: 'Que as marés devolvam ao lar os dois companheiros de viagem.',
    terra: 'Que esse vínculo cresça firme como as raízes do bosque.',
    ar: 'Que os ventos guiem a dupla para além do horizonte.',
    eletrico: 'Que a curiosidade dos dois ilumine as noites de tempestade.',
    fada: 'Que os pequenos encantos do bosque acompanhem a dupla.',
    sombras: 'Que os dois encontrem abrigo nas noites sem estrelas.'
  };
  let panel = 'search';
  let editingId = '';
  let awaitingTutor = null;
  let confirming = null;

  function message(record) {
    return `${record.tutor.name}, de ${record.tutor.origin}, acolheu ${record.name}. ${paths[record.type]}`;
  }

  function feedback(target, text = '', error = false) {
    const node = id(target);
    node.textContent = text;
    node.hidden = !text;
    node.classList.toggle('is-error', error);
  }

  function showPanel(next, focus = true) {
    panel = next;
    document.querySelectorAll('[data-adoption-area]').forEach(section => {
      section.hidden = section.dataset.adoptionArea !== panel;
    });
    document.querySelectorAll('[data-adoption-panel]').forEach(button => {
      if (button.dataset.adoptionPanel === panel) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    if (panel === 'search') renderSearch();
    if (panel === 'catalog') renderLocalEntries();
    if (panel === 'tutor') renderTutor();
    if (panel === 'cards') renderArchive();
    if (focus) id(`adoption-${panel}-title`).focus();
  }

  function describePrice(price) {
    return [[price.coins, 'moedas'], [price.shards, 'fragmentos'], [price.diamonds, 'diamantes']]
      .filter(([value]) => value > 0)
      .map(([value, unit]) => `${numberFormat.format(value)} ${unit}`)
      .join(' · ') || 'Gratuita';
  }

  function renderSearch() {
    const state = Core.state;
    const search = searchKey(id('adoption-search').value);
    const element = id('adoption-filter').value;
    const status = id('adoption-status').value;
    const owned = new Map(state.collection.map(companion => [companion.species, companion]));
    const catalog = Object.values(Lendas.species);
    const matches = catalog.filter(species =>
      (element === 'all' || element === species.type) &&
      (status === 'all' || (status === 'owned') === owned.has(species.id)) &&
      searchKey(species.name).includes(search)
    );
    id('adoption-match-count').textContent = `${matches.length} de ${catalog.length} Lendas · ${owned.size} adotadas`;
    id('adoption-gallery').innerHTML = matches.map(species => {
      const companion = owned.get(species.id);
      const price = Lendas.adoptionPrice(species.id);
      const canAfford = Lendas.canAfford(price);
      const hasReceipt = companion && state.adoptions.some(receipt => receipt.uid === companion.uid);
      const action = companion
        ? `<button type="button" class="btn btn-quiet" data-open-receipt="${companion.uid}">${hasReceipt ? 'Ver cartão' : 'Registrar adoção anterior'}</button>`
        : `<div class="adoption-price">${describePrice(price)}</div>
           <button type="button" class="btn ${canAfford ? 'btn-gold' : 'btn-glass'}" data-adopt="${species.id}" ${canAfford ? '' : 'disabled'}>${canAfford ? 'Adotar Lenda' : 'Recursos insuficientes'}</button>`;
      return `<article class="adoption-card" style="--card-glow:${species.glow}">
        <div class="portrait-area"><img src="${species.image}" loading="lazy" alt=""></div>
        <div class="adoption-card-body">
          <div class="catalog-meta">
            <span class="adoption-type">${elements[species.type]}${species.id.startsWith('local-') ? ' · Registro local' : ''}</span>
            <span class="catalog-status ${companion ? 'is-owned' : ''}">${companion ? 'Adotada' : 'Disponível'}</span>
          </div>
          <h3>${esc(species.name)}</h3>
          <p>${esc(species.lore)}</p>
          <div class="catalog-actions">${action}</div>
        </div>
      </article>`;
    }).join('') || '<p class="empty-results">Nenhuma Lenda corresponde à pesquisa. Experimente limpar os filtros.</p>';
  }

  function renderLocalEntries() {
    const {catalog, collection} = Core.state;
    id('local-entry-count').textContent = `${catalog.length}/${Core.catalogLimit}`;
    id('local-entries').innerHTML = catalog.length ? catalog.map(entry => `
      <div class="local-entry">
        <div><strong>${esc(entry.name)}</strong><small>${elements[entry.type]} · ${collection.some(c => c.species === entry.id) ? 'Adotada' : 'Disponível'}</small></div>
        <button class="btn btn-quiet" type="button" data-edit-entry="${entry.id}" aria-label="Editar ${esc(entry.name)}">Editar</button>
      </div>`
    ).join('') : '<p>Os novos cadastros aparecerão aqui e no catálogo de pesquisa.</p>';
  }

  function editEntry(entry) {
    editingId = entry?.id || '';
    id('catalog-name').value = entry?.name || '';
    id('catalog-type').value = entry?.type || '';
    id('catalog-lore').value = entry?.lore || '';
    const adopted = !!entry && Core.state.collection.some(companion => companion.species === entry.id);
    id('catalog-type').disabled = adopted;
    id('catalog-type-note').hidden = !adopted;
    id('catalog-form-title').textContent = entry ? 'Editar cadastro' : 'Cadastrar uma Lenda';
    id('catalog-submit').textContent = entry ? 'Salvar alterações' : 'Cadastrar Lenda';
    id('catalog-cancel').hidden = !entry;
    feedback('catalog-feedback');
  }

  function renderTutor() {
    const {tutor, playerName} = Core.state;
    id('tutor-name').value = tutor?.name ?? playerName;
    id('tutor-origin').value = tutor?.origin ?? '';
    id('tutor-note').textContent = awaitingTutor
      ? 'Cadastre seu tutor para continuar a adoção.'
      : 'O nome e o lugar de origem serão usados nas próximas adoções. Cada cartão guarda os dados do dia em que foi criado.';
    id('tutor-submit').textContent = awaitingTutor ? 'Salvar e continuar' : 'Salvar tutor';
    feedback('tutor-feedback');
  }

  function openAdoption(speciesId, legacy = false) {
    const state = Core.state;
    const companion = legacy ? Core.byUid(speciesId) : null;
    const species = Lendas.species[legacy ? companion?.species : speciesId];
    if (!species) return;
    if (!state.tutor) {
      awaitingTutor = {speciesId, legacy};
      showPanel('tutor');
      id('tutor-name').focus();
      return;
    }
    confirming = {speciesId, legacy};
    id('adoption-dialog-title').textContent = legacy ? 'Registrar adoção anterior' : `Adotar ${species.name}`;
    id('adoption-dialog-details').textContent = legacy
      ? 'Seu cartão terá a data deste registro. A Lenda já faz parte da coleção.'
      : `Custo: ${describePrice(Lendas.adoptionPrice(speciesId))}.`;
    id('adoption-dialog-message').textContent = message({tutor: state.tutor, name: species.name, type: species.type});
    id('adoption-dedication').value = '';
    id('confirm-adoption').textContent = legacy ? 'Gerar cartão' : 'Confirmar adoção';
    feedback('adoption-dialog-feedback');
    id('adoption-dialog').showModal();
  }

  function renderArchive() {
    const {adoptions, collection} = Core.state;
    const recorded = new Set(adoptions.map(receipt => receipt.uid));
    const pending = collection.filter(companion => !recorded.has(companion.uid));
    id('adoption-archive').innerHTML = (pending.length ? `
      <div class="legacy-adoptions">
        <h4>Adoções anteriores</h4>
        <p>Gere um cartão para cada Lenda adotada antes do histórico.</p>
        <div class="adoption-actions">${pending.map(companion => `
          <button class="btn btn-glass" type="button" data-open-receipt="${companion.uid}">Registrar ${esc(Lendas.species[companion.species].name)}</button>`
        ).join('')}</div>
      </div>` : '') + `<div class="adoption-card-grid">${[...adoptions].reverse().map(receipt => `
      <article class="adoption-receipt" id="receipt-${receipt.uid}">
        <div class="receipt-heading"><span aria-hidden="true">✦</span><p>Cartão de adoção</p></div>
        <h4 tabindex="-1">${esc(receipt.name)}</h4>
        <dl>
          <div><dt>Tutor</dt><dd>${esc(receipt.tutor.name)}</dd></div>
          <div><dt>Origem</dt><dd>${esc(receipt.tutor.origin)}</dd></div>
          <div><dt>Elemento</dt><dd>${elements[receipt.type]}</dd></div>
          <div><dt>${receipt.legacy ? 'Registrado em' : 'Adotada em'}</dt><dd>${dateFormat.format(receipt.date)}</dd></div>
        </dl>
        <p class="receipt-message">${esc(message(receipt))}</p>
        ${receipt.dedication ? `<blockquote>“${esc(receipt.dedication)}”</blockquote>` : ''}
        <button class="btn btn-glass" type="button" data-download-receipt="${receipt.uid}" aria-label="Baixar cartão de ${esc(receipt.name)} em PNG">Baixar cartão (PNG)</button>
      </article>`
    ).join('')}</div>`;
  }

  function openReceipt(uid) {
    if (!Core.state.adoptions.some(receipt => receipt.uid === uid)) {
      openAdoption(uid, true);
      return;
    }
    showPanel('cards', false);
    id(`receipt-${uid}`).querySelector('h4').focus();
  }

  function downloadReceipt(receipt) {
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 960, 960);
    gradient.addColorStop(0, '#24434a');
    gradient.addColorStop(1, '#0a1729');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#c6a677';
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 936, 896);
    ctx.strokeRect(45, 45, 910, 870);
    ctx.textBaseline = 'top';

    function write(value, y, font, color, lineHeight) {
      ctx.fillStyle = color;
      ctx.font = font;
      let line = '';
      for (const word of value.split(/\s+/)) {
        const next = line ? line + ' ' + word : word;
        if (line && ctx.measureText(next).width > 808) {
          ctx.fillText(line, 96, y, 808);
          y += lineHeight;
          line = word;
        } else {
          line = next;
        }
      }
      ctx.fillText(line, 96, y, 808);
      return y + lineHeight;
    }

    write('✦  DAWN OF LEGENDS', 96, 'bold 25px system-ui', '#e9c78c', 36);
    write('Cartão de adoção', 149, '37px Georgia', '#fff3d7', 44);
    let y = write(receipt.name, 213, 'bold 54px Georgia', '#fff3d7', 64);
    y += 14;
    for (const row of [
      `Tutor: ${receipt.tutor.name}`,
      `Origem: ${receipt.tutor.origin}`,
      `Elemento: ${elements[receipt.type]}`,
      `${receipt.legacy ? 'Registrado em' : 'Adotada em'}: ${dateFormat.format(receipt.date)}`
    ]) {
      y = write(row, y, '27px system-ui', '#e0e9ea', 41);
    }
    y = write(message(receipt), y + 25, 'italic 29px Georgia', '#fff3d7', 37);
    if (receipt.dedication) write(`“${receipt.dedication}”`, y + 18, '26px Georgia', '#fff3d7', 35);

    canvas.toBlob(blob => {
      if (!blob) {
        Core.toast('Não foi possível gerar a imagem deste cartão.', true);
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const name = searchKey(receipt.name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      link.href = url;
      link.download = `cartao-adocao-${name || 'lenda'}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }, 'image/png');
  }

  function clearFilters() {
    id('adoption-search').value = '';
    id('adoption-filter').value = 'all';
    id('adoption-status').value = 'all';
  }

  function install() {
    const options = Object.entries(elements).map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
    id('adoption-filter').insertAdjacentHTML('beforeend', options);
    id('catalog-type').innerHTML = '<option value="">Escolha o elemento</option>' + options;
    id('adoption-search').addEventListener('input', renderSearch);
    id('adoption-filter').addEventListener('change', renderSearch);
    id('adoption-status').addEventListener('change', renderSearch);
    id('clear-adoption-filters').addEventListener('click', () => {
      clearFilters();
      renderSearch();
      id('adoption-search').focus();
    });
    id('view-adoption').addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || button.disabled) return;
      const data = button.dataset;
      if (data.adoptionPanel) {
        awaitingTutor = null;
        showPanel(data.adoptionPanel);
      }
      if (data.editEntry) {
        editEntry(Core.state.catalog.find(entry => entry.id === data.editEntry));
        id('catalog-name').focus();
      }
      if (data.adopt) openAdoption(data.adopt);
      if (data.openReceipt) openReceipt(data.openReceipt);
      if (data.downloadReceipt) {
        const receipt = Core.state.adoptions.find(item => item.uid === data.downloadReceipt);
        if (receipt) downloadReceipt(receipt);
      }
    });
    id('catalog-cancel').addEventListener('click', () => {
      editEntry(null);
      id('catalog-name').focus();
    });
    id('catalog-form').addEventListener('submit', event => {
      event.preventDefault();
      const result = Lendas.saveCatalogEntry({
        name: id('catalog-name').value, type: id('catalog-type').value, lore: id('catalog-lore').value
      }, editingId);
      if (!result.ok) {
        feedback('catalog-feedback', result.reason, true);
        return;
      }
      const label = editingId ? 'atualizada' : 'cadastrada';
      editEntry(null);
      renderLocalEntries();
      feedback('catalog-feedback', `${result.entry.name} foi ${label}. Você pode encontrá-la em Pesquisar Lendas.`);
    });
    id('tutor-form').addEventListener('submit', event => {
      event.preventDefault();
      if (!Core.updateTutor({name: id('tutor-name').value, origin: id('tutor-origin').value})) {
        feedback('tutor-feedback', 'Preencha nome e origem com pelo menos 2 caracteres.', true);
        return;
      }
      if (awaitingTutor) {
        const {speciesId, legacy} = awaitingTutor;
        awaitingTutor = null;
        renderTutor();
        openAdoption(speciesId, legacy);
      } else {
        feedback('tutor-feedback', 'Tutor fictício salvo.');
      }
    });
    id('cancel-adoption').addEventListener('click', () => id('adoption-dialog').close());
    id('adoption-confirm-form').addEventListener('submit', event => {
      event.preventDefault();
      if (!confirming) return;
      const {speciesId, legacy} = confirming;
      const dedication = id('adoption-dedication').value;
      const result = legacy ? Lendas.recordPreviousAdoption(speciesId, dedication) : Lendas.adopt(speciesId, dedication);
      if (!result.ok) {
        feedback('adoption-dialog-feedback', result.reason, true);
        return;
      }
      confirming = null;
      id('adoption-dialog').close();
      openReceipt(result.companion.uid);
      Core.toast('Adoção registrada. Seu cartão está pronto.');
    });
  }

  function reset() {
    panel = 'search';
    awaitingTutor = null;
    confirming = null;
    clearFilters();
    editEntry(null);
  }

  window.DOL.Adoption = {install, reset, render: () => showPanel(panel, false)};
})();
