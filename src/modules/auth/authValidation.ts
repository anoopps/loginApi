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

export const registerValidation = [
    body("firstname")
        .trim()
        .notEmpty()
        .withMessage("First name is required"),

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