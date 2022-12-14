import {
  Body,
  Post,
  Controller,
  UseGuards,
  Param,
  Get,
  Patch,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch('/faculty/handler')
  facultySectionHandler() {
    return this.sectionService.facultySectionHandler();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Get('/parsed')
  getAllParsedSections() {
    return this.sectionService.getAllParsedSections();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Get('/parsed/:id')
  getParsedSection(@Param() param) {
    return this.sectionService.getParsedSection(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('/:id')
  getSection(@Param() param) {
    return this.sectionService.getSection(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Patch('/asts')
  addSubjectToSection(@Body() body) {
    return this.sectionService.addSubjectToSection(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Patch('/:section_id/:schedule_id')
  addScheduleToSection(@Param() param, @Body() body) {
    return this.sectionService.addScheduleToSection(
      param.section_id,
      param.schedule_id,
      body
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Post('create')
  createSection(@Body() body) {
    return this.sectionService.createSection(body);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Put('/update/:id')
  updateSection(@Param() param, @Body() body) {
    return this.sectionService.updateSection(param.id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('/')
  getSections() {
    return this.sectionService.getSections();
  }
}
