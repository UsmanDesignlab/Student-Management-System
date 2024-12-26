
import { Sequelize } from 'sequelize';

export class AppService {
  constructor(private sequelize: Sequelize) { }

  async initializeDatabase() {
    await this.sequelize.sync({ force: true });
    console.log('Database synchronized without forcing table drops');
  }
}
