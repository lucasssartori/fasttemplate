module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transmissions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      job_id: {
        type: Sequelize.INTEGER,
        references: { model: 'jobs', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      tech_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tech_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      server_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      server_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      directory_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      directory_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mask_archive_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mask_archive_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      size_register_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      size_register_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      node_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      node_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      application_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      application_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      solution_agent_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      solution_agentfor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      process_in: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      process_for: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('transmissions');
  },
};
