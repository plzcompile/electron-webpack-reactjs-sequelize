const {Model, DataTypes } = require('sequelize');
const {sequelize} = require('../database'); //Bring configured db into model for init
class User extends Model {
    static upperCaseFirstName() {
      return this.firstname.toUpperCase();
    }
    getFullname() {
      return [this.firstname, this.lastname].join(' ');
    }
    async createTestUser(){ 
        try{
            //Create test user if they do not exist
            const user = await User.create({
                username: 'Tommy.Gunn',
                firstname: 'Tommy',
                lastname: 'Gunn'
            });
            return await user.save();
        }catch(e){
            const topLevelError = e.errors[0];
            console.log(`Issue creating user {Message: ${topLevelError.message}, Type: ${topLevelError.type}, Value: ${topLevelError.value} already exists}`)
        }
        return null;
    }
}

User.init({
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true //Would fail if you tried to create a user with the same username. DB Collations can be important here for case sensitivity.
    }, 
    firstname: DataTypes.TEXT,
    lastname: DataTypes.TEXT
}, { sequelize });

module.exports.User = User;
