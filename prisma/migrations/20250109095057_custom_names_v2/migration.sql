/*
  Warnings:

  - The `currency` column on the `product_prices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "currencies" AS ENUM ('XAF', 'USD');

-- CreateEnum
CREATE TYPE "roles" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "product_prices" DROP COLUMN "currency",
ADD COLUMN     "currency" "currencies" NOT NULL DEFAULT 'XAF';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "role" "roles" NOT NULL DEFAULT 'USER';

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");
