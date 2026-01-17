/*
  Warnings:

  - You are about to drop the column `isAvailable` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isNew` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isOnSale` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ProductAttributes" (
    "productId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER,
    "category" TEXT,
    "size" TEXT,
    "color" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isOnSale" BOOLEAN NOT NULL DEFAULT false,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ProductAttributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Product" ("description", "id", "imageUrl", "name", "priceCents", "slug") SELECT "description", "id", "imageUrl", "name", "priceCents", "slug" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
