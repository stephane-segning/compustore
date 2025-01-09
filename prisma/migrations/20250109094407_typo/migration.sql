/*
  Warnings:

  - You are about to drop the column `productViewId` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the `_ProductCategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductCategories" DROP CONSTRAINT "_ProductCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductCategories" DROP CONSTRAINT "_ProductCategories_B_fkey";

-- AlterTable
ALTER TABLE "ProductPrice" DROP COLUMN "productViewId";

-- DropTable
DROP TABLE "_ProductCategories";

-- CreateTable
CREATE TABLE "_product_categories" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_product_categories_AB_unique" ON "_product_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_product_categories_B_index" ON "_product_categories"("B");

-- AddForeignKey
ALTER TABLE "_product_categories" ADD CONSTRAINT "_product_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_product_categories" ADD CONSTRAINT "_product_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
