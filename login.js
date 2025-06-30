const API_URL = 'https://backendquestoes.onrender.com';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const resultBox = document.getElementById('result');
  resultBox.innerText = 'Aguarde...';

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      resultBox.innerText = '✅ Login bem-sucedido! Redirecionando...';

      // Redireciona para página protegida ou painel
      setTimeout(() => {
        window.location.href = '/admin.html'; // Altere se necessário
      }, 1500);
    } else {
      resultBox.innerText = `❌ ${data.message || 'Credenciais inválidas.'}`;
    }
  } catch (err) {
    resultBox.innerText = '❌ Erro de conexão com a API.';
    console.error('Erro de login:', err);
  }
});
