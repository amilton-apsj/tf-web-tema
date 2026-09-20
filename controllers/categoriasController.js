import prisma from '../prisma/client.js';

export async function listarCategorias(req, res, next) {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (erro) {
    next(erro);
  }
}

export async function buscarCategoria(req, res, next) {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.findUnique({
      where: { id: Number(id) },
    });

    if (!categoria) {
      return res.status(404).json({ erro: 'Categoria não encontrada' });
    }

    res.json(categoria);
  } catch (erro) {
    next(erro);
  }
}

export async function criarCategoria(req, res, next) {
  try {
    const { nome } = req.body;
    const categoriaCriada = await prisma.categoria.create({
      data: {
        nome,
      },
    });
    return res.status(201).json(categoriaCriada);
  } catch (erro) {
    next(erro);
  }
}

export async function atualizarCategoria(req, res, next) {
  const { id } = req.params;
  const { nome } = req.body;
  
  try {
    const categoriaAtualizada = await prisma.categoria.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
      },
    });
    return res.status(200).json(categoriaAtualizada);
  } catch (erro) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }
}

export async function deletarCategoria(req, res, next) {
  const { id } = req.params;
  
  try {
    await prisma.categoria.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Categoria não encontrada' });
  }
}