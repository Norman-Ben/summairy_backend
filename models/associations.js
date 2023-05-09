// associations.js
const { User } = require('./userModel');
const { Summary } = require('./summaryModel');

User.hasMany(Summary, {
  foreignKey: 'user',
  onDelete: 'CASCADE',
});

Summary.belongsTo(User, {
  foreignKey: 'user',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Summary,
};
