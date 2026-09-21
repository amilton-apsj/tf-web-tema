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
    const { data, tipo_refeicao, horario_inicio, horario_fim } = req.body;
    
    const cardapioCriado = await prisma.cardapio.create({
      data: {
        data: new Date(data),
        tipo_refeicao,
        horario_inicio,
        horario_fim,
        // O autor é obrigatoriamente quem está logado (injetado pelo middleware autenticar)
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
  const { data, tipo_refeicao, horario_inicio, horario_fim } = req.body;
  
  try {
    // 1. Busca o cardápio existente
    const cardapio = await prisma.cardapio.findUnique({
      where: { id: Number(id) },
    });

    if (!cardapio) {
      return res.status(404).json({ erro: 'Cardápio não encontrado' });
    }

    // 2. Trava de segurança: só o dono ou ADMIN pode editar
    const ehDono = cardapio.nutricionistaId === req.nutricionista.id;
    const ehAdmin = req.nutricionista.role === 'ADMIN';

    if (!ehDono && !ehAdmin) {
      return res.status(403).json({ erro: 'Você não tem permissão para alterar este cardápio' });
    }

    // 3. Atualiza os dados
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
    next(erro);
  }
}

export async function deletarCardapio(req, res, next) {
  const { id } = req.params;
  
  try {
    // 1. Busca o cardápio no banco
    const cardapio = await prisma.cardapio.findUnique({
      where: { id: Number(id) },
    });

    // 2. Se não existir, retorna 404 primeiro
    if (!cardapio) {
      return res.status(404).json({ erro: 'Cardápio não encontrado' });
    }

    // 3. Regra de permissão: é o dono OU é ADMIN?
    const ehDono = cardapio.nutricionistaId === req.nutricionista.id;
    const ehAdmin = req.nutricionista.role === 'ADMIN';

    if (!ehDono && !ehAdmin) {
      return res.status(403).json({ erro: 'Você não tem permissão para excluir este cardápio' });
    }

    // 4. Exclui o cardápio
    await prisma.cardapio.delete({
      where: { id: Number(id) },
    });

    return res.status(204).end();
  } catch (erro) {
    next(erro);
  }
}