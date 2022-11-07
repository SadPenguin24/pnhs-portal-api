import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { UserSchema } from '../users/user.schema';
import { UsersModule } from '../users/users.module';
import { SubjectSchema } from '../schema/subject.schema';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => AuthModule),
    PassportModule,
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'subject', schema: SubjectSchema },
    ]),
  ],
  providers: [SubjectService, LocalStrategy, JwtStrategy],
  exports: [SubjectService],
  controllers: [SubjectController],
})
export class SubjectModule {}
