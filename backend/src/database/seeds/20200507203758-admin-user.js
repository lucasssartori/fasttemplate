const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (QueryInterface) => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          id: uuid(),
          name: 'Admin Fast Tamplate',
          email: 'admin@fasttemplate.com',
          telefone: '3133333333',
          password_hash: bcrypt.hashSync('123456', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
