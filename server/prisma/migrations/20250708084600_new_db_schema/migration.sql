/*
  Warnings:

  - The values [DESIGN_GENERATION] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `background` on the `ImageGenerationResponse` table. All the data in the column will be lost.
  - You are about to drop the column `outputFormat` on the `ImageGenerationResponse` table. All the data in the column will be lost.
  - You are about to drop the column `quality` on the `ImageGenerationResponse` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `ImageGenerationResponse` table. All the data in the column will be lost.
  - The `quality` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `size` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `designTheme` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `spaceType` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SpaceType" AS ENUM ('LIVING_ROOM', 'BEDROOM', 'KITCHEN', 'BATHROOM', 'DINING_ROOM', 'HOME_OFFICE', 'KIDS_ROOM', 'HALLWAY_CORRIDOR', 'BALCONY_TERRACE', 'GAME_ROOM', 'STUDY');

-- CreateEnum
CREATE TYPE "DesignTheme" AS ENUM ('MODERN', 'CONTEMPORARY', 'MINIMALIST', 'SCANDINAVIAN', 'INDUSTRIAL', 'MID_CENTURY_MODERN', 'TRADITIONAL', 'CLASSIC', 'BAROQUE', 'JAPANESE_ZEN', 'WABI_SABI', 'FARMHOUSE', 'RUSTIC', 'BOHEMIAN', 'ART_DECO', 'VICTORIAN', 'COASTAL', 'TROPICAL', 'URBAN', 'MAXIMALIST', 'FUTURISTIC');

-- CreateEnum
CREATE TYPE "OutputFormat" AS ENUM ('PNG', 'JPEG', 'WEBP');

-- CreateEnum
CREATE TYPE "QualityFormat" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "SizeImage" AS ENUM ('SIZE_1024x1024', 'SIZE_1024x1536', 'SIZE_1536x1024', 'AUTO');

-- CreateEnum
CREATE TYPE "GeneratedImagesCount" AS ENUM ('ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN');

-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('DESIGN_GENERATOR', 'LANDSCAPING', 'VIRTUAL_STAGING', 'FLOOR_PLANNING');
ALTER TABLE "Project" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "ImageGenerationResponse" DROP COLUMN "background",
DROP COLUMN "outputFormat",
DROP COLUMN "quality",
DROP COLUMN "size";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "background" TEXT NOT NULL DEFAULT 'auto',
ADD COLUMN     "outputFormat" "OutputFormat" NOT NULL DEFAULT 'PNG',
ALTER COLUMN "category" SET DEFAULT 'DESIGN_GENERATOR',
DROP COLUMN "quality",
ADD COLUMN     "quality" "QualityFormat" NOT NULL DEFAULT 'MEDIUM',
DROP COLUMN "size",
ADD COLUMN     "size" "SizeImage" NOT NULL DEFAULT 'SIZE_1024x1024',
DROP COLUMN "designTheme",
ADD COLUMN     "designTheme" "DesignTheme" NOT NULL DEFAULT 'MODERN',
DROP COLUMN "spaceType",
ADD COLUMN     "spaceType" "SpaceType" NOT NULL DEFAULT 'LIVING_ROOM';

-- DropEnum
DROP TYPE "TransactionStatus";

-- DropEnum
DROP TYPE "TransactionType";

-- CreateIndex
CREATE INDEX "Project_userId_category_designTheme_spaceType_idx" ON "Project"("userId", "category", "designTheme", "spaceType");
