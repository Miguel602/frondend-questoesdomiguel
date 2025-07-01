// auth.js
import bcrypt from 'bcrypt';
import Usuario from './models/Usuario.js';
import jwt from 'jsonwebtoken';

export async function login(username, password) {
  const usuario = await Usuario.findOne({ where: { username } });
  if (!usuario) throw new Error('Usuário não encontrado');

  const senhaCorreta = await bcrypt.compare(password, usuario.passwordHash);
  if (!senhaCorreta) throw new Error('Senha incorreta');

  const token = jwt.sign(
    { id: usuario.id, username: usuario.username, role: usuario.role },
    'secreto',
    { expiresIn: '1h' }
  );

  return token;
}
