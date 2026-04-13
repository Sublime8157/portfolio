-- CreateEnum
CREATE TYPE "technologyType" AS ENUM ('FRONTEND', 'BACKEND', 'TOOLS');

-- CreateTable
CREATE TABLE "Hero" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,

    CONSTRAINT "Hero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "i_do" TEXT NOT NULL,
    "i_contribute" TEXT NOT NULL,
    "i_focus" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Technologies" (
    "id" SERIAL NOT NULL,
    "stack" TEXT NOT NULL,
    "type" "technologyType" NOT NULL,

    CONSTRAINT "Technologies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiences" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tenure" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "stack" TEXT NOT NULL,

    CONSTRAINT "Experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "repo_link" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tenure" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "stack" TEXT NOT NULL,

    CONSTRAINT "Trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Footer" (
    "id" SERIAL NOT NULL,
    "poster" TEXT NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "footerId" INTEGER,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_footerId_fkey" FOREIGN KEY ("footerId") REFERENCES "Footer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
