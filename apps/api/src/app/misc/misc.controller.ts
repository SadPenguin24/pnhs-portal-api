import { Body, Post, Controller, Param, Get, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { MiscService } from './misc.service';

@Controller('misc')
export class MiscController {
  constructor(private miscService: MiscService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('/:id')
  getMisc(@Param() param) {
    return this.miscService.getMisc(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Post('/create')
  createMisc(@Body() body) {
    return this.miscService.createMisc(body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Put('/update/bool')
  updateBool(@Body() body) {
    return this.miscService.updateBool(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('/')
  getAllMisc() {
    return this.miscService.getAllMisc();
  }
}
