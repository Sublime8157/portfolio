/*
  Warnings:

  - Added the required column `technology` to the `ExperienceStack` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExperienceStack" ADD COLUMN     "technology" TEXT NOT NULL;
