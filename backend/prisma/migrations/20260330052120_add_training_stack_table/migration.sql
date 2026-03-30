/*
  Warnings:

  - You are about to drop the column `stack` on the `Trainings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trainings" DROP COLUMN "stack";

-- CreateTable
CREATE TABLE "TrainingStack" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "technology" TEXT NOT NULL,

    CONSTRAINT "TrainingStack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrainingStack" ADD CONSTRAINT "TrainingStack_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
