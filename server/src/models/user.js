import bcrypt from "bcrypt";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

/**
 * Hash the password if the user just registered or changed their password
 */
UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this.password, salt);
    this.password = hashedPassword;

    next();
});

/**
 * Compare the plain text password to the hashed password in the database
 */
UserSchema.methods.comparePassword = function (candidatePassword) {
    const result = bcrypt.compareSync(candidatePassword, this.password);
    return result;
};

const User = mongoose.model("user", UserSchema);

export default User;
