document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      saveToken(data.token);
      window.location.href = 'painel.html';
    } else {
      document.getElementById('loginError').innerText = data.error || 'Erro no login';
    }
  } catch (err) {
    console.error('Erro ao conectar no backend:', err);
    document.getElementById('loginError').innerText = 'Erro na conexão';
  }
});
