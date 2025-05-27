/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.
  - Added the required column `prompt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quality` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "quality" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
