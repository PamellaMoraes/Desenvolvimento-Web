// Selecionando os elementos do carrossel
var carrossel = document.querySelector('.carrossel');
var carrosselItems = document.querySelectorAll('.carrossel-item');

var index = 0; 
var totalItems = carrosselItems.length; 
var slideInterval = 3000; // (3 segundos)

// Função para mover o carrossel
function moveCarrossel() {
    index++;
    if (index >= totalItems) {
        index = 0; 
    }
    carrossel.style.transform = 'translateX(' + (-index * 100) + '%)'; 
}

// Inicia o movimento do carrossel a cada intervalo
setInterval(moveCarrossel, slideInterval);

// Selecionando os elementos do menu
var burguer = document.querySelector('.burguer');
var services = document.getElementById('services');

// Evento de clique para mostrar/ocultar o menu
burguer.addEventListener('click', function() {
    if (services.classList.contains('active')) {
        services.classList.remove('active'); 
        burguer.classList.remove('hidden'); 
    } else {
        services.classList.add('active'); 
        burguer.classList.add('hidden'); 
    }
});

// Oculta o menu ao clicar em qualquer link
var links = document.querySelectorAll('#services a');

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
        services.classList.remove('active'); 
        burguer.classList.remove('hidden'); 
    });
}
