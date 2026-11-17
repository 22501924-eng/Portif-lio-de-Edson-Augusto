// Efeito de brilho

const body = document.body;

body.addEventListener("mousemove", function (event) {
    const x = event.clientX;
    const y = event.clientY;

    body.style.setProperty("--mouse-x-cor", x + "px");
    body.style.setProperty("--mouse-y-cor", y + "px");
});

// Borda nos cards

const cards = document.querySelectorAll(".card-borda");

cards.forEach(function (card) {
    card.addEventListener("mousemove", function (event) {
        const posicao = card.getBoundingClientRect();

        const x = event.clientX - posicao.left;
        const y = event.clientY - posicao.top;

        card.style.setProperty("--mouse-x", x + "px");
        card.style.setProperty("--mouse-y", y + "px");
    });

    card.addEventListener("mouseleave", function () {
        card.style.setProperty("--mouse-x", "-500px");
        card.style.setProperty("--mouse-y", "-500px");
    });
});








// HEADER

const links = document.querySelectorAll("header nav a");
const secoes = document.querySelectorAll("main > section[id]");
const cabecalho = document.querySelector("header");
const triangulo = document.querySelector("#triangulo");

function atualizarMenu() {
    let secaoAtual = secoes[0].id;

    secoes.forEach(function (secao) {
        if (secao.getBoundingClientRect().top <= cabecalho.offsetHeight + 70) {
            secaoAtual = secao.id;
        }
    });

    links.forEach(function (link) {
        if (link.getAttribute("href") === "#" + secaoAtual) {
            link.classList.add("ativo");
            link.setAttribute("aria-current", "location");

            const item = link.parentElement;
            const meio = item.offsetLeft + item.offsetWidth / 2;

            triangulo.style.setProperty("--x-da-triangulo", meio + "px");
        } else {
            link.classList.remove("ativo");
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener("scroll", atualizarMenu);
window.addEventListener("resize", atualizarMenu);
window.addEventListener("load", atualizarMenu);

atualizarMenu();






// Botão de claro e escuro

const botaoTema = document.querySelector("#botaoTema");

if (localStorage.getItem("tema") === "claro") {
    body.classList.add("white");
}

botaoTema.addEventListener("click", function () {
    body.classList.toggle("white");

    if (body.classList.contains("white")) {
        localStorage.setItem("tema", "claro");
    } else {
        localStorage.setItem("tema", "escuro");
    }
});








// INICIO

const textoExplosivo = document.querySelector("#texto-explosivo");
const palavrasExplosivas = [
    "CÓDIGO EM EVOLUÇÃO.",
    "IDEIAS FORA DE ÓRBITA.",
    "CRIATIVIDADE EM AÇÃO."
];

const palavrasIngles = textoExplosivo.getAttribute("data-en-frases").split("|");
let fraseAtual = 2;

const numeroMinusculo = document.querySelector("#numero-minusculo");
const numerosMinusculos = ["01", "02", "03"];

const linhaVermelha = document.querySelector("#textos-animados hr");

let indice = 0;

setInterval(function () {
    fraseAtual = indice;
    textoExplosivo.textContent = idioma === "en" ? palavrasIngles[indice] : palavrasExplosivas[indice];
    numeroMinusculo.textContent = numerosMinusculos[indice];

    textoExplosivo.classList.remove("opacity");

    linhaVermelha.classList.add("tres-cinco-zero");

    setTimeout(function () {
        linhaVermelha.classList.remove("tres-cinco-zero");
    }, 1500);

    setTimeout(function () {
        textoExplosivo.classList.add("opacity");
    }, 4000);

    indice++;

    if (indice === 3) {
        indice = 0;
    }
}, 5000);









// HABILIDADES

const pastasHabilidades = document.querySelectorAll(".pasta-hab");
const listasHabilidades = document.querySelectorAll(".lista-hab");
const documentosHabilidades = document.querySelectorAll(".doc-hab");
const arquivosHabilidades = document.querySelectorAll(".arquivo-hab");

const nomePastaAberta = document.querySelector("#nome-pasta-aberta span");
const caminhoPasta = document.querySelector("#caminho-pasta");
const caminhoArquivo = document.querySelector("#caminho-arquivo");
const numeroDocumento = document.querySelector("#numero-documento");
const totalDocumentos = document.querySelector("#total-documentos");

pastasHabilidades.forEach(function (pasta) {
    pasta.addEventListener("click", function () {

        pastasHabilidades.forEach(function (outraPasta) {
            outraPasta.classList.remove("pasta-ativa");
            outraPasta.setAttribute("aria-pressed", "false");
            const abrir = outraPasta.querySelector(".pasta-abrir");
            abrir.textContent = idioma === "en" ? abrir.getAttribute("data-en") : "ABRIR →";
        });

        pasta.classList.add("pasta-ativa");
        pasta.setAttribute("aria-pressed", "true");
        const abrir = pasta.querySelector(".pasta-abrir");
        abrir.textContent = idioma === "en" ? abrir.getAttribute("data-en-aberta") : "ABERTA →";

        listasHabilidades.forEach(function (lista) {
            lista.classList.remove("lista-ativa");
        });

        const listaAberta = document.querySelector("#lista-" + pasta.value);
        listaAberta.classList.add("lista-ativa");

        nomePastaAberta.textContent = pasta.querySelector(".pasta-nome").textContent;
        caminhoPasta.textContent = idioma === "en" ? (pasta.querySelector(".pasta-nome").getAttribute("data-en") || pasta.value).toLowerCase() : pasta.value;

        listaAberta.querySelector(".arquivo-hab").click();
    });
});


// Selecionar arquivo

listasHabilidades.forEach(function (lista) {
    const arquivos = lista.querySelectorAll(".arquivo-hab");

    arquivos.forEach(function (arquivo, numero) {
        arquivo.addEventListener("click", function () {

            arquivosHabilidades.forEach(function (outroArquivo) {
                outroArquivo.classList.remove("arquivo-ativo");
                outroArquivo.setAttribute("aria-pressed", "false");
            });

            arquivo.classList.add("arquivo-ativo");
            arquivo.setAttribute("aria-pressed", "true");

            documentosHabilidades.forEach(function (documento) {
                documento.classList.remove("doc-aberto");
            });

            const documentoAberto = document.querySelector("#documento-" + arquivo.value);
            documentoAberto.classList.add("doc-aberto");

            caminhoArquivo.textContent = arquivo.value;
            numeroDocumento.textContent = "0" + (numero + 1);
            totalDocumentos.textContent = "0" + arquivos.length;
        });
    });
});







// PROJETOS

const botoesProjeto = document.querySelectorAll(".abrir-proj");
const previaProjeto = document.querySelector("#previa-projeto");
const imagemPrevia = document.querySelector("#imagem-previa");
const tituloPrevia = document.querySelector("#titulo-previa");
const fecharPrevia = document.querySelector("#fechar-previa");

botoesProjeto.forEach(function (botao) {
    botao.addEventListener("click", function () {
        const projeto = botao.closest(".projeto");

        tituloPrevia.textContent = projeto.querySelector("h3").textContent;
        imagemPrevia.className = "proj-img " + botao.value;
        imagemPrevia.setAttribute("aria-label", "Prévia de " + tituloPrevia.textContent);

        previaProjeto.showModal();
    });
});

fecharPrevia.addEventListener("click", function () {
    previaProjeto.close();
});

previaProjeto.addEventListener("click", function (event) {
    if (event.target === previaProjeto) {
        previaProjeto.close();
    }
});








// CONTATO

const formularioContato = document.querySelector("#formulario-contato");
const nomeContato = document.querySelector("#nome-contato");
const emailContato = document.querySelector("#email-contato");
const telefoneContato = document.querySelector("#telefone-contato");
const assuntoContato = document.querySelector("#assunto-contato");
const mensagemContato = document.querySelector("#mensagem-contato");
const retornoContato = document.querySelector("#retorno-contato");


// Máscara do telefone

telefoneContato.addEventListener("input", function () {
    let numeros = telefoneContato.value.replace(/\D/g, "").slice(0, 11);

    if (numeros.length > 7) {
        numeros = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2, 7) + "-" + numeros.slice(7);
    } else if (numeros.length > 2) {
        numeros = "(" + numeros.slice(0, 2) + ") " + numeros.slice(2);
    } else if (numeros.length > 0) {
        numeros = "(" + numeros;
    }

    telefoneContato.value = numeros;
});

formularioContato.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = nomeContato.value.trim();
    const email = emailContato.value.trim();
    const telefone = telefoneContato.value.trim();
    const assunto = assuntoContato.value.trim();
    const mensagem = mensagemContato.value.trim();

    if (nome === "" || telefone === "" || assunto === "" || mensagem === "") {
        retornoContato.setAttribute("data-estado", "erro");
        retornoContato.textContent = retornoContato.getAttribute("data-" + idioma + "-erro");
        return;
    }

    const texto = "Nome: " + nome + "\nE-mail: " + email + "\nTelefone: " + telefone + "\n\n" + mensagem;

    const link = "mailto:edsonaugusto238@gmail.com?subject="
        + encodeURIComponent(assunto)
        + "&body=" + encodeURIComponent(texto);

    retornoContato.setAttribute("data-estado", "enviado");
    retornoContato.textContent = retornoContato.getAttribute("data-" + idioma + "-enviado");

    window.location.href = link;
});



// TRADUÇÃO

let idioma = "pt";

const botaoIdioma = document.querySelector("#en-pt");
const textos = document.querySelectorAll("[data-en]");
const atributos = ["placeholder", "title", "aria-label"];

textos.forEach(function (texto) {
    texto.setAttribute("data-pt", texto.textContent);
});

atributos.forEach(function (atributo) {
    document.querySelectorAll("[data-en-" + atributo + "]").forEach(function (elemento) {
        elemento.setAttribute("data-pt-" + atributo, elemento.getAttribute(atributo));
    });
});

botaoIdioma.addEventListener("click", function () {
    if (idioma === "pt") {
        idioma = "en";
    } else {
        idioma = "pt";
    }

    textos.forEach(function (texto) {
        texto.textContent = texto.getAttribute("data-" + idioma);
    });

    atributos.forEach(function (atributo) {
        document.querySelectorAll("[data-en-" + atributo + "]").forEach(function (elemento) {
            elemento.setAttribute(atributo, elemento.getAttribute("data-" + idioma + "-" + atributo));
        });
    });

    pastasHabilidades.forEach(function (pasta) {
        const abrir = pasta.querySelector(".pasta-abrir");

        if (pasta.classList.contains("pasta-ativa")) {
            abrir.textContent = idioma === "en" ? abrir.getAttribute("data-en-aberta") : "ABERTA →";
        } else {
            abrir.textContent = idioma === "en" ? abrir.getAttribute("data-en") : "ABRIR →";
        }
    });

    const pastaAberta = document.querySelector(".pasta-hab.pasta-ativa");
    nomePastaAberta.textContent = pastaAberta.querySelector(".pasta-nome").textContent;
    caminhoPasta.textContent = idioma === "en" ? (pastaAberta.querySelector(".pasta-nome").getAttribute("data-en") || pastaAberta.value).toLowerCase() : pastaAberta.value;
    textoExplosivo.textContent = idioma === "en" ? palavrasIngles[fraseAtual] : palavrasExplosivas[fraseAtual];

    const estado = retornoContato.getAttribute("data-estado");
    if (estado !== null) {
        retornoContato.textContent = retornoContato.getAttribute("data-" + idioma + "-" + estado);
    }

    document.documentElement.lang = idioma === "en" ? "en" : "pt-BR";
});
