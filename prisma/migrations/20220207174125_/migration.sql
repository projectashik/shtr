/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "link_slug_key" ON "link"("slug");
