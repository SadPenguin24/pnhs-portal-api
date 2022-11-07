import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/user.schema';
import { EnrolleeService } from './enrollees.service';
import { EnrolleeController } from './enrollees.controller';
import { EnrolleeSchema } from './enrollees.schema';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PassportModule,
    MongooseModule.forFeature([
      { name: 'users', schema: UserSchema },
      { name: 'enrollee', schema: EnrolleeSchema },
    ]),
  ],
  providers: [EnrolleeService, LocalStrategy, JwtStrategy],
  exports: [EnrolleeService],
  controllers: [EnrolleeController],
})
export class EnrolleeModule {}
