import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.schema';
import { UsersModule } from '../users/users.module';
import { SubjectSchema } from '../schema/subject.schema';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { ScheduleSchema } from '../schema/schedule.schema';
import { SubjectModule } from '../subjects/subject.module';

@Module({
  imports: [
    UsersModule,
    SubjectModule,
    forwardRef(() => AuthModule),
    PassportModule,
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'subject', schema: SubjectSchema },
      { name: 'schedule', schema: ScheduleSchema },
    ]),
  ],
  providers: [ScheduleService, LocalStrategy, JwtStrategy],
  exports: [ScheduleService],
  controllers: [ScheduleController],
})
export class ScheduleModule {}
