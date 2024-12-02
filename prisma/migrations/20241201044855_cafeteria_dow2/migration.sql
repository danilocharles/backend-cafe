/*
  Warnings:

  - You are about to drop the column `Id_cafeteria` on the `Pedido` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cliente" INTEGER NOT NULL,
    "data" REAL NOT NULL,
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
