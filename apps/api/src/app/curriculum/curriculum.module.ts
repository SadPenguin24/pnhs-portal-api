import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { CurriculumSchema } from '../schema/curriculum.schema';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PassportModule,
    MongooseModule.forFeature([
      { name: 'curriculum', schema: CurriculumSchema },
    ]),
  ],
  providers: [CurriculumService, LocalStrategy, JwtStrategy],
  exports: [CurriculumService],
  controllers: [CurriculumController],
})
export class CurriculumModule {}
