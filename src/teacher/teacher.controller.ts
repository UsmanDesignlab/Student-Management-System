import { Controller, Get, Put, Delete, HttpException, HttpStatus, Param, Post, Body, ValidationPipe, Res } from "@nestjs/common";
import { Response } from "express";
import { TeachersService } from "./teacher.service";
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto, UpdateDto } from "./teacher.validation";
import { ApiTags } from "@nestjs/swagger";
import { jwtPayload, Roles } from "src/constants";


@ApiTags('Auth')
@Controller("/api/teacher")
export class TeacherCourse {
  constructor(private readonly TeacherService: TeachersService) { }

  @Post("/register")
  async Register(
    @Body(new ValidationPipe()) body: RegisterDto, @Res() res: Response) {
    try {
      const { email, password } = body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const register = await this.TeacherService.Create({
        ...body,
        password: hashedPassword,
      });
      const payload: jwtPayload = { userId: register.id, loggedInAs: Roles.TEACHER }
      const token = jwt.sign(payload, "secret", { expiresIn: "4h" });

      res.cookie("token", token, { httpOnly: true });
      return res.status(201).json({
        message: "User registered successfully",
        data: token,
      });
      ;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Post("/login")
  async Login(
    @Body(new ValidationPipe()) body: LoginDto, @Res() res: Response, email: any) {
    try {
      const { email, password } = body;
      const one = await this.TeacherService.One(email);

      if (!one) {
        return res.sendStatus(404).json({ message: "User not found" });
      }

      await bcrypt.compare(password, one.password, function (err, result) {
        if (err) {
          return res.status(500).json({ message: "Error comparing passwords" });
        }
        if (!result) {
          return res.status(500).json({ message: "Error comparing passwords" });
        } else {
          const payload: jwtPayload = { userId: one.id, loggedInAs: Roles.TEACHER }

          const token = jwt.sign(payload, "secret", { expiresIn: "4h" });
          console.log(one.id);

          res.cookie("token", token);
          return res.status(200).json({ message: "Login successful", token });
        }
      });
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }


  @Post("/logout")
  async Logout(@Res() res: Response) {
    try {
      res.cookie("token", "");
      return res.status(200).json("Register Logout");
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("/change-password")
  async Change(
    @Body(new ValidationPipe()) body: LoginDto, @Res() res: Response) {
    try {
      const { email, password } = body;
      const one = await this.TeacherService.One(email);

      if (!one) {
        return res.sendStatus(404).json({ message: "User not found" });
      }
      else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        await this.TeacherService.Update(email, { password: hashedPassword })
        let token = jwt.sign({ userId: one.id }, "secret", { expiresIn: "4h" })
        res.cookie("token", token)
        res.status(200).json({
          message: "Change Password Successfully", token

        })
      }

    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new HttpException(
        error.message || "Unexpected error occurred",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

}
