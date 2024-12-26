import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Hash } from "crypto";
import { Teachers } from "src/teacher/teacher.model";


@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teachers) private teachers: typeof Teachers,

  ) {}

  One(email:string) {
    return this.teachers.findOne({ where: { email } })
  }

  Update(email:string, password:any){
    return this.teachers.update(password, { where: {email} })
  }

  Create(all: any){
    return this.teachers.create(all)
  }

  delete(id: any){
    return this.teachers.destroy({ where: { id } })
  }
}