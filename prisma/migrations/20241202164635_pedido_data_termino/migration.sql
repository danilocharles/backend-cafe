/*
  Warnings:

  - Added the required column `data_termino` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cliente" INTEGER NOT NULL,
    "data" REAL NOT NULL,
    "data_termino" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Pedido_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Pedido" ("data", "id", "id_cliente", "status") SELECT "data", "id", "id_cliente", "status" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Pedido_1" ON "Pedido"("id");
Pragma writable_schema=0;
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
