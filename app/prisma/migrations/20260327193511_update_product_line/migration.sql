/*
  Warnings:

  - You are about to drop the `_OrderToProductLine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `ProductLine` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_OrderToProductLine_B_index";

-- DropIndex
DROP INDEX "_OrderToProductLine_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_OrderToProductLine";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "ProductLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductLine" ("id", "priceCents", "productId", "quantity") SELECT "id", "priceCents", "productId", "quantity" FROM "ProductLine";
DROP TABLE "ProductLine";
ALTER TABLE "new_ProductLine" RENAME TO "ProductLine";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
