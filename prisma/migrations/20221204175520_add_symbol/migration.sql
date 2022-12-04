/*
  Warnings:

  - Added the required column `symbol` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "c" INTEGER NOT NULL,
    "d" INTEGER NOT NULL
);
INSERT INTO "new_Unit" ("a", "b", "c", "d", "id", "name") SELECT "a", "b", "c", "d", "id", "name" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
