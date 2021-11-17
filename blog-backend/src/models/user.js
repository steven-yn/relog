import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// instance method
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

// instance method
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// instance method
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// instance method
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫번째 파라미터 : 토큰안에 넣고싶은 데이터 넣기
    {
      _id: this.id,
      username: this.username,
    },

    // 두번째 파라미터 : JWT 암호 넣기.
    process.env.JWT_SECRET,

    // 세번쨰 파라미터 : 유효한 기간
    {
      expiresIn: '7d',
    },
  );
  return token;
};

// static method
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

const User = mongoose.model('User', UserSchema);
export default User;
