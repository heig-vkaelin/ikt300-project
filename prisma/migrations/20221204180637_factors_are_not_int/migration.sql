/*
  Warnings:

  - You are about to alter the column `a` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `b` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `c` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `d` on the `Unit` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "a" REAL NOT NULL,
    "b" REAL NOT NULL,
    "c" REAL NOT NULL,
    "d" REAL NOT NULL
);
INSERT INTO "new_Unit" ("a", "b", "c", "d", "id", "name", "symbol") SELECT "a", "b", "c", "d", "id", "name", "symbol" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
