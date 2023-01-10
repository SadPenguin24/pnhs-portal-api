import { Delete, Controller, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { DeleteService } from './delete.service';

@Controller('delete')
export class DeleteController {
  constructor(private deleteService: DeleteService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Delete('/schedule/:id')
  deleteSchedule(@Param() param) {
    return this.deleteService.deleteSchedule(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Delete('/subject/:id')
  deleteSubject(@Param() param) {
    return this.deleteService.deleteSubject(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Delete('/section/:id')
  deleteSection(@Param() param) {
    return this.deleteService.deleteSection(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Delete('/enrollee/:id')
  deleteEnrollee(@Param() param) {
    return this.deleteService.deleteEnrollee(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty, Role.Student)
  @Delete('/curriculum/:id')
  deleteCurriculum(@Param() param) {
    return this.deleteService.deleteCurriculum(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Delete('/reportcard/:student_id/:subject_id')
  deleteReportCard(@Param() param) {
    return this.deleteService.deleteReportCard(
      param.student_id,
      param.subject_id
    );
  }
}
