import { IsInt, IsOptional } from "class-validator";
import { Request } from "express";


export class CreateDto {
  @IsInt()
  courseId: number

  @IsInt()
  teacherId: number

}

export class UpdateDto {
  @IsInt()
  courseId: number

  @IsInt()
  teacherId: number

}