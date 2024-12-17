import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const AuthGuard = () => {
  return applyDecorators(
    UseGuards(AuthMiddleware),
    ApiBearerAuth('Authorization'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
