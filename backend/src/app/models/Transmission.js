import Sequelize, { Model } from 'sequelize';

class Transmission extends Model {
  static init(sequelize) {
    super.init(
      {
        tech_in: Sequelize.STRING,
        tech_for: Sequelize.STRING,
        server_in: Sequelize.STRING,
        server_for: Sequelize.STRING,
        directory_in: Sequelize.STRING,
        directory_for: Sequelize.STRING,
        user_in: Sequelize.STRING,
        user_for: Sequelize.STRING,
        mask_archive_in: Sequelize.STRING,
        mask_archive_for: Sequelize.STRING,
        size_register_in: Sequelize.STRING,
        size_register_for: Sequelize.STRING,
        node_in: Sequelize.STRING,
        node_for: Sequelize.STRING,
        application_in: Sequelize.STRING,
        application_for: Sequelize.STRING,
        solution_agent_in: Sequelize.STRING,
        solution_agentfor: Sequelize.STRING,
        process_in: Sequelize.STRING,
        process_for: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Job, { foreignKey: 'job_id', as: 'job' });
  }
}

export default Transmission;
