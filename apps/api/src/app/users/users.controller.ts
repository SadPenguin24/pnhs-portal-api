import {
  Body,
  Post,
  Controller,
  Get,
  Request,
  UseGuards,
  Param,
  Put,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';
import { RolesGuard } from '../roles/roles.guard';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('register')
  createUser(@Body() body) {
    return this.usersService.createUser(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('listStrand')
  listStudentStrand(@Body() body) {
    return this.usersService.listStudentStrand(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Get('role/:role_name')
  getRole(@Param() param) {
    return this.usersService.getRole(param.role_name);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  getUserById(@Param() param) {
    return this.usersService.getUserById(param.id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/update/:id')
  updateUser(@Param() param, @Body() body) {
    return this.usersService.updateUser(param.id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Put('/:student_id/:subject_id')
  updateGrade(@Param() param, @Body() body) {
    return this.usersService.updateGrade(
      param.student_id,
      param.subject_id,
      body
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Faculty)
  @Patch('/:type/:user_id/:schedule_id')
  assignSectionToUser(@Param() param) {
    return this.usersService.assignSectionToUser(
      param.type,
      param.user_id,
      param.section_id
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/etos/:id')
  convertEtoS(@Param() param) {
    return this.usersService.convertEtoS(param.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/')
  getAllUser() {
    return this.usersService.getAllUser();
  }
}
