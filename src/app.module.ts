import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './domain/users/user.module';
import { AuthModule } from './domain/auth/auth.module';
import { LeadModule } from './domain/leads/lead.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, LeadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
