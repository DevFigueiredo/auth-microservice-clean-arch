import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthUseCase } from '@src/data/use-cases/auth/auth.use-case';
import { JwtTokenAdapter } from '@src/infra/adapters/token-adapter';
import { AuthRepository } from '@src/infra/db/auth/auth.repository';
import { AuthController } from '@src/presentation/controllers/auth.controller';
import { PrismaDb } from '../config/prisma/prisma-db.config';
import { BCryptPassword } from '@src/utils/bcrypt-password.utils';
import { CheckSessionUseCase } from '@src/data/use-cases/check-session/check-session.use-case';
import { CheckSessionController } from '@src/presentation/controllers/check-session.controller';
import { LoggerMiddleware } from '@src/presentation/middlewares/logger.middleware';

@Module({
  imports: [],
  controllers: [AuthController, CheckSessionController],
  providers: [
    AuthUseCase,
    AuthRepository,
    JwtTokenAdapter,
    PrismaDb,
    CheckSessionUseCase,
    { provide: BCryptPassword, useValue: new BCryptPassword() },
    {
      provide: JwtTokenAdapter,
      useValue: new JwtTokenAdapter(process.env.PASSWORD_HASH),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Aplica o middleware para todas as rotas
  }
}
