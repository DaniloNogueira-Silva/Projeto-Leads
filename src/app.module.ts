import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './domain/users/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { LeadModule } from './domain/leads/lead.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, LeadModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
