import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { LoggedInMiddleWare } from './loggedIn.middleware';
import { StudentCourseModule } from 'src/student.course/student.course.module';
import { TeacherCourseModule } from 'src/teacher.course/teacher.course.module';

@Module({
  imports: [CourseModule, StudentCourseModule, TeacherCourseModule],
})
export class SomeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggedInMiddleWare)
      .forRoutes(
        { path: '/api/course', method: RequestMethod.POST },
        { path: '/api/course/:id', method: RequestMethod.PUT },
        { path: '/api/course/:id', method: RequestMethod.DELETE },
        { path: '/api/student-course', method: RequestMethod.POST },
        { path: '/api/student-course/:id', method: RequestMethod.PUT },
        { path: '/api/student-course/:id', method: RequestMethod.DELETE },
        { path: '/api/teacher-course', method: RequestMethod.POST },
        { path: '/api/teacher-course/:id', method: RequestMethod.PUT },
        { path: '/api/teacher-course/:id', method: RequestMethod.DELETE }
      );
  }
}

