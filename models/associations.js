// associations.js
const { User } = require('./userModel');
const { Summary } = require('./summaryModel');

User.hasMany(Summary, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Summary.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Summary,
};
