import prisma from '../prisma/client.js';

export async function listarRestricoes(req, res, next) {
  try {
    const restricoes = await prisma.restricao.findMany();
    res.json(restricoes);
  } catch (erro) {
    next(erro);
  }
}

export async function buscarRestricao(req, res, next) {
  try {
    const { id } = req.params;
    const restricao = await prisma.restricao.findUnique({
      where: { id: Number(id) },
    });

    if (!restricao) {
      return res.status(404).json({ erro: 'Restrição não encontrada' });
    }

    res.json(restricao);
  } catch (erro) {
    next(erro);
  }
}

export async function criarRestricao(req, res, next) {
  try {
    const { nome } = req.body;
    const restricaoCriada = await prisma.restricao.create({
      data: {
        nome,
      },
    });
    return res.status(201).json(restricaoCriada);
  } catch (erro) {
    next(erro);
  }
}

export async function atualizarRestricao(req, res, next) {
  const { id } = req.params;
  const { nome } = req.body;
  
  try {
    const restricaoAtualizada = await prisma.restricao.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
      },
    });
    return res.status(200).json(restricaoAtualizada);
  } catch (erro) {
    return res.status(404).json({ erro: 'Restrição não encontrada' });
  }
}

export async function deletarRestricao(req, res, next) {
  const { id } = req.params;
  
  try {
    await prisma.restricao.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Restrição não encontrada' });
  }
}