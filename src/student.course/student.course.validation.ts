import { IsInt } from "class-validator";



export class CreateDto {
  @IsInt()
  courseId: number

  @IsInt()
  studentId: number

}

export class UpdateDto {
  @IsInt()
  courseId: number

  @IsInt()
  studentId: number
}