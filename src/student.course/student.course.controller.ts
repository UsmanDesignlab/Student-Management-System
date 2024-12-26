import { Controller, Get, Put, Delete, HttpException, HttpStatus, Param, Post, Body, ValidationPipe, UseGuards } from "@nestjs/common";
import { StudentService } from "./student.course.service";
import { CreateDto, UpdateDto } from "./student.course.validation";
import { Req } from "@nestjs/common";
import { RoleGuard } from "src/shared/guards/auth.function";
import { Roles } from "src/constants";



@Controller("/api/student-course")

export class StudentCourse {
  constructor(private readonly StudentService: StudentService) { }

  @Get("/")
  async All() {
    try {
      const one = await this.StudentService.All()
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
      const one = await this.StudentService.One(id)
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
  @UseGuards(RoleGuard(Roles.STUDENT))
  async Create(@Body() body: CreateDto, @Req() req: any) {
    try {
      const { studentId, courseId } = body;

      const student = await this.StudentService.OneStudent(studentId);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      const course = await this.StudentService.OneCourse(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }

      const existingEnrollment = await this.StudentService.findEnrollment(studentId, courseId);
      if (existingEnrollment) {
        throw new HttpException('Student is already enrolled in this course', HttpStatus.CONFLICT);
      }

      const created = await this.StudentService.Create({ userId: req.user.userId, ...body });
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
  @UseGuards(RoleGuard(Roles.STUDENT))
  async update(@Param("id") id: number, @Body(new ValidationPipe) data: CreateDto, @Req() req: any) {
    try {
      const two = await this.StudentService.One(id)
      if (!two) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      const { studentId, courseId } = data;

      const one = await this.StudentService.OneStudent(req.user.userId);
      if (!one) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      const student = await this.StudentService.OneStudent(studentId);
      if (!student) {
        throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
      }

      const existingEnrollment = await this.StudentService.findEnrollment(studentId, courseId);
      if (existingEnrollment) {
        throw new HttpException('Student is already enrolled in this course', HttpStatus.CONFLICT);
      }

      const course = await this.StudentService.OneCourse(courseId);
      if (!course) {
        throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
      }
      console.log(courseId)
      
      const created = await this.StudentService.update(id, data);
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
  @UseGuards(RoleGuard(Roles.STUDENT))
  async delete(@Param() id: number) {
    try {
      const two = await this.StudentService.One(id)
      if (!two) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      const one = await this.StudentService.delete(id)
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