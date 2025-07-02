const API_BASE_URL = 'https://questoes-do-miguel.onrender.com';

// Recupera o token salvo no login
function getToken() {
  return localStorage.getItem('token');
}

// Logout simples
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// Carrega a lista de questões
async function loadQuestions() {
  try {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!response.ok) throw new Error('Não autorizado');

    const questions = await response.json();
    const container = document.getElementById('questoesList');
    container.innerHTML = '';

    questions.forEach(q => {
      const div = document.createElement('div');
      div.className = 'question-item';
      div.innerHTML = `
        <p><strong>${q.id}.</strong> ${q.text}</p>
        <button onclick="deleteQuestion(${q.id})">Apagar</button>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error('Erro ao carregar questões:', err);
    document.getElementById('questoesList').innerHTML = '<p style="color:red">Erro ao carregar questões.</p>';
  }
}

// Adiciona nova questão
async function addQuestion() {
  const text = document.getElementById('questionText').value;
  const alternativaA = document.getElementById('alternativaA').value;
  const alternativaB = document.getElementById('alternativaB').value;
  const alternativaC = document.getElementById('alternativaC').value;
  const alternativaD = document.getElementById('alternativaD').value;
  const correta = document.getElementById('correta').value;

  try {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        text,
        alternativaA,
        alternativaB,
        alternativaC,
        alternativaD,
        correta
      })
    });

    if (response.ok) {
      document.getElementById('addError').innerText = '';
      document.getElementById('addQuestionForm').reset();
      loadQuestions();
    } else {
      const data = await response.json();
      document.getElementById('addError').innerText = data.message || 'Erro ao adicionar questão.';
    }

  } catch (err) {
    console.error('Erro ao adicionar questão:', err);
    document.getElementById('addError').innerText = 'Erro de conexão.';
  }
}

// Deleta uma questão
async function deleteQuestion(id) {
  if (!confirm('Tem certeza que deseja apagar esta questão?')) return;

  try {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (response.ok) {
      loadQuestions();
    } else {
      alert('Erro ao apagar questão');
    }

  } catch (err) {
    console.error('Erro ao apagar questão:', err);
    alert('Erro de conexão');
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const token = getToken();
  if (!token) {
    alert('Sessão expirada. Faça login novamente.');
    window.location.href = 'login.html';
    return;
  }

  loadQuestions();

  document.getElementById('logoutBtn').addEventListener('click', logout);

  document.getElementById('addQuestionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addQuestion();
  });
});
