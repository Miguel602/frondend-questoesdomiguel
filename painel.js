const API_BASE_URL = 'https://backendquestoes.onrender.com/';

document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();

  document.getElementById('addQuestionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addQuestion();
  });
});

async function loadQuestions() {
  const res = await fetch(`${API_BASE_URL}/questions`);
  const questoes = await res.json();

  const container = document.getElementById('questoesList');
  container.innerHTML = '';

  questoes.forEach(q => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${q.id}.</strong> ${q.text}</p>
      <button onclick="deleteQuestion(${q.id})">Excluir</button>
    `;
    container.appendChild(div);
  });
}

async function addQuestion() {
  const text = document.getElementById('questionText').value;
  const alternativaA = document.getElementById('alternativaA').value;
  const alternativaB = document.getElementById('alternativaB').value;
  const alternativaC = document.getElementById('alternativaC').value;
  const alternativaD = document.getElementById('alternativaD').value;
  const correta = document.getElementById('correta').value;

  const res = await fetch(`${API_BASE_URL}/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, alternativaA, alternativaB, alternativaC, alternativaD, correta }),
  });

  if (res.ok) {
    document.getElementById('addQuestionForm').reset();
    loadQuestions();
  } else {
    document.getElementById('addError').innerText = 'Erro ao salvar questão.';
  }
}

async function deleteQuestion(id) {
  if (!confirm('Deseja apagar a questão?')) return;

  await fetch(`${API_BASE_URL}/questions/${id}`, { method: 'DELETE' });
  loadQuestions();
}
