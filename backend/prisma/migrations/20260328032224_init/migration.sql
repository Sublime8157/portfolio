-- CreateTable
CREATE TABLE "HeroSection" (
    "id" SERIAL NOT NULL,
    "paragraph" TEXT,
    "profil_image" TEXT NOT NULL,

    CONSTRAINT "HeroSection_pkey" PRIMARY KEY ("id")
);
