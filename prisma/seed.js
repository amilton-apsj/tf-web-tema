const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Limpando o banco...');
  
  // A ordem de deleção respeita as Chaves Estrangeiras (FKs)
  await prisma.cardapio.deleteMany();
  await prisma.itemCardapio.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.restricao.deleteMany();
  await prisma.nutricionista.deleteMany();

  console.log('Criando dados...');

  // 1. Criar o Nutricionista
  const nutri = await prisma.nutricionista.create({
    data: {
      nome: 'Dra. Silva',
      crn: 'CRN9-12345',
      email: 'nutri@escola.br',
      senhaHash: 'hash_da_senha_123',
    },
  });

  // 2. Criar Categorias
  const catFruta = await prisma.categoria.create({ data: { nome: 'Fruta' } });
  const catPao = await prisma.categoria.create({ data: { nome: 'Pão' } });
  const catPrato = await prisma.categoria.create({ data: { nome: 'Prato Principal' } });
  const catSalada = await prisma.categoria.create({ data: { nome: 'Salada' } });

  // 3. Criar Restrições
  const restGluten = await prisma.restricao.create({ data: { nome: 'Contém glúten' } });

  // 4. Criar os Itens do Cardápio vinculando Categorias e Restrições
  const itemFruta = await prisma.itemCardapio.create({
    data: {
      nome_alimento: 'Banana',
      categoriaId: catFruta.id,
    },
  });

  const itemPao = await prisma.itemCardapio.create({
    data: {
      nome_alimento: 'Pão Francês',
      categoriaId: catPao.id,
      restricoes: {
        connect: [{ id: restGluten.id }],
      },
    },
  });

  const itemPrato = await prisma.itemCardapio.create({
    data: {
      nome_alimento: 'Quibe',
      categoriaId: catPrato.id,
    },
  });

  const itemSalada = await prisma.itemCardapio.create({
    data: {
      nome_alimento: 'Acelga',
      categoriaId: catSalada.id,
    },
  });

  // 5. Criar os Cardápios
  const dataCardapio = new Date('2026-08-10T00:00:00Z');

  // Café da Manhã
  await prisma.cardapio.create({
    data: {
      data: dataCardapio,
      tipo_refeicao: 'Café da manhã',
      horario_inicio: '06:30',
      horario_fim: '08:15',
      nutricionistaId: nutri.id,
      itens: {
        connect: [{ id: itemFruta.id }, { id: itemPao.id }],
      },
    },
  });

  // Almoço
  await prisma.cardapio.create({
    data: {
      data: dataCardapio,
      tipo_refeicao: 'Almoço',
      horario_inicio: '11:15',
      horario_fim: '13:45',
      nutricionistaId: nutri.id,
      itens: {
        connect: [{ id: itemPrato.id }, { id: itemSalada.id }],
      },
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });