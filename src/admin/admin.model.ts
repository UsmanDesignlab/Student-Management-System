import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { IsString, IsInt, IsDateString, IsOptional, IsPositive, Length, IsEmail, Min, Max, IsEnum } from 'class-validator';
import { course } from 'src/course/course.model';

interface admin {
  id: number;
  email?: string;
  password: string;
  phoneNumber?: string;
  name?: string;
  statusId?: number;
}

@Table({
  tableName: 'admin_login',
  timestamps: true,
})
export class adminLogin extends Model<admin> implements admin {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email?: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;


  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    field: "status_id",
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 16
  })
  statusId?: number;

  @HasMany(() => course, "userId")
  course: course;

}
