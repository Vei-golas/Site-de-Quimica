//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//LINHA DO TEMPO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//EIXO E ALIADOS
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {
        pergunta: "De acordo com a quantidade de grupos hidróxido (OH⁻) em sua fórmula, como é classificada a base Ca(OH)₂?",
        alternativas: ["Tetrabase", "Dibase", "Tribase", "Monobase"],
        correta: 1,
        explicacao: "Dibase. Possui dois grupos OH⁻ em sua fórmula."
    },
    {
        pergunta: "Qual é a nomenclatura correta de Fe(OH)₃, considerando o sistema de Stock?",
        alternativas: ["Hidróxido de ferrato", "Hidróxido de ferro(I)", "Hidróxido de ferro(II)", "Hidróxido de ferro(III)"],
        correta: 3,
        explicacao: "Hidróxido de ferro(III). O ferro apresenta carga +3 para equilibrar os três grupos OH⁻."
    },
    {
        pergunta: "Qual alternativa apresenta uma base forte entre as substâncias listadas?",
        alternativas: ["Al(OH)₃", "NH₄OH", "Mg(OH)₂", "NaOH"],
        correta: 3,
        explicacao: "NaOH. O hidróxido de sódio é uma base forte, pois se dissocia praticamente por completo em água."
    },
    {
        pergunta: "Uma amostra contém 0,20 mol de NaOH dissolvidos em água até completar 500 mL de solução. Qual é sua concentração molar?",
        alternativas: ["4,0 mol/L", "0,40 mol/L", "0,10 mol/L", "2,5 mol/L"],
        correta: 1,
        explicacao: "0,40 mol/L. Dividindo 0,20 mol por 0,50 L, obtemos 0,40 mol/L."
    },
    {
        pergunta: "Qual é a concentração comum, em g/L, de uma solução preparada com 10 g de NaOH em volume final de 2 L?",
        alternativas: ["20 g/L", "10 g/L", "2 g/L", "5 g/L"],
        correta: 2,
        explicacao: "5 g/L. Dividindo 10 g de soluto por 2 L de solução, obtemos 5 g/L."
    },
    {
        pergunta: "Qual é a massa molar aproximada do Ca(OH)₂? Considere Ca = 40, O = 16 e H = 1 g/mol",
        alternativas: [" 67 g/mol", "58 g/mol", "74 g/mol", "90 g/mol "],
        correta: 2,
        explicacao: "74 g/mol. Somamos 40 do cálcio com 2 × 17 dos grupos OH, totalizando 74 g/mol."
    },
    {
        pergunta: "Na reação HCl + NaOH → NaCl + H₂O, qual é o tipo de reação que ocorre entre o ácido e a base?",
        alternativas: ["Síntese", "Neutralização", "Decomposição", "Combustão"],
        correta: 1,
        explicacao: "Neutralização. Um ácido reage com uma base, formando sal e água."
    },
    {
        pergunta: "Qual equação representa corretamente a neutralização completa entre H₂SO₄ e NaOH?",
        alternativas: ["H₂SO₄ + NaOH → NaSO₄ + H₂O", "H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O", "H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O", "2 H₂SO₄ + NaOH → Na₂SO₄ + H₂O"],
        correta: 1,
        explicacao: "H₂SO₄ + 2 NaOH → Na₂SO₄ + 2 H₂O. São necessários dois mols de NaOH para neutralizar os dois hidrogênios ionizáveis do ácido sulfúrico."
    },
    {
        pergunta: "Quantos mols de NaOH são necessários para neutralizar completamente 0,30 mol de HCl? A reação é HCl + NaOH → NaCl + H₂O.",
        alternativas: [" 0,30 mol", "0,15 mol", " 0,80 mol", " 0,90 mol"],
        correta: 0,
        explicacao: "0,30 mol. A proporção entre HCl e NaOH é de 1:1, então quantidades iguais em mol são necessárias."
    },
    {
        pergunta: "Segundo a teoria de Arrhenius, qual das alternativas apresenta corretamente uma característica das bases?",
        alternativas: ["Liberam íons H⁺ quando dissolvidas em água.", "Liberam íons OH⁻ quando dissolvidas em água.", "Possuem pH sempre menor que 7.", "São substâncias que não conduzem eletricidade."],
        correta: 1,
        explicacao: "De acordo com a teoria de Arrhenius, as bases são substâncias que, em solução aquosa, liberam íons hidroxila (OH⁻). Esses íons são responsáveis pelas características básicas das soluções, que geralmente apresentam pH maior que 7."
    }
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
