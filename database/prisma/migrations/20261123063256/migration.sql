-- CreateEnum
CREATE TYPE "skills" AS ENUM ('DSA', 'WEB_DEV', 'CODING', 'DATABASE', 'DESIGN', 'WRITING', 'OTHERS');

-- AlterTable
ALTER TABLE "assignments" ADD COLUMN     "category" "skills" NOT NULL DEFAULT 'CODING';
