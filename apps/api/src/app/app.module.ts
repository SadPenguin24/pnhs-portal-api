import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

//modules
import { AuthModule } from './auth/auth.module';
import { EnrolleeModule } from './enrollees/enrollees.module';
import { SectionModule } from './section/section.module';
import { SubjectModule } from './subjects/subject.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../../', 'dist/apps/frontend'),
    }),
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
  ],
})
export class AppModule {}
