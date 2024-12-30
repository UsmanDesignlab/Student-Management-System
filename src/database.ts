import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './student/student.model'; 
import { course } from './course/course.model'; 
import { Teachers } from './teacher/teacher.model'; 
import { studentCourse } from './student.course/student.course.model'; 
import { teacherCourse } from './teacher.course/teacher.course.model';
import { adminLogin } from './admin/admin.model';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      port:3306,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      
    }),
    SequelizeModule.forFeature([course, Student, Teachers, studentCourse, teacherCourse, adminLogin]), 
  ],
})
export class DatabaseModule {}
