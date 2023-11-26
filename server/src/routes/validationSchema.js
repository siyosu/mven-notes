import User from "../models/user.js";

/**
 * Check if there is a user already registered with the provided username or not
 */
const isUsernameAvailable = async (username) => {
    const user = await User.findOne({ username });
    if (user) {
        throw new Error("Username is already taken. Please choose another.");
    }
    return true;
};

/**
 * Check if the confirm password is match with the password field or not
 */
const isConfirmPasswordMatch = (confirmPassword, { req }) => {
    const match = confirmPassword === req.body.password;
    if (!match) {
        throw new Error("Passwords do not match.");
    }
    return true;
};

export const newUserSchema = {
    username: {
        isAlphanumeric: {
            bail: true,
            errorMessage: "Username must contain only letters and numbers.",
        },
        custom: { options: isUsernameAvailable },
    },
    password: {
        isLength: {
            options: {
                min: 6,
                max: 250,
            },
            errorMessage: "Password must be at least 6 characters.",
        },
    },
    confirmPassword: {
        notEmpty: {
            bail: true,
            errorMessage: "Confirmation password cannot be empty",
        },
        custom: { options: isConfirmPasswordMatch },
    },
};

/**
 * Handle the rest of the validation on the controller
 */
export const userLoginSchema = {
    username: {
        isAlphanumeric: true,
    },
    password: {
        isLength: {
            options: {
                min: 6,
                max: 250,
            },
        },
    },
};
