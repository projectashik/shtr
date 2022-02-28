-- CreateTable
CREATE TABLE "user" (
  "user_id" SERIAL NOT NULL,
  "username" VARCHAR(255) NOT NULL,
  "password" VARCHAR(60) NOT NULL,
  "is_admin" BOOLEAN NOT NULL DEFAULT false,
  "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);
-- CreateTable
CREATE TABLE "link" (
  "link_id" SERIAL NOT NULL,
  "user_id" INTEGER NOT NULL,
  "url" TEXT NOT NULL,
  "slug" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
  "password" VARCHAR(60),
  CONSTRAINT "link_pkey" PRIMARY KEY ("link_id")
);
-- CreateTable
CREATE TABLE "api" (
  "api_id" SERIAL NOT NULL,
  "user_id" INTEGER NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "api_pkey" PRIMARY KEY ("api_id")
);
-- CreateTable
CREATE TABLE "click" (
  "click_id" SERIAL NOT NULL,
  "link_id" INTEGER NOT NULL,
  "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
  "ua" VARCHAR(255),
  "browser" VARCHAR(255),
  "os" VARCHAR(200),
  "device" VARCHAR(200),
  "ip" VARCHAR(50),
  "referral" VARCHAR(255),
  "country" VARCHAR(255),
  CONSTRAINT "click_pkey" PRIMARY KEY ("click_id")
);
-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
-- CreateIndex
CREATE UNIQUE INDEX "link_slug_key" ON "link"("slug");
-- CreateIndex
CREATE INDEX "link_user_id_idx" ON "link"("user_id");
-- CreateIndex
CREATE INDEX "api_user_id_idx" ON "api"("user_id");
-- CreateIndex
CREATE INDEX "click_link_id_idx" ON "click"("link_id");
-- AddForeignKey
ALTER TABLE
  "link"
ADD
  CONSTRAINT "link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE
  "api"
ADD
  CONSTRAINT "api_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
-- AddForeignKey
ALTER TABLE
  "click"
ADD
  CONSTRAINT "click_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "link"("link_id") ON DELETE CASCADE ON UPDATE CASCADE;