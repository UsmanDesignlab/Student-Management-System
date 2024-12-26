import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentCourseModule } from './student.course/student.course.module';
import { TeacherCourseModule } from './teacher.course/teacher.course.module';
import { DatabaseModule } from './database';
import { AdminLoginModule } from './admin/admin.module';
import { SomeModule } from './middleware/middleware.module';
import { AppService } from './AppService';
import { AdminMiddleware } from './admin/admin.middleware';
import { Admin } from './admin/admin.middleware.module';
import { Student } from './student/student.middleware.module';
import { Teacher } from './teacher/teacher.middleware.module';
import { RoleGuard } from './shared/guards/auth.function';


@Module({
  imports: [DatabaseModule, StudentModule, CourseModule, TeacherModule, StudentCourseModule, TeacherCourseModule, AdminLoginModule,SomeModule],
  controllers: [],
  providers: [],
})
export class RootModule {
  constructor() {
    console.log("RootModule")
  }
}
