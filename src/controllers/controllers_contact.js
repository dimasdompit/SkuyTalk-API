const modelContact = require("../models/model_contacts");
const helper = require("../helpers/myResponse");

module.exports = {
  getAllContacts: async (request, response) => {
    const decode = request.decodeToken;
    const id = decode.id;
    try {
      const result = await modelContact.getAllContactModel(id, id);
      return helper.response(response, "success", result, 200);
    } catch (error) {
      console.log(error);
      return helper.response(response, "fail", "Internal Server Error", 400);
    }
  },
};
