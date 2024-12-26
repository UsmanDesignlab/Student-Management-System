import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './student/student.model'; 
import { course } from './course/course.model'; 
import { Teachers } from './teacher/teacher.model'; 
import { studentCourse } from './student.course/student.course.model'; 
import { teacherCourse } from './teacher.course/teacher.course.model';
import { adminLogin } from './admin/admin.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      username: 'root',
      password: '03466787660uU@',
      database: 'student',
      autoLoadModels: true,
      synchronize: true,
      
    }),
    SequelizeModule.forFeature([course, Student, Teachers, studentCourse, teacherCourse, adminLogin]), 
  ],
})
export class DatabaseModule {}
