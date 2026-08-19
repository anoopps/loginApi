import { body } from "express-validator";

export const loginValidation = [

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid Email format"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
];