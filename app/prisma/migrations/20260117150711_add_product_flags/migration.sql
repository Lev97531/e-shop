-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "rating" INTEGER,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "isOnSale" BOOLEAN NOT NULL DEFAULT false,
    "isNew" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Product" ("description", "id", "imageUrl", "name", "priceCents", "rating", "slug") SELECT "description", "id", "imageUrl", "name", "priceCents", "rating", "slug" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
