/*
  Warnings:

  - You are about to drop the column `generatedByModel` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "generatedByModel",
DROP COLUMN "prompt";
