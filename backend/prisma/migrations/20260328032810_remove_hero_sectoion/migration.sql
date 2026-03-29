/*
  Warnings:

  - You are about to drop the `HeroSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HeroSection";

-- CreateTable
CREATE TABLE "hero_section" (
    "id" SERIAL NOT NULL,
    "paragraph" TEXT,
    "profil_image" TEXT NOT NULL,

    CONSTRAINT "hero_section_pkey" PRIMARY KEY ("id")
);
