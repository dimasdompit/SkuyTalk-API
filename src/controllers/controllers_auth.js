const modelAuth = require("../models/model_auth");
const helper = require("../helpers/myResponse");
const config = require("../config/global");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const joi = require("@hapi/joi");

const registerSchema = joi.object({
  fullname: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co.id"] } })
    .required(),
  image: joi.string(),
  username: joi.string().alphanum().min(4).max(30).required(),
  password: joi.string().min(6).max(30).required(),
});

module.exports = {
  register: async (request, response) => {
    const setData = request.body;
    const data = await modelAuth.loginModel(setData.username);
    const existData = {
      ...data[0],
    };
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(setData.password, salt);
    try {
      if (setData.username === existData.username) {
        return helper.response(
          response,
          "fail",
          "Username is already taken!",
          401
        );
      } else {
        await registerSchema.validateAsync(setData);
        setData.password = hash;
        const result = await modelAuth.registerModel(setData);
        delete result.password;
        const newData = {
          status: "Register Successfully!",
          ...result,
        };
        return helper.response(response, "success", newData, 201);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
      if (error.message) {
        return helper.response(response, "fail", errorMessage, 401);
      } else {
        return helper.response(response, "fail", "Internal Server Error", 500);
      }
    }
  },
  login: async (request, response) => {
    const loginData = request.body;
    console.log(loginData);
    try {
      const result = await modelAuth.loginModel(loginData.username);
      if (result.length > 0) {
        const hashPass = result[0].password;
        const checkPass = bcrypt.compareSync(loginData.password, hashPass);
        if (checkPass) {
          delete result[0].password;
          return helper.response(response, "success", result, 200);
        }
        return helper.response(
          response,
          "fail",
          "Incorrect Username or Password",
          401
        );
      }
      return helper.response(
        response,
        "fail",
        "Incorrect Username or Password",
        401
      );
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },
};
