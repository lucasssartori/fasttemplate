import Sequelize, { Model } from 'sequelize';

class Jobs extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        system: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Jobs;
