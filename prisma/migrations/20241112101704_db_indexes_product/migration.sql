/*
  Warnings:

  - You are about to drop the column `stock` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "ProductStock" ADD COLUMN     "variantId" INTEGER;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "stock";

-- CreateIndex
CREATE INDEX "Image_productId_idx" ON "Image"("productId");

-- CreateIndex
CREATE INDEX "Image_variantId_idx" ON "Image"("variantId");

-- CreateIndex
CREATE INDEX "ProductPrice_productId_idx" ON "ProductPrice"("productId");

-- CreateIndex
CREATE INDEX "ProductPrice_productId_variantId_idx" ON "ProductPrice"("productId", "variantId");

-- CreateIndex
CREATE INDEX "ProductPrice_variantId_idx" ON "ProductPrice"("variantId");

-- CreateIndex
CREATE INDEX "ProductStock_productId_idx" ON "ProductStock"("productId");

-- CreateIndex
CREATE INDEX "ProductStock_productId_variantId_idx" ON "ProductStock"("productId", "variantId");

-- CreateIndex
CREATE INDEX "ProductStock_variantId_idx" ON "ProductStock"("variantId");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
