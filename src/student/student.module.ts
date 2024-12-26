import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'; 
import { DatabaseModule } from 'src/database';
import { Student } from 'src/student/student.model'; 
import { StudentService } from './student.service';
import { StudentCourse } from './student.controller';



@Module({ 
  imports: [DatabaseModule,SequelizeModule.forFeature([Student])],
   providers: [StudentService],
   controllers: [StudentCourse]
  })
    
    export class StudentModule {}