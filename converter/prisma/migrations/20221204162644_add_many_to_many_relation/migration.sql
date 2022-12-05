/*
  Warnings:

  - You are about to drop the column `typeId` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `a` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `b` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `c` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `d` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "QuantityTypeOnUnit" (
    "typeId" INTEGER NOT NULL,
    "unitId" INTEGER NOT NULL,

    PRIMARY KEY ("typeId", "unitId"),
    CONSTRAINT "QuantityTypeOnUnit_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "QuantityType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuantityTypeOnUnit_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "a" INTEGER NOT NULL,
    "b" INTEGER NOT NULL,
    "c" INTEGER NOT NULL,
    "d" INTEGER NOT NULL
);
INSERT INTO "new_Unit" ("id", "name") SELECT "id", "name" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
