import { Module } from '@nestjs/common';
import { TeacherCourse } from './teacher.controller';

import { SequelizeModule } from '@nestjs/sequelize';
import { Teachers } from './teacher.model';
import { TeachersService } from './teacher.service';

@Module({
  imports:[SequelizeModule.forFeature([Teachers])],
  controllers:[TeacherCourse],
  providers:[TeachersService]
})
export class TeacherModule {}
