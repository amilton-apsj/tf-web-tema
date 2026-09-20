import { PrismaClient } from '@prisma/client';
import { hashSenha, verificarSenha } from '../utils/senha.js';
import { gerarToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

// select que omite senhaHash - igual ao nutricionistasController (se existir)
const selectSemSenha = {
  id: true,
  nome: true,
  crn: true,
  email: true,
};

// POST /auth/register — cria uma conta com a senha protegida por hash
export async function register(req, res, next) {
  try {
    const { nome, crn, email, senha } = req.body;

    // valida os campos obrigatórios
    if (!nome || !crn || !email || !senha) {
      return res.status(400).json({ erro: 'Nome, CRN, email e senha são obrigatórios' });
    }

    // transforma a senha em texto puro num hash seguro
    const senhaHash = await hashSenha(senha);

    // cria o nutricionista; o select garante que a senhaHash NÃO volta na resposta
    const nutri = await prisma.nutricionista.create({
      data: { nome, crn, email, senhaHash },
      select: selectSemSenha,
    });

    res.status(201).json(nutri);
  } catch (erro) {
    // P2002 = violação de campo único (ex: email ou CRN já existem na base de dados)
    if (erro.code === 'P2002') {
      return res.status(409).json({ erro: 'Email ou CRN já registado' });
    }
    next(erro); // qualquer outro erro vai para o middleware global
  }
}

// POST /auth/login — autentica o nutricionista e devolve um JW
export async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    // 1. Busca o nutricionista pelo email (sem omitir o hash)
    const nutri = await prisma.nutricionista.findUnique({
      where: { email }
    });

    // 2. Se o nutricionista não existir, retorna 401
    if (!nutri) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // 3. Compara a senha enviada com o hash salvo no banco
    const senhaValida = await verificarSenha(senha, nutri.senhaHash);

    // 4. Se a senha não bater, retorna a MESMA mensagem genérica de erro
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // 5. Se tudo estiver correto, gera o token e devolve na resposta
    const token = gerarToken(nutri);
    res.json({ token });

  } catch (erro) {
    next(erro);
  }
}