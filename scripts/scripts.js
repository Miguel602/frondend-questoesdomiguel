let indiceAtual = 0;

function carregarQuestao() {
  const q = questoes[indiceAtual];
  document.getElementById("question-meta").textContent = 
    `Banca: ${q.banca} | Órgão: ${q.orgao} | Ano: ${q.ano}`;
  document.getElementById("question-text").textContent = q.enunciado;

  const lista = document.getElementById("options-list");
  lista.innerHTML = "";

  q.alternativas.forEach((alt, index) => {
    const li = document.createElement("li");
    li.textContent = alt;
    li.onclick = () => selecionarAlternativa(index);
    lista.appendChild(li);
  });

  document.getElementById("feedback-box").style.display = "none";
}

function selecionarAlternativa(indiceEscolhido) {
  const correta = questoes[indiceAtual].correta;
  const opcoes = document.querySelectorAll("#options-list li");

  opcoes.forEach((el, i) => {
    el.classList.remove("selected");
    if (i === indiceEscolhido) el.classList.add("selected");
  });

  const feedback = document.getElementById("feedback-box");
  feedback.style.display = "block";
  if (indiceEscolhido === correta) {
    feedback.textContent = "✅ Resposta correta!";
    feedback.className = "feedback correct";
  } else {
    const corretaTexto = questoes[indiceAtual].alternativas[correta];
    feedback.textContent = `❌ Errado! A correta é: ${corretaTexto}`;
    feedback.className = "feedback wrong";
  }
}

function loadNextQuestion() {
  indiceAtual++;
  if (indiceAtual >= questoes.length) {
    indiceAtual = 0;
    alert("Você concluiu todas as questões!");
  }
  carregarQuestao();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// Inicializa a primeira questão
carregarQuestao();
