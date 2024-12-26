import { Module } from '@nestjs/common';
import { AdminCourse } from './admin.controller';
import { AdminService } from './admin.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { adminLogin } from './admin.model';

@Module({
  imports:[SequelizeModule.forFeature([adminLogin])],
  providers:[AdminService],
  controllers:[AdminCourse]
})
export class AdminLoginModule {}
