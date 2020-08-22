const modelContact = require("../models/model_contacts");
const helper = require("../helpers/myResponse");

module.exports = {
  getAllContacts: async (request, response) => {
    const decode = request.decodeToken;
    const id = decode.id;
    try {
      const result = await modelContact.getAllContactModel(id);
      return helper.response(response, "success", result, 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 400);
    }
  },
  searchContact: async (request, response) => {
    const q = request.query.q || "";
    const decode = request.decodeToken;
    const id = decode.id;
    try {
      const result = await modelContact.searchContactModel(q, id);
      console.log(result.length);
      if (result.length >= 1) {
        return helper.response(response, "success", result, 200);
      }
      return helper.response(response, "fail", "Not Found", 404);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },
  addContact: async (request, response) => {
    const decode = request.decodeToken;
    const id = decode.id;
    const friendId = request.params.id;
    try {
      const setData = {
        user_id: id,
        friend_id: friendId,
      };
      const result = await modelContact.addContactModel(setData);
      if (result.affectedRows === 1) {
        return helper.response(response, "success", "Add Contact Success", 200);
      }
      return helper.response(response, "fail", "Already Added", 400);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 500);
    }
  },
};
