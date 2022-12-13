const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
 username: {
    type: String,
    require: true
 },
 email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
 },
 password: {
    type: String,
    require: true,
    select: false
 },
 member: String,
 imagem: String
},{collection: 'users'}
)

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash
    next()
})

const postsSchema = new Schema({
    title: String,
    data: String,
    image: String,
    description: String,
    recently: Boolean
   },{collection: 'posts'}
)

module.exports = {PostsSchema: postsSchema}
module.exports = {UserSchema: userSchema}
