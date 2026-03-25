/* ============================================================
   FOCUSTREINO - GSAP ANIMATIONS
   Animações 3D e efeitos especiais com GSAP
   ============================================================ */

// ============ VERIFICAR SE GSAP ESTÁ CARREGADO ============
if (typeof gsap === 'undefined') {
  console.warn('GSAP não foi carregado. Certifique-se de incluir a CDN do GSAP antes deste script.');
}

// ============ ANIMAÇÕES DO HERO ============
function animarHeroTitulo() {
  const titulo = document.querySelector('.hero h1');
  if (!titulo) return;
  gsap.fromTo(titulo, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.2 });
}

function animarHeroTexto() {
  const texto = document.querySelector('.hero p');
  if (!texto) return;
  gsap.fromTo(texto, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 });
}

// Função removida: animarHeroBotoes() - Botões foram removidos do Hero

// ============ ANIMAÇÕES DOS CARDS ============
function animarCards() {
  const cards = document.querySelectorAll('.dica-card, .produto-card');
  if (cards.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.fromTo(entry.target, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => observer.observe(card));
}

// ============ EFEITOS DE HOVER ============
function adicionarHovers() {
  // Links de Navegação
  const links = document.querySelectorAll('nav a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => gsap.to(link, { color: '#39FF14', duration: 0.3 }));
    link.addEventListener('mouseleave', () => gsap.to(link, { color: '#FFFFFF', duration: 0.3 }));
  });

  // Botões
  const botoes = document.querySelectorAll('.btn');
  botoes.forEach(botao => {
    botao.addEventListener('mouseenter', () => gsap.to(botao, { scale: 1.05, duration: 0.2 }));
    botao.addEventListener('mouseleave', () => gsap.to(botao, { scale: 1, duration: 0.2 }));
  });
}

// ============ INICIALIZAÇÃO GERAL ============
function inicializarAnimacoes() {
  if (typeof gsap === 'undefined') return;
  
  // As animações do Hero (título e texto) agora são feitas via CSS
  // animarHeroTitulo(); // CSS: @keyframes fadeInSlideUp
  // animarHeroTexto(); // CSS: @keyframes fadeInSlideUp
  
  animarCards();
  adicionarHovers();
  
  // Animação de pulso no WhatsApp
  const whatsapp = document.querySelector('.whatsapp-flutuante a');
  if (whatsapp) {
    gsap.to(whatsapp, { scale: 1.1, duration: 0.6, ease: 'sine.inOut', repeat: -1, yoyo: true });
  }
}

document.addEventListener('DOMContentLoaded', inicializarAnimacoes);
