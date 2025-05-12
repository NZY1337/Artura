/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `defaultBillingAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `defaultShippingAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
DROP COLUMN "defaultBillingAddress",
DROP COLUMN "defaultShippingAddress",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "username" TEXT NOT NULL;
