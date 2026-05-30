/*
  Warnings:

  - Added the required column `experienceYears` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseExpiry` to the `Driver` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "availability" TEXT NOT NULL DEFAULT 'available',
ADD COLUMN     "experienceYears" INTEGER NOT NULL,
ADD COLUMN     "joiningDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "licenseExpiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
