import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { course } from "src/course/course.model";
import { teacherCourse } from "./teacher.course.model";
import { Teachers } from "src/teacher/teacher.model";



@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(teacherCourse) private TeacherCourse: typeof teacherCourse,
    @InjectModel(Teachers) private Teacher: typeof Teachers,
    @InjectModel(course) private Course: typeof course,
  ) {}

  All():any {
    return this.TeacherCourse.findAll()
  }

  One(id:number) {
    return this.TeacherCourse.findOne({where:{id}})
  }

  OneStudents(userId:any){
    return this.TeacherCourse.findOne({where:{userId}})
  }

   OneStudent(id:any){
    return this.Teacher.findOne({where:{id}})
  }

  OneCourse(id:any){
    return this.Course.findOne({where:{id}})
  }

  update(id:any,query:any){
    return this.TeacherCourse.update(query,{where:{id}})
  }

  findEnrollment(teacherId: number, courseId: number) {
    return this.TeacherCourse.findOne({ where: { teacherId, courseId } });
  }
  
  Create(CreateDto:any){
    return this.TeacherCourse.create(CreateDto)
  }

  delete(id:any){
    return this.TeacherCourse.destroy({where:{id}})
  }

}