/*
  Warnings:

  - The `additionalStationary` column on the `assignments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "assignments" DROP COLUMN "additionalStationary",
ADD COLUMN     "additionalStationary" TEXT[] DEFAULT ARRAY[]::TEXT[];
