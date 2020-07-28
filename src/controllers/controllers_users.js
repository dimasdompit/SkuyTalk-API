const modelUsers = require("../models/model_users");
const modelAuth = require("../models/model_auth");
const helper = require("../helpers/myResponse");
const joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const fs = require("fs");

const registerSchema = joi.object({
  fullname: joi.string().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co.id"] } })
    .required(),
  image: joi.string().required(),
  username: joi.string().alphanum().min(4).max(30).required(),
  password: joi.string().min(6).max(30).required(),
});

module.exports = {
  getAllUsers: async (request, response) => {
    try {
      const result = await modelUsers.getAllUsersModel();
      helper.response(response, "success", result, 200);
    } catch (error) {
      console.log(error);
      helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  getUsersById: async (request, response) => {
    const id = request.params.id;
    try {
      const result = await modelUsers.getUsersByIdModel(id);
      helper.response(response, "success", result, 200);
    } catch (error) {
      console.log(error);
      helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  postUsers: async (request, response) => {
    const setData = request.body;
    if (request.file === undefined) {
      setData.image = `default.png`;
    }
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
        const result = await modelUsers.postUsersModel(setData);
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

  putUsers: async (request, response) => {
    const setData = request.body;
    const id = request.params.id;
    console.log(id);
    let existImage = null;
    if (request.file) {
      const newImage = request.file.filename;
      setData.image = newImage;
      const existData = await modelUsers.getUsersByIdModel(id);
      existImage = existData[0].image;
    }
    try {
      const result = await modelUsers.putUsersModel(setData, id);
      console.log(result);
      console.log(result.id);
      if (result.id == id) {
        if (existImage !== null && existImage !== "default.png") {
          fs.unlinkSync(`./assets/images/${existImage}`);
        }
        const newData = await modelUsers.getUsersByIdModel(id);
        return helper.response(response, "success", newData, 200);
      }
      return helper.response(
        response,
        "fail",
        `User with ID = ${id} not found`,
        404
      );
    } catch (error) {
      console.log(error.response);
      if (err.response === undefined) {
        return helper.response(
          response,
          "fail",
          "Format image must be : JPG/JPEG/PNG",
          401
        );
      }
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  deleteUsersModel: async (request, response) => {
    const id = request.params.id;
    try {
      const data = await modelUsers.getUsersByIdModel(id);
      const result = await modelUsers.deleteUsersModel(id);
      if (result.affectedRows === 1 && data[0].image !== "default.png") {
        const image = data[0].image;
        fs.unlinkSync(`./assets/images/${image}`);
        return helper.response(response, "success", result, 200);
      }
      return helper.response(
        response,
        "fail",
        `Data with ID = ${id} not found`,
        404
      );
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },
};
