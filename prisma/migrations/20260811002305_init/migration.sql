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
CREATE TABLE "ItemCardapio" (
    "id" SERIAL NOT NULL,
    "categoria" TEXT NOT NULL,
    "nome_alimento" TEXT NOT NULL,
    "restricoes" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "Nutricionista_crn_key" ON "Nutricionista"("crn");

-- CreateIndex
CREATE UNIQUE INDEX "Nutricionista_email_key" ON "Nutricionista"("email");

-- CreateIndex
CREATE INDEX "_CardapioToItemCardapio_B_index" ON "_CardapioToItemCardapio"("B");

-- AddForeignKey
ALTER TABLE "Cardapio" ADD CONSTRAINT "Cardapio_nutricionistaId_fkey" FOREIGN KEY ("nutricionistaId") REFERENCES "Nutricionista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardapioToItemCardapio" ADD CONSTRAINT "_CardapioToItemCardapio_A_fkey" FOREIGN KEY ("A") REFERENCES "Cardapio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardapioToItemCardapio" ADD CONSTRAINT "_CardapioToItemCardapio_B_fkey" FOREIGN KEY ("B") REFERENCES "ItemCardapio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
