const API_BASE_URL = 'https://questoes-do-miguel.onrender.com';

let questoes = [];
let indexAtual = 0;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/questions`);
    questoes = await res.json();
    embaralhar(questoes);
    mostrarQuestao();
  } catch (err) {
    document.getElementById('simulado').innerHTML = '<p>Erro ao carregar questões.</p>';
  }
});

function mostrarQuestao() {
  const questao = questoes[indexAtual];
  const div = document.getElementById('simulado');
  div.innerHTML = `
    <div class="questao">
      <p><strong>${indexAtual + 1}.</strong> ${questao.text}</p>
      <div class="alternativa" onclick="responder(this, 'A', '${questao.correta}')">A) ${questao.alternativaA}</div>
      <div class="alternativa" onclick="responder(this, 'B', '${questao.correta}')">B) ${questao.alternativaB}</div>
      <div class="alternativa" onclick="responder(this, 'C', '${questao.correta}')">C) ${questao.alternativaC}</div>
      <div class="alternativa" onclick="responder(this, 'D', '${questao.correta}')">D) ${questao.alternativaD}</div>
      <div class="alternativa" onclick="responder(this, 'E', '${questao.correta}')">E) ${questao.alternativaE}</div>
      <p id="resultado"></p>
    </div>
  `;
  document.getElementById('proximaBtn').style.display = 'none';
}

function responder(element, resposta, correta) {
  const alternativas = document.querySelectorAll('.alternativa');
  alternativas.forEach(alt => alt.style.pointerEvents = 'none');

  if (resposta === correta) {
    element.classList.add('correta');
    document.getElementById('resultado').innerText = '✅ Correto!';
  } else {
    element.classList.add('incorreta');
    const corretaEl = Array.from(alternativas).find(alt => alt.textContent.startsWith(correta + ')'));
    if (corretaEl) corretaEl.classList.add('correta');
    document.getElementById('resultado').innerText = '❌ Incorreto!';
  }

  document.getElementById('proximaBtn').style.display = 'block';
}

document.getElementById('proximaBtn').addEventListener('click', () => {
  indexAtual++;
  if (indexAtual < questoes.length) {
    mostrarQuestao();
  } else {
    document.getElementById('simulado').innerHTML = '<h2>🏁 Fim do simulado!</h2>';
    document.getElementById('proximaBtn').style.display = 'none';
  }
});

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
