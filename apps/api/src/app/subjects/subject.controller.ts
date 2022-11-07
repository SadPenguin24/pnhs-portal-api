import { Body, Post, Controller, Param, Get } from '@nestjs/common';
//* ^^ */ import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { Roles } from '../roles/roles.decorator';
// import { Role } from '../roles/role.enum';
// import { RolesGuard } from '../roles/roles.guard';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Faculty)
  @Get('/:id')
  getSubject(@Param() param) {
    return this.subjectService.getSubject(param.id);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin, Role.Faculty)
  @Post('create')
  createSubject(@Body() body) {
    return this.subjectService.createSubject(body);
  }
}
