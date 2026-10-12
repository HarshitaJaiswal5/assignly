-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "gigId" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "negotiatedPrice" DECIMAL(65,30) NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_gigId_idx" ON "Application"("gigId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_gigId_applicantId_key" ON "Application"("gigId", "applicantId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_gigId_fkey" FOREIGN KEY ("gigId") REFERENCES "assignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
