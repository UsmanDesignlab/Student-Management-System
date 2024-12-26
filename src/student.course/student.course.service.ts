import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { studentCourse } from "./student.course.model";
import { Student } from "src/student/student.model";
import { course } from "src/course/course.model";



@Injectable()
export class StudentService {
  constructor(
    @InjectModel(studentCourse) private StudentCourse: typeof studentCourse,
    @InjectModel(Student) private student: typeof Student,
    @InjectModel(course) private Course: typeof course,
  ) {}

  All():any {
    return this.StudentCourse.findAll()
  }

  One(id:number) {
    return this.StudentCourse.findOne({where:{id}})
  }

  OneStudents(userId:any){
    return this.StudentCourse.findOne({where:{userId}})
  }

   OneStudent(id:any){
    return this.student.findOne({where:{id}})
  }

  OneCourse(id:any){
    return this.Course.findOne({where:{id}})
  }

  update(id:any,query:any){
    return this.StudentCourse.update(query,{where:{id}})
  }

  findEnrollment(studentId: number, courseId: number) {
    return this.StudentCourse.findOne({ where: { studentId, courseId } });
  }
  
  Create(CreateDto:any){
    return this.StudentCourse.create(CreateDto)
  }

  delete(id:any){
    return this.StudentCourse.destroy({where:{id}})
  }

}