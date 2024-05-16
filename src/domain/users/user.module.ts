import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserProviders } from './service/user.provider';
import { UserController } from './user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repositories/user.repository';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    JwtService,
    ...UserProviders,
  ],
  exports: [UserService]
})
export class UserModule {}
