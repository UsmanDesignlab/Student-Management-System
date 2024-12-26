import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TeacherCourseModule } from 'src/teacher.course/teacher.course.module';
import { TeacherMiddleware } from './teacher.middleware';


@Module({
  imports: [TeacherCourseModule],
})
export class Teacher implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TeacherMiddleware)
      .forRoutes(
        { path: '/api/teacher-course', method: RequestMethod.POST },
        { path: '/api/teacher-course/:id', method: RequestMethod.PUT },
        { path: '/api/teacher-course/:id', method: RequestMethod.DELETE }
      );
  }
}

