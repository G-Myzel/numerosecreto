(() => {
    const limite = 10;
    const campo = document.querySelector("#guess");
    const formulario = document.querySelector("#guess-form");
    const mensagem = document.querySelector("#mensagem");
    const botaoReiniciar = document.querySelector("#reiniciar");

    let numeroSecreto;
    let tentativas;
    let numerosSorteados = [];

    function sortearNumero() {
        if (numerosSorteados.length === limite) {
            numerosSorteados = [];
        }

        let numero;
        do {
            numero = Math.floor(Math.random() * limite) + 1;
        } while (numerosSorteados.includes(numero));

        numerosSorteados.push(numero);
        return numero;
    }

    function iniciarJogo() {
        numeroSecreto = sortearNumero();
        tentativas = 1;
        campo.value = "";
        campo.disabled = false;
        formulario.querySelector('button[type="submit"]').disabled = false;
        botaoReiniciar.disabled = true;
        mensagem.textContent = "Escolha um número entre 1 e 10.";
        campo.focus();
    }

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const palpite = Number(campo.value);

        if (!Number.isInteger(palpite) || palpite < 1 || palpite > limite) {
            mensagem.textContent = "Digite um número inteiro entre 1 e 10.";
            campo.focus();
            return;
        }

        if (palpite === numeroSecreto) {
            const palavra = tentativas === 1 ? "tentativa" : "tentativas";
            mensagem.textContent = `Acertou em ${tentativas} ${palavra}! O número era ${numeroSecreto}.`;
            campo.disabled = true;
            formulario.querySelector('button[type="submit"]').disabled = true;
            botaoReiniciar.disabled = false;
            botaoReiniciar.focus();
            return;
        }

        mensagem.textContent = palpite > numeroSecreto
            ? "O número secreto é menor."
            : "O número secreto é maior.";
        tentativas += 1;
        campo.value = "";
        campo.focus();
    });

    botaoReiniciar.addEventListener("click", iniciarJogo);
    iniciarJogo();
})();
