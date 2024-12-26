import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';
import { studentCourse } from 'src/student.course/student.course.model';

interface Students {
  id: number;
  email?: string;
  password?: string;
  name?: string;
  semester?: number;
  cgpa?: number;
  statusId?: number;
  userId?: number
}

@Table({
  tableName: 'student',
  timestamps: true,
})
export class Student extends Model<Students> implements Students {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name?: string;

  @IsEmail()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email?: string;

  @IsString()
  @Min(3)
  @Max(6)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;


  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  semester?: number;

  @IsOptional()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  cgpa?: number;

  @IsInt()
  @Column({
    field: "status_id",
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 16
  })
  statusId?: number;
  

  @HasOne(() => studentCourse, "studentId")
  studentCourse: studentCourse

  @HasOne(() => studentCourse, "userId")
  student: studentCourse

}