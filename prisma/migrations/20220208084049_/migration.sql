/*
  Warnings:

  - You are about to drop the column `description` on the `link` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `link` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "click" ADD COLUMN     "browser" VARCHAR(255),
ADD COLUMN     "device" VARCHAR(200),
ADD COLUMN     "os" VARCHAR(200);

-- AlterTable
ALTER TABLE "link" DROP COLUMN "description",
DROP COLUMN "image",
DROP COLUMN "title";
