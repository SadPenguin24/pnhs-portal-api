import { Module, forwardRef } from '@nestjs/common';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { MiscSchema } from '../schema/misc.schema';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    PassportModule,
    MongooseModule.forFeature([{ name: 'misc', schema: MiscSchema }]),
  ],
  providers: [MiscService, LocalStrategy, JwtStrategy],
  exports: [MiscService],
  controllers: [MiscController],
})
export class MiscModule {}
