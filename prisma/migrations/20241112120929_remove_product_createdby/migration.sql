/*
  Warnings:

  - You are about to drop the column `createdById` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_createdById_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "createdById";
