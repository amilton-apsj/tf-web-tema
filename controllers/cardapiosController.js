import prisma from '../prisma/client.js';

export async function listarCardapios(req, res, next) {
  try {
    const cardapios = await prisma.cardapio.findMany();
    res.json(cardapios);
  } catch (erro) {
    next(erro);
  }
}

export async function buscarCardapio(req, res, next) {
  try {
    const { id } = req.params;
    const cardapio = await prisma.cardapio.findUnique({
      where: { id: Number(id) },
    });

    if (!cardapio) {
      return res.status(404).json({ erro: 'Cardápio não encontrado' });
    }

    res.json(cardapio);
  } catch (erro) {
    next(erro);
  }
}

export async function criarCardapio(req, res, next) {
  try {
    const { data, tipo_refeicao, horario_inicio, horario_fim, nutricionistaId } = req.body;
    const cardapioCriado = await prisma.cardapio.create({
      data: {
        data: new Date(data),
        tipo_refeicao,
        horario_inicio,
        horario_fim,
        nutricionistaId: Number(nutricionistaId),
      },
    });
    return res.status(201).json(cardapioCriado);
  } catch (erro) {
    next(erro);
  }
}

export async function atualizarCardapio(req, res, next) {
  const { id } = req.params;
  const { data, tipo_refeicao, horario_inicio, horario_fim, nutricionistaId } = req.body;
  
  try {
    const cardapioAtualizado = await prisma.cardapio.update({
      where: {
        id: Number(id),
      },
      data: {
        data: data ? new Date(data) : undefined,
        tipo_refeicao,
        horario_inicio,
        horario_fim,
        nutricionistaId: nutricionistaId ? Number(nutricionistaId) : undefined,
      },
    });
    return res.status(200).json(cardapioAtualizado);
  } catch (erro) {
    return res.status(404).json({ erro: 'Cardápio não encontrado' });
  }
}

export async function deletarCardapio(req, res, next) {
  const { id } = req.params;
  
  try {
    await prisma.cardapio.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Cardápio não encontrado' });
  }
}