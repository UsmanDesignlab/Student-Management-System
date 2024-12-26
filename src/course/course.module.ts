import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { courseService } from './course.service';
import { CourseController } from './course.controller';
import { course } from './course.model';
import { DatabaseModule } from '../database';

@Module({
  imports: [DatabaseModule,SequelizeModule.forFeature([course])],
  controllers: [CourseController],
  providers: [courseService],
  exports:[courseService],
})
export class CourseModule {}

