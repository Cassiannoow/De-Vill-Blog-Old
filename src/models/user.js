const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
 username: String,
 email: String,
 password: String,
 member: String
},{collection: 'users'}
)

module.exports = {UserSchema: userSchema}
