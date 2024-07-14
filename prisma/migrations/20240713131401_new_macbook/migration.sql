-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "locationType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "salary" INTEGER NOT NULL,
    "applicationEmail" TEXT,
    "applicationUrl" TEXT,
    "companyLogoUrl" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jobs_slug_key" ON "jobs"("slug");
