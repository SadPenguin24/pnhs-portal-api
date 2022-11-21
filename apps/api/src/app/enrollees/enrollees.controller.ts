import { Body, Post, Controller, Param, Get, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { EnrolleeService } from './enrollees.service';

@Controller('enrollee')
export class EnrolleeController {
  constructor(private enrolleeService: EnrolleeService) {}

  @Post('create')
  createEnrollee(@Body() body) {
    return this.enrolleeService.createEnrollee(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('/')
  getEnrollees() {
    return this.enrolleeService.getEnrollees();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('/:id')
  getEnrolleeById(@Param() param) {
    return this.enrolleeService.getEnrolleeById(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Delete('/:id')
  deleteEnrolleeById(@Param() param) {
    return this.enrolleeService.deleteEnrolleeById(param.id);
  }
}
