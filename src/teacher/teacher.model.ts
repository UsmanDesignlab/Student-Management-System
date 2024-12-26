import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';
import { teacherCourse } from 'src/teacher.course/teacher.course.model';

interface teachers {
  id: number;
  email?: string;
  password?: string;
  name?: string;
  statusId?: number;
}

@Table({
  tableName: 'teacher',
  timestamps: true,
})
export class Teachers extends Model<teachers> implements teachers {
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

  @IsInt()
  @Column({
    field: "status_id",
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 16
  })
  statusId?: number;

  @HasOne(()=> teacherCourse,"teacherId")
  teacherCourse:teacherCourse

  @HasOne(()=>teacherCourse,"userId")
  teacher:teacherCourse

}