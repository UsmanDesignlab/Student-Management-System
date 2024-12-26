import { IsInt, IsString } from "class-validator";



export class CourseDto{
  @IsString()
  courseName:string;

  @IsInt()
  courseCode:number
  
  @IsInt()
  creditHours:number
}