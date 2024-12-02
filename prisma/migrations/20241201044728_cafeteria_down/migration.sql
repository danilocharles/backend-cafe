/*
  Warnings:

  - You are about to drop the `Cafeteria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "sqlite_autoindex_Cafeteria_1";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cafeteria";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_cliente" INTEGER NOT NULL,
    "Id_cafeteria" INTEGER NOT NULL,
    "data" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Pedido_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Pedido" ("Id_cafeteria", "data", "id", "id_cliente", "status") SELECT "Id_cafeteria", "data", "id", "id_cliente", "status" FROM "Pedido";
DROP TABLE "Pedido";
ALTER TABLE "new_Pedido" RENAME TO "Pedido";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Pedido_1" ON "Pedido"("id");
Pragma writable_schema=0;
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
