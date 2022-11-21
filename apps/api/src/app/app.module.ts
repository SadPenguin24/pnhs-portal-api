import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

//modules
import { AuthModule } from './auth/auth.module';
import { EnrolleeModule } from './enrollees/enrollees.module';
import { SectionModule } from './section/section.module';
import { SubjectModule } from './subjects/subject.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    AuthModule,
    UsersModule,
    SectionModule,
    SubjectModule,
    EnrolleeModule,
    ScheduleModule,
  ],
})
export class AppModule {}
