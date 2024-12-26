import { Module } from '@nestjs/common';
import { StudentService } from './student.course.service';
import { studentCourse } from './student.course.model';
import { StudentCourse } from './student.course.controller';
import { DatabaseModule } from 'src/database';
import { SequelizeModule } from '@nestjs/sequelize';
import { course } from 'src/course/course.model';
import { Student } from 'src/student/student.model';

@Module({
  imports:[SequelizeModule.forFeature([studentCourse,course,Student])],
  controllers:[StudentCourse],
  providers:[StudentService],
  exports:[StudentService]
})
export class StudentCourseModule {}
