/*
  Warnings:

  - You are about to drop the `QuantityTypeOnUnit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "QuantityTypeOnUnit";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_QuantityTypeToUnit" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_QuantityTypeToUnit_A_fkey" FOREIGN KEY ("A") REFERENCES "QuantityType" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_QuantityTypeToUnit_B_fkey" FOREIGN KEY ("B") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuantityTypeToUnit_AB_unique" ON "_QuantityTypeToUnit"("A", "B");

-- CreateIndex
CREATE INDEX "_QuantityTypeToUnit_B_index" ON "_QuantityTypeToUnit"("B");
