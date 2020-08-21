const modelChat = require("../models/model_chat");
// const modelChat = require("../models/model_chat");
const helper = require("../helpers/myResponse");
const joi = require("@hapi/joi");

const postChatSchema = joi.object({
  sender: joi.number().required(),
  receiver: joi.number().required(),
  content: joi.string().required(),
});

module.exports = {
  showChats: async (request, response) => {
    const decode = request.decodeToken;
    const userId = decode.id;
    const id = request.params.id;
    // const search = request.query.search || "";
    // const sort = request.query.sort || "senderName";
    // const order = request.query.order || "DESC";
    // const limit = request.query.limit || 6;
    // const page = request.query.page || 1;
    try {
      const result = await modelChat.showChatsModel(id, userId);
      return helper.response(response, "success", result, 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  getChatById: async (request, response) => {
    const decode = request.decodeToken;
    const userId = decode.id;
    try {
      const result = await modelChat.getChatByIdModel(userId);
      // console.log(result);
      if (result) {
        request.io.emit("last-chat", result, userId);
        return helper.response(response, "success", result, 200);
      }
      return helper.response(response, "fail", "No Messages", 400);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  postChats: async (request, response) => {
    const setData = request.body;
    const decode = request.decodeToken;
    const userId = decode.id;
    setData.sender = decode.id;
    setData.receiver = parseInt(request.params.id);
    try {
      await postChatSchema.validateAsync(setData);
      const getChat = await modelChat.getChatByIdModel(userId);
      let newRes = {
        ...getChat[0],
      };
      const date = newRes.date;
      const result = await modelChat.postChatsModel(setData);
      if (result) {
        request.io.emit("chat", { ...result, date: date });
        return helper.response(response, "success", result, 201);
      }
      return helper.response(response, "fail", "Send Failed", 400);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  puChats: async (request, response) => {
    const id = request.params.id;
    const setData = request.body;
    try {
      const result = await modelChat.putChatsModel(setData, id);
      return helper.response(response, "success", result, 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },

  deleteChats: async (request, response) => {
    const id = request.params.id;
    try {
      const result = await modelChat.deleteChatsModel(id);
      return helper.response(response, "success", result, 200);
    } catch (error) {
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },
};
