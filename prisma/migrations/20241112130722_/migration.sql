/*
  Warnings:

  - The `currency` column on the `ProductPrice` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('XAF', 'USD');

-- AlterTable
ALTER TABLE "ProductPrice" DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'XAF';
