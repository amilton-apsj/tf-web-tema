import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const selectSemSenha = {
  id: true,
  nome: true,
  crn: true,
  email: true,
};

export async function listarNutricionistas(req, res, next) {
  try {
    const nutricionistas = await prisma.nutricionista.findMany({
      select: selectSemSenha,
    });
    res.json(nutricionistas);
  } catch (erro) {
    next(erro);
  }
}

export async function buscarNutricionista(req, res, next) {
  try {
    const { id } = req.params;
    const nutricionista = await prisma.nutricionista.findUnique({
      where: { id: Number(id) },
      select: selectSemSenha,
    });

    if (!nutricionista) {
      return res.status(404).json({ erro: 'Nutricionista não encontrado' });
    }

    res.json(nutricionista);
  } catch (erro) {
    next(erro);
  }
}

export async function atualizarNutricionista(req, res, next) {
  const { id } = req.params;

  // 🚨 SEGURANÇA: Só permite atualizar se o ID da URL for igual ao ID do token
  if (Number(id) !== req.nutricionista.id) {
    return res.status(403).json({ erro: 'Você só pode editar o próprio perfil' });
  }

  // Não recebemos senhaHash no body
  const { nome, crn, email } = req.body;

  try {
    const nutricionistaAtualizado = await prisma.nutricionista.update({
      where: { id: Number(id) },
      data: { nome, crn, email },
      select: selectSemSenha,
    });
    return res.status(200).json(nutricionistaAtualizado);
  } catch (erro) {
    if (erro.code === 'P2025') {
      return res.status(404).json({ erro: 'Nutricionista não encontrado' });
    }
    if (erro.code === 'P2002') {
      return res.status(409).json({ erro: 'Email ou CRN já cadastrado por outro usuário' });
    }
    next(erro);
  }
}

export async function deletarNutricionista(req, res, next) {
  const { id } = req.params;

  // 🚨 SEGURANÇA: Só permite deletar a própria conta
  if (Number(id) !== req.nutricionista.id) {
    return res.status(403).json({ erro: 'Você só pode deletar o próprio perfil' });
  }

  try {
    await prisma.nutricionista.delete({
      where: { id: Number(id) },
    });
    return res.status(204).end();
  } catch (erro) {
    if (erro.code === 'P2025') {
      return res.status(404).json({ erro: 'Nutricionista não encontrado' });
    }
    next(erro);
  }
}