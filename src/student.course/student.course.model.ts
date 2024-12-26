import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';
import { Student } from 'src/student/student.model';
import { course } from 'src/course/course.model';

interface semester {
  id: number;
  studentId?: number;
  courseId?: number;
  statusId?: number;
  userId?: number

}

@Table({
  tableName: 'student_course',
  timestamps: true,
})
export class studentCourse extends Model<semester> implements semester {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Student)
  @Column({
    field: "student_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  studentId?: number;

  @BelongsTo(() => Student)
  Student: Student


  @ForeignKey(() => course)
  @Column({
    field: "course_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId?: number;

  @BelongsTo(() => course)
  course: course


  @Column({
    field: "status_id",
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 16
  })
  statusId?: number;

  @ForeignKey(() => Student)
  @Column({
    field: "user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Student)
  student: Student

}
