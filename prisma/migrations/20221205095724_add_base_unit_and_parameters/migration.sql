/*
  Warnings:

  - The primary key for the `Unit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `a` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `b` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `c` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `d` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `paramtersId` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "UnitAlias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "unitId" TEXT NOT NULL,
    CONSTRAINT "UnitAlias_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ConversionParameters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "a" REAL NOT NULL,
    "b" REAL NOT NULL,
    "c" REAL NOT NULL,
    "d" REAL NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "paramtersId" INTEGER NOT NULL,
    "unitId" TEXT NOT NULL,
    CONSTRAINT "Unit_paramtersId_fkey" FOREIGN KEY ("paramtersId") REFERENCES "ConversionParameters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Unit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Unit" ("id", "name") SELECT "id", "name" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
CREATE UNIQUE INDEX "Unit_id_key" ON "Unit"("id");
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
CREATE TABLE "new__QuantityTypeToUnit" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_QuantityTypeToUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "QuantityType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuantityTypeToUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__QuantityTypeToUnit" ("A", "B") SELECT "A", "B" FROM "_QuantityTypeToUnit";
DROP TABLE "_QuantityTypeToUnit";
ALTER TABLE "new__QuantityTypeToUnit" RENAME TO "_QuantityTypeToUnit";
CREATE UNIQUE INDEX "_QuantityTypeToUnit_AB_unique" ON "_QuantityTypeToUnit"("A", "B");
CREATE INDEX "_QuantityTypeToUnit_B_index" ON "_QuantityTypeToUnit"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UnitAlias_name_key" ON "UnitAlias"("name");
