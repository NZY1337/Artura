/*
  Warnings:

  - You are about to drop the column `uploadedProjectId` on the `Image` table. All the data in the column will be lost.
  - Made the column `projectId` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_uploadedProjectId_fkey";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "uploadedProjectId",
ALTER COLUMN "projectId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
