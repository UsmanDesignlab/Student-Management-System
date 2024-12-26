import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.course.service';
import { TeacherCourse } from './teacher.course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Teachers } from 'src/teacher/teacher.model';
import { teacherCourse } from './teacher.course.model';
import { course } from 'src/course/course.model';

@Module({
  imports:[SequelizeModule.forFeature([Teachers,teacherCourse,course])],
  controllers:[TeacherCourse],
  providers:[TeacherService],
  exports:[TeacherService]
})
export class TeacherCourseModule {}
