-- CreateTable
CREATE TABLE "Nutricionista" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "crn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nutricionista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cardapio" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "tipo_refeicao" TEXT NOT NULL,
    "horario_inicio" TEXT NOT NULL,
    "horario_fim" TEXT NOT NULL,
    "nutricionistaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cardapio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restricao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Restricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCardapio" (
    "id" SERIAL NOT NULL,
    "nome_alimento" TEXT NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemCardapio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardapioToItemCardapio" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CardapioToItemCardapio_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ItemCardapioToRestricao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ItemCardapioToRestricao_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nutricionista_crn_key" ON "Nutricionista"("crn");

-- CreateIndex
CREATE UNIQUE INDEX "Nutricionista_email_key" ON "Nutricionista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nome_key" ON "Categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Restricao_nome_key" ON "Restricao"("nome");

-- CreateIndex
CREATE INDEX "_CardapioToItemCardapio_B_index" ON "_CardapioToItemCardapio"("B");

-- CreateIndex
CREATE INDEX "_ItemCardapioToRestricao_B_index" ON "_ItemCardapioToRestricao"("B");

-- AddForeignKey
ALTER TABLE "Cardapio" ADD CONSTRAINT "Cardapio_nutricionistaId_fkey" FOREIGN KEY ("nutricionistaId") REFERENCES "Nutricionista"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCardapio" ADD CONSTRAINT "ItemCardapio_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardapioToItemCardapio" ADD CONSTRAINT "_CardapioToItemCardapio_A_fkey" FOREIGN KEY ("A") REFERENCES "Cardapio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardapioToItemCardapio" ADD CONSTRAINT "_CardapioToItemCardapio_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemCardapio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemCardapioToRestricao" ADD CONSTRAINT "_ItemCardapioToRestricao_A_fkey" FOREIGN KEY ("A") REFERENCES "ItemCardapio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemCardapioToRestricao" ADD CONSTRAINT "_ItemCardapioToRestricao_B_fkey" FOREIGN KEY ("B") REFERENCES "Restricao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
