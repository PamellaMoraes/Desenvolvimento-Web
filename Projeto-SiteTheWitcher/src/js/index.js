//btn - plataformas de jogo
const botao = document.querySelector(".btn-plataforma");
const elementoPlataformas = document.querySelector(".btn-plataforma .jogos-da-plataforma");

botao.addEventListener("click", () => {
    elementoPlataformas.classList.toggle("ativo");
});

//função limpar
    function limpar() {
        // Limpa o campo de email
        document.getElementById('email').value = '';

        // Desmarca o checkbox
        document.getElementById('check').checked = false;
    }

//menu
const toggleMenu = () => document.body.classList.toggle("open");