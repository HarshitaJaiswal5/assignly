/*
  Warnings:

  - You are about to alter the column `negotiatedPrice` on the `Application` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "negotiatedPrice" SET DATA TYPE INTEGER;
