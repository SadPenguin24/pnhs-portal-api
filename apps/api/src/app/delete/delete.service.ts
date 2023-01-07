import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SectionService } from '../section/section.service';
import { ScheduleService } from '../schedule/schedule.service';
import { EnrolleeService } from '../enrollees/enrollees.service';
import { CurriculumService } from '../curriculum/curriculum.service';
import { SubjectService } from '../subjects/subject.service';

@Injectable()
export class DeleteService {
  constructor(
    private userService: UsersService,
    private sectionService: SectionService,
    private scheduleService: ScheduleService,
    private curriculumService: CurriculumService,
    private enrolleeService: EnrolleeService,
    private subjectService: SubjectService
  ) {}

  async deleteSchedule(id) {
    try {
      const schedule = await this.scheduleService.getSchedule(id);
      const teacher_id = schedule.teacher_id;
      const section_id = schedule.section_id;

      await this.userService.removeFacultySchedule(teacher_id, id);
      await this.sectionService.removeSchedule(section_id, id);
      await this.scheduleService.deleteSchedule(id);

      return 'successfully deleted';
    } catch (e) {
      return `deleteSchedule Error: ${e}`;
    }
  }

  async deleteSection(id) {
    try {
      const section = await this.sectionService.getSection(id);

      //students, teacher, schedule
      await this.userService.removeSection(id, section.teacher_id, 'faculty');
      section.students_id.map(
        async (student_id) =>
          await this.userService.removeSection(id, student_id, 'student')
      );
      section.schedules_id.map(
        async (schedule_id) =>
          await this.scheduleService.removeSection(schedule_id)
      );

      return await this.sectionService.deleteSection(id);
    } catch (e) {
      return `deleteSchedule Error: ${e}`;
    }
  }

  async deleteEnrollee(id) {
    try {
      return await this.enrolleeService.deleteEnrolleeById(id);
    } catch (e) {
      return `deleteEnrollee Error: ${e}`;
    }
  }

  async deleteSubject(id) {
    await this.deleteSchedule(id);
    return await this.subjectService.deleteSubject(id);
  }

  async deleteCurriculum(id) {
    try {
      return await this.curriculumService.deleteCurriculum(id);
    } catch (e) {
      return `deleteCurriculum Error: ${e}`;
    }
  }
}
