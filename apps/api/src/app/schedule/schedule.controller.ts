import { Body, Post, Controller, Param, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Post('/create')
  createSchedule(@Body() body) {
    return this.scheduleService.createSchedule(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getSchedule(@Param() param) {
    return this.scheduleService.getSchedule(param.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/parsed/:id')
  getParsedSchedule(@Param() param) {
    return this.scheduleService.getParsedSchedule(param.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getSchedules() {
    return this.scheduleService.getSchedules();
  }
}
