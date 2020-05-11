import Sequelize, { Model } from 'sequelize';

class Job extends Model {
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

  static associate(models) {
    this.hasMany(models.Transmission);
  }
}

export default Job;
