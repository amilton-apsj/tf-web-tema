import prisma from '../prisma/client.js';

const selectSemSenha = {
  id: true,
  nome: true,
  crn: true,
  email: true,
  criadoEm: true,
  atualizadoEm: true,
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
  const { nome, crn, email, senhaHash } = req.body;
  
  try {
    const nutricionistaAtualizado = await prisma.nutricionista.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        crn,
        email,
        senhaHash,
      },
      select: selectSemSenha,
    });
    return res.status(200).json(nutricionistaAtualizado);
  } catch (erro) {
    return res.status(404).json({ erro: 'Nutricionista não encontrado' });
  }
}

export async function deletarNutricionista(req, res, next) {
  const { id } = req.params;
  
  try {
    await prisma.nutricionista.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Nutricionista não encontrado' });
  }
}