// public/login.js

const API_URL = 'https://backendquestoes.onrender.com';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('result').innerText = `Token: ${data.token}`;
      localStorage.setItem('token', data.token);
    } else {
      document.getElementById('result').innerText = data.message || 'Erro ao logar.';
    }
  } catch (err) {
    document.getElementById('result').innerText = 'Erro de conexão com a API.';
  }
});
