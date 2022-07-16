const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    nom: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 40,
        trim: true
      },
    prenom: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      trim: true
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 3
    },
    role: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "./uploads/profil/default.png"
    },
  },
  {
    timestamps: true,
  }
);
//play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function(nom, password) {
  const user = await this.findOne({ nom });
  if (user) {
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      return user;
    }else{
      return { errorPassword: "mot de passe incorrect"}
    }
  }
  throw Error('user incorrect')
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;