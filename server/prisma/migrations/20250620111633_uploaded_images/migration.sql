-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_projectId_fkey";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "uploadedProjectId" TEXT,
ALTER COLUMN "projectId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_uploadedProjectId_fkey" FOREIGN KEY ("uploadedProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
