/*
  Warnings:

  - Added the required column `name` to the `api` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api" ADD COLUMN     "name" TEXT NOT NULL;
