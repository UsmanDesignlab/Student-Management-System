import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';
import { Teachers } from 'src/teacher/teacher.model';
import { course } from 'src/course/course.model';

interface Teacher {
  id: number;
  teacherId?: number;
  courseId?: number;
  statusId?: number;
  userId?:number
}

@Table({
  tableName: 'teacher_course',
  timestamps: true,
})
export class teacherCourse extends Model<Teacher> implements Teacher {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

 @ForeignKey(()=>Teachers)
  @Column({
    field: "teacher_id",
    type: DataType.INTEGER,
    allowNull: false
  })
  teacherId?: number;

  @BelongsTo(()=>Teachers)
  Teachers:Teacher


  @ForeignKey(()=>course)
  @Column({
    field: "course_id",
    type: DataType.INTEGER,
    allowNull: false
  })
  courseId?: number;
  
  @BelongsTo(()=>course)
  course:course


  @Column({
    field: "status_id",
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 16
  })
  statusId?: number;


  @ForeignKey(()=>Teachers)
  @Column({
    field: "user_id",
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId?: number;

  @BelongsTo(()=>Teachers)
  Teacher:Teachers

}
