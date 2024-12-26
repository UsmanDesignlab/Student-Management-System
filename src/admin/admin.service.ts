import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { adminLogin } from "./admin.model";


@Injectable()
export class AdminService {
  constructor(
    @InjectModel(adminLogin) private Admin: typeof adminLogin,

  ) {}

  One(email:string) {
    return this.Admin.findOne({ where: { email } })
  }

  Update( password:any,email:string){
    return this.Admin.update(password, { where: {email} })
  }

  Create(all: any){
    return this.Admin.create(all)
  }

  delete(id: any){
    return this.Admin.destroy({ where: { id } })
  }
}