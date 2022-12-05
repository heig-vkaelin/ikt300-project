-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Unit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "parametersId" INTEGER,
    "baseUnitId" TEXT,
    CONSTRAINT "Unit_parametersId_fkey" FOREIGN KEY ("parametersId") REFERENCES "ConversionParameters" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Unit_baseUnitId_fkey" FOREIGN KEY ("baseUnitId") REFERENCES "Unit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Unit" ("baseUnitId", "id", "name", "parametersId", "symbol") SELECT "baseUnitId", "id", "name", "parametersId", "symbol" FROM "Unit";
DROP TABLE "Unit";
ALTER TABLE "new_Unit" RENAME TO "Unit";
CREATE UNIQUE INDEX "Unit_id_key" ON "Unit"("id");
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
