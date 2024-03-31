import Joi from "joi";

// Contract for validating login request
const loginContract = Joi.object({
  password: Joi.string().required(),
  username: Joi.string().required(),
});

// Contract for validating signup request
const signupContract = Joi.object({
  username: Joi.string().required(),
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .max(20)
    .pattern(/[*|;@#%^*+=()_\-&$]/)
    .pattern(/[*^\d+$|]/)
    .messages({
      "string.pattern.base": `password should contain at least one number or special character!`,
      "string.min": `password length should be greater than 8 characters`,
      "string.max": `password length should be less than 20 characters`,
    }),
});

export { loginContract, signupContract };
