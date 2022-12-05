/*
  Warnings:

  - You are about to drop the column `unitId` on the `Unit` table. All the data in the column will be lost.
  - Added the required column `baseUnitId` to the `Unit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "paramtersId" INTEGER NOT NULL,
    "baseUnitId" TEXT NOT NULL,
    CONSTRAINT "Unit_paramtersId_fkey" FOREIGN KEY ("paramtersId") REFERENCES "ConversionParameters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Unit_baseUnitId_fkey" FOREIGN KEY ("baseUnitId") REFERENCES "Unit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Unit" ("id", "name", "paramtersId", "symbol") SELECT "id", "name", "paramtersId", "symbol" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
CREATE UNIQUE INDEX "Unit_id_key" ON "Unit"("id");
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
