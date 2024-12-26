import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Student } from "./student.model";



@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private Students: typeof Student,

  ) {}

  One(email:string) {
    return this.Students.findOne({ where: { email } })
  }

  Update( password:any,email:string){
    return this.Students.update(password, { where: {email} })
  }

  Create(all: any){
    return this.Students.create(all)
  }

  delete(id: any){
    return this.Students.destroy({ where: { id } })
  }
}