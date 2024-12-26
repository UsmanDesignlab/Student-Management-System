import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { AdminMiddleware } from './admin.middleware';

@Module({
  imports: [CourseModule],
})
export class Admin implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: '/api/course', method: RequestMethod.POST },
        { path: '/api/course/:id', method: RequestMethod.PUT },
        { path: '/api/course/:id', method: RequestMethod.DELETE },
      );
  }
}
