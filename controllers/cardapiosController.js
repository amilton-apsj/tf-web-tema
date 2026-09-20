import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    // 🚨 SEGURANÇA: nutricionistaId NÃO vem mais do body
    const { data, tipo_refeicao, horario_inicio, horario_fim } = req.body;
    
    const cardapioCriado = await prisma.cardapio.create({
      data: {
        data: new Date(data),
        tipo_refeicao,
        horario_inicio,
        horario_fim,
        // O autor é obrigatoriamente quem está logado (injetado pelo middleware)
        nutricionistaId: req.nutricionista.id,
      },
    });
    return res.status(201).json(cardapioCriado);
  } catch (erro) {
    next(erro);
  }
}

export async function atualizarCardapio(req, res, next) {
  const { id } = req.params;
  // 🚨 SEGURANÇA: nutricionistaId foi removido para evitar que o autor seja alterado maliciosamente
  const { data, tipo_refeicao, horario_inicio, horario_fim } = req.body;
  
  try {
    const cardapioAtualizado = await prisma.cardapio.update({
      where: { id: Number(id) },
      data: {
        data: data ? new Date(data) : undefined,
        tipo_refeicao,
        horario_inicio,
        horario_fim,
      },
    });
    return res.status(200).json(cardapioAtualizado);
  } catch (erro) {
    // P2025 = Registro não encontrado no Prisma
    if (erro.code === 'P2025') {
      return res.status(404).json({ erro: 'Cardápio não encontrado' });
    }
    next(erro); // Envia outros erros para o middleware global
  }
}

export async function deletarCardapio(req, res, next) {
  const { id } = req.params;
  
  try {
    await prisma.cardapio.delete({
      where: { id: Number(id) },
    });
    return res.status(204).end();
  } catch (erro) {
    if (erro.code === 'P2025') {
      return res.status(404).json({ erro: 'Cardápio não encontrado' });
    }
    next(erro);
  }
}