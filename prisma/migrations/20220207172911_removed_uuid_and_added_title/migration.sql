/*
  Warnings:

  - You are about to drop the column `link_uuid` on the `link` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "link_link_uuid_key";

-- AlterTable
ALTER TABLE "click" ADD COLUMN     "country" VARCHAR(255),
ADD COLUMN     "referral" VARCHAR(255);

-- AlterTable
ALTER TABLE "link" DROP COLUMN "link_uuid",
ADD COLUMN     "title" VARCHAR(255);
