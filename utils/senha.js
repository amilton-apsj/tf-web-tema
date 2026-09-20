import bcrypt from 'bcryptjs';

// Função de gerar hash (provavelmente você já fez na etapa anterior)
export async function hashSenha(senhaPura) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(senhaPura, salt);
}

// 🎯 Resolução do desafio:
export async function verificarSenha(senha, hash) {
  return await bcrypt.compare(senha, hash);
}