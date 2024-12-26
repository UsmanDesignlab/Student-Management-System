import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { StudentMiddleware } from './student.middleware';
import { StudentCourseModule } from 'src/student.course/student.course.module';


@Module({
  imports: [StudentCourseModule],
})
export class Student implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StudentMiddleware)
      .forRoutes(
        { path: '/api/student-course', method: RequestMethod.POST },
        { path: '/api/student-course/:id', method: RequestMethod.PUT },
        { path: '/api/student-course/:id', method: RequestMethod.DELETE },
      );
  }
}
