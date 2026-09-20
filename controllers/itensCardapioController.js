import prisma from '../prisma/client.js';

export async function listarItensCardapio(req, res, next) {
  try {
    const itens = await prisma.itemCardapio.findMany();
    res.json(itens);
  } catch (erro) {
    next(erro);
  }
}

export async function buscarItemCardapio(req, res, next) {
  try {
    const { id } = req.params;
    const item = await prisma.itemCardapio.findUnique({
      where: { id: Number(id) },
    });

    if (!item) {
      return res.status(404).json({ erro: 'Item de cardápio não encontrado' });
    }

    res.json(item);
  } catch (erro) {
    next(erro);
  }
}

export async function criarItemCardapio(req, res, next) {
  try {
    const { nome_alimento, categoriaId } = req.body;
    const itemCriado = await prisma.itemCardapio.create({
      data: {
        nome_alimento,
        categoriaId: Number(categoriaId),
      },
    });
    return res.status(201).json(itemCriado);
  } catch (erro) {
    next(erro);
  }
}

export async function atualizarItemCardapio(req, res, next) {
  const { id } = req.params;
  const { nome_alimento, categoriaId } = req.body;
  
  try {
    const itemAtualizado = await prisma.itemCardapio.update({
      where: {
        id: Number(id),
      },
      data: {
        nome_alimento,
        categoriaId: categoriaId ? Number(categoriaId) : undefined,
      },
    });
    return res.status(200).json(itemAtualizado);
  } catch (erro) {
    return res.status(404).json({ erro: 'Item de cardápio não encontrado' });
  }
}

export async function deletarItemCardapio(req, res, next) {
  const { id } = req.params;
  
  try {
    await prisma.itemCardapio.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Item de cardápio não encontrado' });
  }
}