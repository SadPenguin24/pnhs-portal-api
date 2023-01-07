import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DeleteService } from './delete.service';
import { DeleteController } from './delete.controller';
import { UsersModule } from '../users/users.module';
import { SectionModule } from '../section/section.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { EnrolleeModule } from '../enrollees/enrollees.module';
import { CurriculumModule } from '../curriculum/curriculum.module';
import { SubjectModule } from '../subjects/subject.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PassportModule,
    UsersModule,
    SectionModule,
    ScheduleModule,
    EnrolleeModule,
    CurriculumModule,
    SubjectModule,
  ],
  providers: [DeleteService, LocalStrategy, JwtStrategy],
  exports: [DeleteService],
  controllers: [DeleteController],
})
export class DeleteModule {}
