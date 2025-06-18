// Função para salvar token
function saveToken(token) {
  localStorage.setItem('token', token);
}

// Função para obter token
function getToken() {
  return localStorage.getItem('token');
}

// Função para remover token (logout)
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}
