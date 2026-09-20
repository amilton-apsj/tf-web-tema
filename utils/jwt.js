import jwt from 'jsonwebtoken';

const SEGREDO = process.env.JWT_SECRET;
const EXPIRACAO = '7d';

export function gerarToken(nutricionista) {
  const payload = {
    id: nutricionista.id,
    email: nutricionista.email,
  };

  return jwt.sign(payload, SEGREDO, { expiresIn: EXPIRACAO });
}

// 🎯 Desafio: implementar verificarToken
export function verificarToken(token) {
  return jwt.verify(token, SEGREDO);
}