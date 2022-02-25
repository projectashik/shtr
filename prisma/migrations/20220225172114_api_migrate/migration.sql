-- CreateTable
CREATE TABLE "api" (
    "api_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_pkey" PRIMARY KEY ("api_id")
);

-- CreateIndex
CREATE INDEX "api_user_id_idx" ON "api"("user_id");

-- AddForeignKey
ALTER TABLE "api" ADD CONSTRAINT "api_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
