import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  dotenv.config();
  console.log('Seeding...');

  const category1 = await prisma.category.create({
    data: {
      name: "Frontend",
    }
  });
  const category2 = await prisma.category.create({
    data: {
      name: "Backend",
    }
  });
  console.log({category1, category2})

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      firstname: 'Lisa',
      lastname: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'USER',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstname: 'Bart',
      lastname: 'Simpson',
      role: 'ADMIN',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
    },
  });
  console.log({ user1, user2 });
  const rating1 = await prisma.rating.create({
    data: {
      Rating_Category_categoryToCategory: {
        connect: {
          id: category1.id
        }
      },
      rating: 4,
      notes: 'Really solid knowledge!',
      User_Rating_reviewedIDToUser: {
        connect: { id: user1.id }
      },
      User_Rating_reviewerIDToUser: {
        connect: { id: user2.id }
      },
    }
  });
  const rating2 = await prisma.rating.create({
    data: {
      Rating_Category_categoryToCategory: {
        connect: {
          id: category2.id
        }
      },
      rating: 2,
      notes: 'Really need work!',
      User_Rating_reviewedIDToUser: {
        connect: { id: user2.id }
      },
      User_Rating_reviewerIDToUser: {
        connect: { id: user1.id }
      },
    }
  });
  console.log({rating1, rating2});
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
