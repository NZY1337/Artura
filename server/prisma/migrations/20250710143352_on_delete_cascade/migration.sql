-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ImageGenerationResponse" DROP CONSTRAINT "ImageGenerationResponse_projectId_fkey";

-- AddForeignKey
ALTER TABLE "ImageGenerationResponse" ADD CONSTRAINT "ImageGenerationResponse_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
