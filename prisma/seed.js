const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Limpando o banco...');
  // Limpa as tabelas para evitar duplicação se você rodar o seed várias vezes
  await prisma.cardapio.deleteMany();
  await prisma.itemCardapio.deleteMany();
  await prisma.nutricionista.deleteMany();

  console.log('Criando dados...');

  // 1. Criar o Nutricionista (Pai)
  const nutri = await prisma.nutricionista.create({
    data: {
      nome: 'Dra. Silva',
      crn: 'CRN9-12345',
      email: 'nutri@escola.br',
      senhaHash: 'hash_da_senha_123',
    },
  });

  // 2. Criar os Itens do Cardápio (Filhos/Independentes)
  const itemFruta = await prisma.itemCardapio.create({
    data: { categoria: 'FRUTA', nome_alimento: 'Banana' },
  });

  const itemPao = await prisma.itemCardapio.create({
    data: { categoria: 'PÃO', nome_alimento: 'Pão Francês', restricoes: 'Contém glúten' },
  });

  const itemPrato = await prisma.itemCardapio.create({
    data: { categoria: 'PRATO PRINCIPAL', nome_alimento: 'Quibe' },
  });

  const itemSalada = await prisma.itemCardapio.create({
    data: { categoria: 'SALADA', nome_alimento: 'Acelga' },
  });

  // 3. Criar os Cardápios vinculando o Nutricionista e os Itens
  // Usando a data do seu print: 10/08/2026
  const dataCardapio = new Date('2026-08-10T00:00:00Z');

  // Criando Café da Manhã
  await prisma.cardapio.create({
    data: {
      data: dataCardapio,
      tipo_refeicao: 'Café da manhã',
      horario_inicio: '06:30',
      horario_fim: '08:15',
      nutricionistaId: nutri.id,
      itens: {
        connect: [{ id: itemFruta.id }, { id: itemPao.id }], // Adiciona os itens criados acima
      },
    },
  });

  // Criando Almoço
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });