import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { course } from './course.model';

@Injectable()
export class courseService {
  constructor(
    @InjectModel(course) private courseModel: typeof course,
  ) { }


  Create(CourseDto:any) {
    return this.courseModel.create(CourseDto);
  }

  FindAll() {
    return this.courseModel.findAll();
  }

  FindOne(id: any) {
    return this.courseModel.findOne({ where: { id } });
  }

  One(userId:number) {
    return this.courseModel.findOne({ where: { userId } });
  }

  async update(id: number, updateData: any) {
    return this.courseModel.update(updateData, {
      where: { id },
    });
  }


  Delete(id: any) {
    return this.courseModel.destroy({ where: { id } })
  }

}
