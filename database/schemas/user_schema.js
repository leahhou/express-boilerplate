const { Schema } = require("mongoose");

const UserSchema = new Schema({
    email: { //2nd validation at the layer between model to database
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        bcrypt: true // to encrypt the password when stored in database
    }
});

UserSchema.plugin(require("mongoose-bcrypt")); // to encrypt the password when stored in database

module.exports = UserSchema;