import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.comment.create({
    data: {
      text: 'Вау! Отличный пост.',
      postId: 1,
      userId: '123',
    },
  });

  // await prisma.favorite.create({
  //   data: {
  //     postId: 1,
  //     userId: '123',
  //   },
  // });

  // await prisma.post.create({
  //   data: {
  //     title: 'Заголовок поста',
  //     userId: '123',
  //     content: 'Содержание поста...',
  //     state: 'published',
  //   },
  // });

  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();

    process.exit(1);
  });
