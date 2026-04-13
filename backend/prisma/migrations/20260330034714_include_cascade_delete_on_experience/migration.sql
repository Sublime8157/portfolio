-- DropForeignKey
ALTER TABLE "ExperienceStack" DROP CONSTRAINT "ExperienceStack_experienceId_fkey";

-- AddForeignKey
ALTER TABLE "ExperienceStack" ADD CONSTRAINT "ExperienceStack_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
