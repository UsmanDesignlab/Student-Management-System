import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';
import { adminLogin } from 'src/admin/admin.model';
import { Student } from 'src/student/student.model';
import { studentCourse } from 'src/student.course/student.course.model';
import { teacherCourse } from 'src/teacher.course/teacher.course.model';

interface Course {
  id: number;
  courseName?: string;
  courseCode?: number;
  creditHours?: number;
  statusId?: number;
  userId?: number
}

@Table({
  tableName: 'course',
  timestamps: true,
})

export class course extends Model<Course> implements Course {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsString()
  @Column({
    field: "course_name",
    type: DataType.STRING,
    allowNull: false,
  })
  courseName?: string;

  @Column({
    field: "course_code",
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseCode?: number;

  @Column({
    field: "credit_hours",
    type: DataType.INTEGER,
    allowNull: false,
  })
  creditHours?: number;

  @IsInt()
  @Column({
    field: "status_id",
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 16
  })
  statusId?: number;

  @ForeignKey(() => adminLogin)
  @Column({
    field: "user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

  @BelongsTo(() => adminLogin)
  adminLogin: adminLogin

  @HasMany(() => studentCourse, "courseId")
  studentCourse: studentCourse

  @HasMany(() => teacherCourse, "courseId")
  teacherCourse: teacherCourse

}