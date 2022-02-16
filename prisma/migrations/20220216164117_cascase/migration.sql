-- DropForeignKey
ALTER TABLE "click" DROP CONSTRAINT "click_link_id_fkey";

-- DropForeignKey
ALTER TABLE "link" DROP CONSTRAINT "link_user_id_fkey";

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "click" ADD CONSTRAINT "click_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "link"("link_id") ON DELETE CASCADE ON UPDATE CASCADE;
