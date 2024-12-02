-- CreateTable
CREATE TABLE "Cafeteria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" REAL NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "descricao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ItemCarrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_carrinho" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "ItemCarrinho_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "ItemCarrinho_id_carrinho_fkey" FOREIGN KEY ("id_carrinho") REFERENCES "Carrinho" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "ItemPedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_pedido" INTEGER NOT NULL,
    "id_item" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "ItemPedido_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "Item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "ItemPedido_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "Pedido" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cliente" INTEGER NOT NULL,
    "Id_cafeteria" INTEGER NOT NULL,
    "data" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Pedido_Id_cafeteria_fkey" FOREIGN KEY ("Id_cafeteria") REFERENCES "Cafeteria" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "Pedido_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" REAL NOT NULL
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Cafeteria_1" ON "Cafeteria"("id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Carrinho_1" ON "Carrinho"("id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Item_1" ON "Item"("id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_ItemCarrinho_1" ON "ItemCarrinho"("id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_ItemPedido_1" ON "ItemPedido"("id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Pedido_1" ON "Pedido"("id");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Usuario_1" ON "Usuario"("id");
Pragma writable_schema=0;
