import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches, Max, Min } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsEmail()
  email: string


  @Length(4)
  @IsString()
  password: string

  @IsOptional()
  @IsInt()
  cgpa:number


  @IsInt()
  semester:number

}

export class LoginDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ example: "haseeb.rehman@gmail.com" })
  email: string


  @Length(4)
  @IsString()
  @ApiProperty({})
  password: string

}
