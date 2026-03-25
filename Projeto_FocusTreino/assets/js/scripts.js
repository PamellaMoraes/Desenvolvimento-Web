/* ============================================================
   FOCUSTREINO - SCRIPTS.JS
   Lógica geral, manipulação do DOM e funcionalidades
   ============================================================ */

// ============ DADOS DOS PRODUTOS (DESTAQUE) ============
const produtosDestaque = [
  { id: 'SUP001', nome: 'Whey Protein Gold Standard Chocolate 907g', marca: 'FOCUSTREINO', categoria: 'Proteínas', preco: 199.9, imagem: 'assets/img/produto-whey.png', descricao: 'Whey Protein de alta qualidade com 24g de proteína por dose. Ideal para ganho muscular e recuperação pós-treino.' },
  { id: 'SUP009', nome: 'Creatina Monohidratada 300g', marca: 'FOCUSTREINO', categoria: 'Creatina', preco: 59.9, imagem: 'assets/img/produto-creatina.png', descricao: 'Creatina pura monohidratada para aumento de força e explosão muscular. Potencializa o desempenho nos treinos.' },
  { id: 'SUP018', nome: 'Pré-Treino C4 Original 195g', marca: 'FOCUSTREINO', categoria: 'Pré-Treino', preco: 149.9, imagem: 'assets/img/produto-pretreino.png', descricao: 'C4 Original, o pré-treino mais vendido do mundo com CarnoSyn. Energia, foco e disposição garantidos.' }
];

// ============ DADOS DE TODOS OS PRODUTOS (CATÁLOGO COMPLETO) ============
const todosProdutos = [
  { id: 'SUP001', nome: 'Whey Protein Gold Standard Chocolate 907g', marca: 'FOCUSTREINO', categoria: 'Proteínas', preco: 199.9, imagem: 'assets/img/produto-whey.png', descricao: 'Whey Protein de alta qualidade com 24g de proteína por dose. Ideal para ganho muscular e recuperação pós-treino.' },
  { id: 'SUP009', nome: 'Creatina Monohidratada 300g', marca: 'FOCUSTREINO', categoria: 'Creatina', preco: 59.9, imagem: 'assets/img/produto-creatina.png', descricao: 'Creatina pura monohidratada para aumento de força e explosão muscular. Potencializa o desempenho nos treinos.' },
  { id: 'SUP018', nome: 'Pré-Treino C4 Original 195g', marca: 'FOCUSTREINO', categoria: 'Pré-Treino', preco: 149.9, imagem: 'assets/img/produto-pretreino.png', descricao: 'C4 Original, o pré-treino mais vendido do mundo com CarnoSyn. Energia, foco e disposição garantidos.' }
];

// ============ MENU HAMBÚRGUER ============
function inicializarMenu() {
  const menuToggle = document.getElementById('mobile-menu');
  const navList = document.getElementById('nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navList.classList.toggle('active');
    });

    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  }
}

// ============ CONSTRUTOR DE CARD DE PRODUTO ============
/**
 * Cria e retorna um elemento <article> com o card de produto completo.
 * O efeito Mouse Tracking Gradient é aplicado via JS inline no próprio card.
 * @param {Object} produto - Objeto com os dados do produto
 * @param {string} [baseImgPath=''] - Prefixo do caminho para imagens (ex: '' ou 'assets/')
 * @returns {HTMLElement}
 */
function criarCardProduto(produto, baseImgPath = '') {
  const card = document.createElement('article');
  card.className = 'produto-card';

  // Define variáveis CSS iniciais no card
  card.style.setProperty('--mouse-x', '50%');
  card.style.setProperty('--mouse-y', '50%');
  card.style.setProperty('--spotlight-opacity', '0');

  const imgSrc = baseImgPath ? baseImgPath + produto.imagem : produto.imagem;

  card.innerHTML = `
    <div class="produto-card__spotlight" aria-hidden="true"></div>
    <div class="produto-imagem">
      <img src="${imgSrc}" alt="${produto.nome}" loading="lazy">
    </div>
    <div class="produto-info">
      <div class="produto-categoria">${produto.categoria}</div>
      <h3>${produto.nome}</h3>
      <div class="produto-marca">${produto.marca}</div>
      <p>${produto.descricao}</p>
      <div class="produto-preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
      <button class="btn btn-primary btn-comprar" type="button"
        data-nome="${produto.nome.replace(/"/g, '&quot;')}"
        data-preco="${produto.preco.toFixed(2)}">
        <i class="fas fa-shopping-cart" aria-hidden="true"></i> Comprar
      </button>
    </div>
  `;

  // Delegação de evento no botão comprar
  card.querySelector('.btn-comprar').addEventListener('click', function () {
    alert(`Produto: ${this.dataset.nome}\nPreço: R$ ${this.dataset.preco}`);
  });

  return card;
}

// ============ EFEITO MOUSE TRACKING GRADIENT (SPOTLIGHT) ============
/**
 * Detecta se o dispositivo é touch (mobile/tablet).
 * Nesses casos, o rastreamento de mouse é desabilitado por completo.
 */
const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
  ('ontouchstart' in window);

/**
 * Aplica o efeito Mouse Tracking Gradient em todos os .produto-card presentes no DOM.
 * Seguro para ser chamado múltiplas vezes (não duplica listeners graças ao clone de referência).
 */
function inicializarSpotlight() {
  // Em dispositivos touch, não aplica o efeito de rastreamento
  if (isTouchDevice()) return;

  const cards = document.querySelectorAll('.produto-card');

  cards.forEach(card => {
    // Evita duplicar listeners verificando flag
    if (card.dataset.spotlightInit === 'true') return;
    card.dataset.spotlightInit = 'true';

    // mousemove: atualiza coordenadas em tempo real via CSS Custom Properties
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    // mouseenter: acende a luz com transição suave
    card.addEventListener('mouseenter', () => {
      card.style.setProperty('--spotlight-opacity', '1');
    });

    // mouseleave: apaga a luz com fade out suave (evita travar na borda)
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--spotlight-opacity', '0');
    });
  });
}

// ============ RENDERIZAR PRODUTOS DESTAQUE (HOME) ============
function renderizarDestaques() {
  const container = document.getElementById('destaque-container');
  if (!container) return;

  container.innerHTML = '';

  produtosDestaque.forEach(produto => {
    const card = criarCardProduto(produto);
    container.appendChild(card);
  });

  inicializarSpotlight();
}

// ============ RENDERIZAR PÁGINA DE PRODUTOS ============
function renderizarProdutosPagina() {
  const container = document.getElementById('produtos-container');
  if (!container) return;

  container.innerHTML = '';

  if (todosProdutos.length === 0) {
    container.innerHTML = `
      <div class="produtos-vazio">
        <i class="fas fa-box-open" aria-hidden="true"></i>
        <h3>Nenhum produto cadastrado</h3>
        <p>Em breve nosso catálogo completo estará disponível para você.</p>
      </div>
    `;
    return;
  }

  todosProdutos.forEach(produto => {
    const card = criarCardProduto(produto);
    container.appendChild(card);
  });

  inicializarSpotlight();
}

// ============ FILTROS AVANÇADOS ============
function inicializarFiltros() {
  const selectCategoria = document.getElementById('categoria');
  const selectPreco = document.getElementById('preco');
  const selectOrdenar = document.getElementById('ordenar');

  if (selectCategoria) selectCategoria.addEventListener('change', aplicarFiltros);
  if (selectPreco) selectPreco.addEventListener('change', aplicarFiltros);
  if (selectOrdenar) selectOrdenar.addEventListener('change', aplicarFiltros);
}

function aplicarFiltros() {
  const categoria = document.getElementById('categoria')?.value || '';
  const preco = document.getElementById('preco')?.value || '';
  const ordenar = document.getElementById('ordenar')?.value || 'relevancia';

  let produtosFiltrados = [...todosProdutos];

  // Filtrar por categoria
  if (categoria) {
    produtosFiltrados = produtosFiltrados.filter(p => p.categoria === categoria);
  }

  // Filtrar por preço
  if (preco) {
    if (preco === '200+') {
      produtosFiltrados = produtosFiltrados.filter(p => p.preco >= 200);
    } else {
      const [min, max] = preco.split('-').map(Number);
      produtosFiltrados = produtosFiltrados.filter(p => p.preco >= min && p.preco <= max);
    }
  }

  // Ordenar
  switch (ordenar) {
    case 'preco-asc':
      produtosFiltrados.sort((a, b) => a.preco - b.preco);
      break;
    case 'preco-desc':
      produtosFiltrados.sort((a, b) => b.preco - a.preco);
      break;
    case 'nome':
      produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
      break;
  }

  const container = document.getElementById('produtos-container');
  if (!container) return;

  container.innerHTML = '';

  if (produtosFiltrados.length === 0) {
    container.innerHTML = `
      <div class="produtos-vazio">
        <i class="fas fa-search" aria-hidden="true"></i>
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros e buscar novamente.</p>
      </div>
    `;
    return;
  }

  produtosFiltrados.forEach(produto => {
    const card = criarCardProduto(produto);
    container.appendChild(card);
  });

  // Reinicializa o spotlight nos novos cards renderizados
  inicializarSpotlight();
}

// ============ OBSERVER: REINICIALIZA SPOTLIGHT AO ADICIONAR NOVOS CARDS ============
function inicializarObserverProdutos() {
  const container = document.getElementById('produtos-container');
  if (!container) return;

  const observer = new MutationObserver(() => {
    inicializarSpotlight();
  });

  observer.observe(container, { childList: true, subtree: false });
}

// ============ INICIALIZAÇÃO ============
document.addEventListener('DOMContentLoaded', () => {
  inicializarMenu();
  renderizarDestaques();
  renderizarProdutosPagina();
  inicializarFiltros();
  inicializarObserverProdutos();
  inicializarSpotlight();
});
