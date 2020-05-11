import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Job from '../app/models/Job';
import Transmission from '../app/models/Transmission';

const models = [User, Job, Transmission];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
