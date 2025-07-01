const API_BASE_URL = 'https://questoes-do-miguel.onrender.com';

// Função para recuperar o token salvo
function getToken() {
  const token = localStorage.getItem('token');
  console.log('🔑 Token usado:', token);
  return token;
}

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();

  document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
  });

  document.getElementById('addQuestionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addQuestion();
  });
});

// Carregar lista de questões
async function loadQuestions() {
  try {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    if (!response.ok) throw new Error('Falha ao buscar questões');

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
    console.error('❌ Erro ao carregar questões:', err);
    document.getElementById('questoesList').innerText = 'Erro ao carregar questões.';
  }
}

// Adicionar nova questão
async function addQuestion() {
  const text = document.getElementById('questionText').value;
  const alternativaA = document.getElementById('alternativaA').value;
  const alternativaB = document.getElementById('alternativaB').value;
  const alternativaC = document.getElementById('alternativaC').value;
  const alternativaD = document.getElementById('alternativaD').value;
  const correta = document.getElementById('correta').value;

  try {
    const token = getToken();

    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
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

    const data = await response.json();

    if (response.ok) {
      document.getElementById('addError').innerText = '';
      document.getElementById('addQuestionForm').reset();
      loadQuestions();
    } else {
      document.getElementById('addError').innerText = data.message || 'Erro ao adicionar questão';
    }
  } catch (err) {
    console.error('❌ Erro ao adicionar questão:', err);
    document.getElementById('addError').innerText = 'Erro na conexão.';
  }
}

// Deletar questão
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
    console.error('❌ Erro ao apagar questão:', err);
    alert('Erro de conexão');
  }
}

// Logout
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}
