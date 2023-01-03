import { Body, Post, Controller, Param, Get, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { CurriculumService } from './curriculum.service';

@Controller('curriculum')
export class CurriculumController {
  constructor(private curriculumService: CurriculumService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Get('/:id')
  getCurriculum(@Param() param) {
    return this.curriculumService.getCurriculum(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Post('/create')
  createCurriculum(@Body() body) {
    return this.curriculumService.createCurriculum(body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Put('/update/:id')
  updateCurriculum(@Param() param, @Body() body) {
    return this.curriculumService.updateCurriculum(param.id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('/')
  getAllCurriculum() {
    return this.curriculumService.getAllCurriculum();
  }
}
