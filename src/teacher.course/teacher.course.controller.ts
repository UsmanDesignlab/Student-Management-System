import { Controller, Get, Put, Delete, HttpException, HttpStatus, Param, Post, Body, ValidationPipe, UseGuards } from "@nestjs/common";
import { Req } from "@nestjs/common";

import { CreateDto,UpdateDto } from "./teacher.course.validation";
import { TeacherService } from "./teacher.course.service";
import { RoleGuard } from "src/shared/guards/auth.function";
import { Roles } from "src/constants";



@Controller("/api/teacher-course")

export class TeacherCourse {
  constructor(private readonly TeacherService: TeacherService) { }

  @Get("/")
  async All() {
    try {
      const one = await this.TeacherService.All()
      if (!one) {
        throw new HttpException('Failed to retrieve area', HttpStatus.NOT_FOUND);
      }
      return one;
    } catch (error) {
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Get("/:id")
  async One(@Param("id") id: number) {
    try {
      const one = await this.TeacherService.One(id)
      if (!one) {
        throw new HttpException('Failed to retrieve area', HttpStatus.NOT_FOUND);
      }
      return one;
    } catch (error) {
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Post("/")
  @UseGuards(RoleGuard(Roles.TEACHER))
  async Create(@Body() body: CreateDto, @Req() req: any) {
    try {
      const { teacherId, courseId } = body;

      const student = await this.TeacherService.OneStudent(teacherId);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      const course = await this.TeacherService.OneCourse(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      const existingEnrollment = await this.TeacherService.findEnrollment(teacherId, courseId);
      if (existingEnrollment) {
        throw new HttpException('Teacher is already enrolled in this course', HttpStatus.CONFLICT);
      }

      const created = await this.TeacherService.Create({ userId: req.user.userId, ...body });
      if (!created) {
        throw new HttpException('Course not Created', HttpStatus.BAD_REQUEST);
      }
      return created;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put("/:id")
  @UseGuards(RoleGuard(Roles.TEACHER))
  async update(@Param("id") id: number, @Body(new ValidationPipe) data: CreateDto, @Req() req: any) {
    try {
      const two = await this.TeacherService.One(id)
      if (!two) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      const { teacherId, courseId } = data;

      const one = await this.TeacherService.OneStudent(req.user.userId);
      if (!one) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      const student = await this.TeacherService.OneStudent(teacherId);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      const existingEnrollment = await this.TeacherService.findEnrollment(teacherId, courseId);
      if (existingEnrollment) {
        throw new HttpException('Student is already enrolled in this course', HttpStatus.CONFLICT);
      }

      const course = await this.TeacherService.OneCourse
    (courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      console.log(courseId)
      
      const created = await this.TeacherService.update(id, data);
      console.log(data)
      if (!created) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      return created;
    } catch (error) {
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Delete("/:id")
  @UseGuards(RoleGuard(Roles.TEACHER))
  async delete(@Param("id") id: number) {
    try {
      const two = await this.TeacherService.One(id)
      if (!two) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      const one = await this.TeacherService.delete(id)
      if (!one) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return { message: "Successfully Deleted" };
    } catch (error) {
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}