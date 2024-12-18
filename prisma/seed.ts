import { PrismaClient } from '@prisma/client';
import { BCryptPassword } from '../src/utils/bcrypt-password.utils';

const prisma = new PrismaClient({
  log: [{ level: 'error', emit: 'event' }],
});

async function main(): Promise<void> {
  await prisma.$transaction(async (transaction) => {
    const password = await new BCryptPassword().hashPassword(
      'adminPassword123',
    );
    await transaction.user.upsert({
      create: {
        email: 'admin@admin.com.br',
        name: 'Admin User',
        password,
      },
      where: {
        email: 'admin@admin.com.br',
      },
      update: {
        email: 'admin@admin.com.br',
        name: 'Admin User',
        password,
      },
    });
  });
}

main()
  .then(() => {
    console.log('Seeds executadas com sucesso!');
  })
  .catch((error) => {
    console.error('Houve algo de errado ao executar as seeds', { error });
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
