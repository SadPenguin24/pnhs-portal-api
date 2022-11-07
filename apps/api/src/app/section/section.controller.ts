import {
  Body,
  Post,
  Controller,
  UseGuards,
  Param,
  Get,
  Patch,
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
  @Roles(Role.Admin, Role.Faculty)
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
  @Patch('/:section_id/:subject_id')
  addSubjectToSection(@Param() param) {
    return this.sectionService.addSubjectToSection(
      param.section_id,
      param.subject_id
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Post('create')
  createSection(@Body() body) {
    return this.sectionService.createSection(body);
  }
}
