-- CreateTable
CREATE TABLE "ProjectStack" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "technology" TEXT NOT NULL,

    CONSTRAINT "ProjectStack_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectStack" ADD CONSTRAINT "ProjectStack_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
