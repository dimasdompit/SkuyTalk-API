const modelContact = require("../models/model_contacts");
const helper = require("../helpers/myResponse");

module.exports = {
  getAllContacts: async (request, response) => {
    const decode = request.decodeToken;
    const id = decode.id;
    try {
      const result = await modelContact.getAllContactModel(id, id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  },
};
