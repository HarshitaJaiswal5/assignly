-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('OPEN', 'ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "assignments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionPDF" TEXT,
    "referencePDF" TEXT,
    "instructions" TEXT,
    "subject" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "postedBy" TEXT NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "deliveryLatitude" DECIMAL(65,30) NOT NULL,
    "deliveryLongitude" DECIMAL(65,30) NOT NULL,
    "additionalStationaryAmount" INTEGER,
    "additionalStationary" TEXT,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assignments_postedBy_idx" ON "assignments"("postedBy");

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_postedBy_fkey" FOREIGN KEY ("postedBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
