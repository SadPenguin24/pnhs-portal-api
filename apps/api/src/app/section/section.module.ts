import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { SectionSchema } from '../schema/section.schema';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/user.schema';
import { SubjectModule } from '../subjects/subject.module';
import { SubjectSchema } from '../schema/subject.schema';

@Module({
  imports: [
    UsersModule,
    SubjectModule,
    forwardRef(() => AuthModule),
    PassportModule,
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'section', schema: SectionSchema },
      { name: 'subjects', schema: SubjectSchema },
    ]),
  ],
  providers: [SectionService, LocalStrategy, JwtStrategy],
  exports: [SectionService],
  controllers: [SectionController],
})
export class SectionModule {}
