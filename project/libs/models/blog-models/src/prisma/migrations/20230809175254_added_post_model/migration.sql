-- CreateEnum
CREATE TYPE "PublicationState" AS ENUM ('Published', 'Draft');

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT '',
    "post_id" INTEGER NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "favorite_id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("favorite_id")
);

-- CreateTable
CREATE TABLE "posts" (
    "post_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publish_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,
    "tags" TEXT[],
    "state" "PublicationState" NOT NULL,
    "type" TEXT NOT NULL DEFAULT '',
    "videoLink" TEXT DEFAULT '',
    "excerpt" TEXT DEFAULT '',
    "content" TEXT DEFAULT '',
    "quoteText" TEXT DEFAULT '',
    "photo" TEXT DEFAULT '',
    "url" TEXT DEFAULT '',
    "description" TEXT DEFAULT '',

    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
