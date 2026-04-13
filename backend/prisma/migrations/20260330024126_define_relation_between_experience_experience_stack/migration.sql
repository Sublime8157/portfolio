/*
  Warnings:

  - You are about to drop the column `stack` on the `Experiences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Experiences" DROP COLUMN "stack";

-- CreateTable
CREATE TABLE "ExperienceStack" (
    "id" SERIAL NOT NULL,
    "experienceId" INTEGER NOT NULL,

    CONSTRAINT "ExperienceStack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExperienceStack" ADD CONSTRAINT "ExperienceStack_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experiences"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
