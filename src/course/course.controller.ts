import { Controller, Get, Post, Put, Delete, Param, Body, Req, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { courseService } from './course.service';
import { CourseDto } from './course.validation';
import { RoleGuard } from 'src/shared/guards/auth.function';
import { Roles } from 'src/constants';

@Controller('/api/course')
export class CourseController {
  constructor(private readonly courseService: courseService) { }

  @Get("/")
  async findAll() {
    try {
      let one = await this.courseService.FindAll();
      if (!one) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return one
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    try {
      let one = await this.courseService.FindOne(id);
      if (!one) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return one;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Post("/")
  @UseGuards(RoleGuard(Roles.ADMIN))
  async create(@Body() Body: CourseDto, @Req() req: any) {
    try {
      let one = await this.courseService.Create({...Body,userId:req.user.userId});
      if (!one) {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return one;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
       error.status|| HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put('/:id')
  @UseGuards(RoleGuard(Roles.ADMIN))
  async update(@Param('id') id: number, @Body() body: CourseDto, @Req() req: any) {
    try {
      const courseDetail = await this.courseService.FindOne(id);
      if (!courseDetail) {
        throw new HttpException("Course Details not found", HttpStatus.NOT_FOUND)
      }
      const Detail = await this.courseService.One(req.user.userId);
      if (!Detail) {
        throw new HttpException("id does not match", HttpStatus.NOT_FOUND)
      }
      let one = await this.courseService.update(id, body);
      if (!one) {
        throw new HttpException("Course Details not found", HttpStatus.NOT_FOUND)
      }
      return one;

    } catch (error) {
      console.error("Error creating user:", error);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete('/:id')
  @UseGuards(RoleGuard(Roles.ADMIN))
  async destroy(@Param('id') id: number) {
    try {
      const courseDetail = await this.courseService.FindOne(id);
      if (!courseDetail) {
        throw new HttpException("Course Details not found", HttpStatus.NOT_FOUND)
      }
      let one = await this.courseService.Delete(id);
      if (!one) {
        throw new HttpException("Course Details not found", HttpStatus.NOT_FOUND)
      }
      return one;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
